import { useState, useEffect, useCallback } from 'react'
import { walletService, WalletState, WalletError } from '@/lib/wallet'
import { useToast } from '@/hooks/use-toast'

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({ isConnected: false })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Initialize wallet state on mount
  useEffect(() => {
    const initWallet = async () => {
      try {
        const state = await walletService.getWalletState()
        if (state) {
          setWalletState(state)
        }
      } catch (err) {
        console.error('Error initializing wallet:', err)
      }
    }

    initWallet()

    // Listen for account changes
    if (walletService.isWalletAvailable()) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setWalletState({ isConnected: false })
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected",
          })
        } else {
          // Refresh wallet state
          initWallet()
        }
      }

      const handleChainChanged = () => {
        // Refresh wallet state when chain changes
        initWallet()
      }

      window.ethereum?.on('accountsChanged', handleAccountsChanged)
      window.ethereum?.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum?.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [toast])

  // Connect wallet
  const connect = useCallback(async () => {
    if (!walletService.isWalletAvailable()) {
      const errorMsg = 'MetaMask is not installed. Please install MetaMask to continue.'
      setError(errorMsg)
      toast({
        title: "Wallet Not Found",
        description: errorMsg,
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const state = await walletService.connect()
      setWalletState(state)
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${state.address?.slice(0, 6)}...${state.address?.slice(-4)}`,
      })
    } catch (err) {
      const error = err as WalletError
      setError(error.message)
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    try {
      await walletService.disconnect()
      setWalletState({ isConnected: false })
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been safely disconnected",
      })
    } catch (err) {
      console.error('Error disconnecting wallet:', err)
    }
  }, [toast])

  // Switch network
  const switchNetwork = useCallback(async (chainId: number) => {
    setIsLoading(true)
    try {
      await walletService.switchNetwork(chainId)
      
      // Refresh wallet state
      const state = await walletService.getWalletState()
      if (state) {
        setWalletState(state)
      }

      toast({
        title: "Network Switched",
        description: "Successfully switched to the requested network",
      })
    } catch (err) {
      const error = err as WalletError
      toast({
        title: "Network Switch Failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  // Get token balance
  const getTokenBalance = useCallback(async (tokenAddress: string) => {
    try {
      const balance = await walletService.getTokenBalance(tokenAddress)
      return balance
    } catch (err) {
      console.error('Error getting token balance:', err)
      return '0'
    }
  }, [])

  // Sign vote
  const signVote = useCallback(async (proposalId: string, vote: 'for' | 'against' | 'abstain') => {
    if (!walletState.isConnected) {
      throw new Error('Wallet not connected')
    }

    try {
      const signature = await walletService.signVote(proposalId, vote)
      
      toast({
        title: "Vote Submitted",
        description: `Your ${vote} vote has been signed and submitted`,
      })
      
      return signature
    } catch (err) {
      const error = err as WalletError
      toast({
        title: "Vote Failed",
        description: error.message,
        variant: "destructive"
      })
      throw error
    }
  }, [walletState.isConnected, toast])

  return {
    // State
    walletState,
    isLoading,
    error,
    
    // Actions
    connect,
    disconnect,
    switchNetwork,
    getTokenBalance,
    signVote,
    
    // Computed values
    isConnected: walletState.isConnected,
    address: walletState.address,
    balance: walletState.balance,
    chainId: walletState.chainId,
  }
}