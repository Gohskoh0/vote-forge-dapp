import { Home, Vote, Plus, Settings, Users, Trophy } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Proposals", url: "/proposals", icon: Vote },
  { title: "Create", url: "/create", icon: Plus },
  { title: "Members", url: "/members", icon: Users },
  { title: "Treasury", url: "/treasury", icon: Trophy },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function FooterNavigation() {
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Navigation Bar */}
      <div className="dao-card m-4 p-2 border-t">
        <nav className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const active = isActive(item.url)
            
            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-all relative",
                  active 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
                
                {/* Icon with background for active state */}
                <div className={cn(
                  "p-2 rounded-lg transition-all",
                  active 
                    ? "bg-primary/10 dao-glow" 
                    : "hover:bg-muted/50"
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                
                {/* Label */}
                <span className={cn(
                  "text-xs font-medium transition-all",
                  active ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.title}
                </span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}