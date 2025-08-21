import { BrowserProvider, JsonRpcSigner } from 'ethers'

export interface WalletState {
  isConnected: boolean
  address?: string
  balance?: string
  chainId?: number
  signer?: JsonRpcSigner
}

export interface WalletError {
  message: string
  code?: number
}

// Network configurations
export const supportedNetworks = {
  1: {
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpc: 'https://mainnet.infura.io/v3/',
    explorer: 'https://etherscan.io'
  },
  11155111: {
    name: 'Sepolia Testnet',
    symbol: 'ETH',
    rpc: 'https://sepolia.infura.io/v3/',
    explorer: 'https://sepolia.etherscan.io'
  },
  137: {
    name: 'Polygon Mainnet',
    symbol: 'MATIC',
    rpc: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com'
  }
}

declare global {
  interface Window {
    ethereum?: any
  }
}

export class WalletService {
  private provider: BrowserProvider | null = null
  private signer: JsonRpcSigner | null = null

  // Check if wallet is available
  isWalletAvailable(): boolean {
    return typeof window !== 'undefined' && Boolean(window.ethereum)
  }

  // Connect to wallet
  async connect(): Promise<WalletState> {
    if (!this.isWalletAvailable()) {
      throw new WalletError('MetaMask is not installed. Please install MetaMask to continue.')
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (!accounts || accounts.length === 0) {
        throw new WalletError('No accounts found. Please unlock your wallet.')
      }

      // Initialize provider and signer
      this.provider = new BrowserProvider(window.ethereum)
      this.signer = await this.provider.getSigner()

      const address = accounts[0]
      const balance = await this.provider.getBalance(address)
      const network = await this.provider.getNetwork()

      // Format balance to ETH
      const balanceInEth = parseFloat(balance.toString()) / Math.pow(10, 18)

      return {
        isConnected: true,
        address,
        balance: balanceInEth.toFixed(4),
        chainId: Number(network.chainId),
        signer: this.signer
      }
    } catch (error: any) {
      if (error.code === 4001) {
        throw new WalletError('Connection rejected by user')
      }
      throw new WalletError(error.message || 'Failed to connect wallet')
    }
  }

  // Disconnect wallet
  async disconnect(): Promise<void> {
    this.provider = null
    this.signer = null
  }

  // Get current wallet state
  async getWalletState(): Promise<WalletState | null> {
    if (!this.isWalletAvailable() || !this.provider) {
      return null
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (!accounts || accounts.length === 0) {
        return { isConnected: false }
      }

      const address = accounts[0]
      const balance = await this.provider.getBalance(address)
      const network = await this.provider.getNetwork()

      const balanceInEth = parseFloat(balance.toString()) / Math.pow(10, 18)

      return {
        isConnected: true,
        address,
        balance: balanceInEth.toFixed(4),
        chainId: Number(network.chainId),
        signer: this.signer
      }
    } catch (error) {
      console.error('Error getting wallet state:', error)
      return { isConnected: false }
    }
  }

  // Switch network
  async switchNetwork(chainId: number): Promise<void> {
    if (!this.isWalletAvailable()) {
      throw new WalletError('Wallet not available')
    }

    const chainIdHex = `0x${chainId.toString(16)}`

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      })
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask
      if (error.code === 4902) {
        const network = supportedNetworks[chainId as keyof typeof supportedNetworks]
        if (network) {
          await this.addNetwork(chainId, network)
        }
      } else {
        throw new WalletError(`Failed to switch network: ${error.message}`)
      }
    }
  }

  // Add network to wallet
  private async addNetwork(chainId: number, network: typeof supportedNetworks[1]): Promise<void> {
    const chainIdHex = `0x${chainId.toString(16)}`

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chainIdHex,
          chainName: network.name,
          nativeCurrency: {
            name: network.symbol,
            symbol: network.symbol,
            decimals: 18,
          },
          rpcUrls: [network.rpc],
          blockExplorerUrls: [network.explorer],
        },
      ],
    })
  }

  // Get governance token balance (mock for now)
  async getTokenBalance(tokenAddress: string): Promise<string> {
    // In a real implementation, this would interact with the token contract
    // For now, return a mock balance
    return '1,250'
  }

  // Sign message for voting
  async signVote(proposalId: string, vote: 'for' | 'against' | 'abstain'): Promise<string> {
    if (!this.signer) {
      throw new WalletError('Wallet not connected')
    }

    const message = `Vote on proposal ${proposalId}: ${vote}`
    
    try {
      const signature = await this.signer.signMessage(message)
      return signature
    } catch (error: any) {
      throw new WalletError(`Failed to sign vote: ${error.message}`)
    }
  }
}

// Export singleton instance
export const walletService = new WalletService()

// Custom error class
export class WalletError extends Error {
  code?: number
  
  constructor(message: string, code?: number) {
    super(message)
    this.name = 'WalletError'
    this.code = code
  }
}