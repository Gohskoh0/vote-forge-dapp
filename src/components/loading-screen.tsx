import { Vote } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center dao-glow mx-auto animate-pulse">
            <Vote className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute -inset-2 bg-primary/20 rounded-3xl animate-ping" />
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-bold gradient-text mb-2">VoteForge</h1>
        <p className="text-muted-foreground mb-8">Decentralized Governance Platform</p>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full loading-dot"></div>
          <div className="w-2 h-2 bg-primary rounded-full loading-dot"></div>
          <div className="w-2 h-2 bg-primary rounded-full loading-dot"></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-muted-foreground mt-4 animate-pulse">
          Initializing governance protocols...
        </p>
      </div>
    </div>
  )
}