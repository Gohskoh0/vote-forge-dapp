import { useState } from "react"
import { Home, Vote, Plus, Settings, Wallet, Users, Trophy } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Proposals", url: "/proposals", icon: Vote },
  { title: "Create Proposal", url: "/create", icon: Plus },
  { title: "Members", url: "/members", icon: Users },
  { title: "Treasury", url: "/treasury", icon: Trophy },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { open, setOpen } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const isExpanded = navigationItems.some((item) => isActive(item.url))
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className={!open ? "w-14" : "w-64"}>
      <SidebarContent className="dao-card border-r border-border/50">
        {/* DAO Brand Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center dao-glow">
              <Vote className="w-4 h-4 text-primary-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="font-bold text-lg gradient-text">VoteForge</h2>
                <p className="text-xs text-muted-foreground">DAO Platform</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2">
            {open && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Wallet Connection Status */}
        {open && (
          <div className="mt-auto p-4 border-t border-border/50">
            <div className="dao-card p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-success-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Connected</p>
                  <p className="text-xs text-muted-foreground truncate">0x742d...5f3e</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}