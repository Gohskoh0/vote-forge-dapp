import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Wallet, Copy, ExternalLink, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface WalletConnectionProps {
  className?: string
}

export function WalletConnection({ className }: WalletConnectionProps) {
  const [isConnected, setIsConnected] = useState(true) // Mock connected state
  const [address] = useState("0x742d35cc6ba7b2341e652BF094F5f3E8D4a")
  const [network] = useState("Ethereum Mainnet")
  const [balance] = useState("1,250 VFG")
  const { toast } = useToast()

  const handleConnect = () => {
    setIsConnected(true)
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to MetaMask",
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  if (!isConnected) {
    return (
      <Button onClick={handleConnect} className={className} variant="dao">
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="dao" className={`${className} dao-glow`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="hidden sm:inline">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 dao-card p-4">
        <div className="space-y-4">
          {/* Wallet Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Wallet className="w-4 h-4 text-success-foreground" />
              </div>
              <div>
                <p className="font-medium">Wallet Connected</p>
                <Badge variant="outline" className="text-xs">
                  {network}
                </Badge>
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

          {/* Token Balance */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Governance Token Balance</p>
            <div className="dao-card p-3 text-center">
              <p className="text-2xl font-bold gradient-text">{balance}</p>
              <p className="text-xs text-muted-foreground">VoteForge Governance Token</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setIsConnected(false)}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}