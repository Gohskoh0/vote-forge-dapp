import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { Settings as SettingsIcon, Moon, Sun, Monitor, Bell, Shield, Palette, Globe, Save } from "lucide-react"
import { useState, useEffect } from "react"

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your VoteForge DAO experience and preferences
          </p>
        </div>
        <Button variant="dao">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appearance Settings */}
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">Theme</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose your preferred theme for the interface
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {themeOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <div
                        key={option.value}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 hover:border-primary/50 transition-colors ${
                          theme === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                        onClick={() => setTheme(option.value)}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Icon className="w-6 h-6" />
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                        {theme === option.value && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce padding and spacing for a denser layout
                    </p>
                  </div>
                  <Switch id="compact-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth animations and transitions
                    </p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Settings */}
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="proposal-notifications">New Proposals</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new proposals are created
                  </p>
                </div>
                <Switch id="proposal-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="voting-reminders">Voting Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Remind me before voting periods end
                  </p>
                </div>
                <Switch id="voting-reminders" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="treasury-alerts">Treasury Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get alerts about significant treasury changes
                  </p>
                </div>
                <Switch id="treasury-alerts" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="public-profile">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your voting history and proposals
                  </p>
                </div>
                <Switch id="public-profile" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve VoteForge by sharing anonymous usage data
                  </p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Wallet Connection
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Export My Data
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Settings Sidebar */}
        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input 
                  id="display-name" 
                  placeholder="Enter your display name" 
                  defaultValue="Anonymous User"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell others about yourself..."
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <Button className="w-full" variant="outline">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card className="dao-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <select 
                  id="language" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select 
                  id="currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="usd">USD ($)</option>
                  <option value="eur">EUR (€)</option>
                  <option value="gbp">GBP (£)</option>
                  <option value="eth">ETH (Ξ)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="dao-card">
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Member Since</span>
                <Badge variant="outline">March 2023</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Proposals Created</span>
                <Badge variant="outline">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Votes Cast</span>
                <Badge variant="outline">42</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Participation Rate</span>
                <Badge className="bg-success/20 text-success border-success/30">
                  87%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}