import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Wallet, Copy, ExternalLink, ChevronDown, AlertCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/hooks/useWallet"
import { supportedNetworks } from "@/lib/wallet"

interface WalletConnectionProps {
  className?: string
}

export function WalletConnection({ className }: WalletConnectionProps) {
  const { 
    isConnected, 
    address, 
    balance, 
    chainId, 
    isLoading, 
    connect, 
    disconnect,
    switchNetwork 
  } = useWallet()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const currentNetwork = chainId ? supportedNetworks[chainId as keyof typeof supportedNetworks] : null

  if (!isConnected) {
    return (
      <Button 
        onClick={connect} 
        className={className} 
        variant="default"
        disabled={isLoading}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isLoading ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`${className} dao-glow`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="hidden sm:inline">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 dao-card p-0">
        <div className="p-4 space-y-4">
          {/* Wallet Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Wallet className="w-4 h-4 text-success-foreground" />
              </div>
              <div>
                <p className="font-medium">Wallet Connected</p>
                {currentNetwork ? (
                  <Badge variant="outline" className="text-xs">
                    {currentNetwork.name}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs bg-warning/20 text-warning border-warning/30">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Unsupported Network
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Address</p>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <code className="text-sm font-mono flex-1">{address}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyAddress}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Balance */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Balance</p>
            <div className="dao-card p-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{balance} {currentNetwork?.symbol}</span>
                <span className="text-xs text-muted-foreground">Native Balance</span>
              </div>
            </div>
          </div>

          {/* Token Balance */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Governance Token</p>
            <div className="dao-card p-3 text-center">
              <p className="text-2xl font-bold gradient-text">1,250 VFG</p>
              <p className="text-xs text-muted-foreground">VoteForge Governance Token</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-border/50">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a 
                href={currentNetwork ? `${currentNetwork.explorer}/address/${address}` : '#'} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Explorer
              </a>
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={disconnect}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}