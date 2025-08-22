import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Search, UserPlus, Crown, Shield, User, Vote } from "lucide-react"

const mockMembers = [
  {
    address: "0x742d35cc6ba7b2341e652BF094F5f3E8D4a",
    name: "Alice Chen",
    avatar: "/avatars/alice.jpg",
    role: "Core Team",
    votingPower: "450,000 VFG",
    votingPowerPercent: 4.5,
    proposalsCreated: 12,
    participationRate: 95,
    joinedDate: "Jan 2023",
    status: "active"
  },
  {
    address: "0x89ab30d4c5e6f7890ab12cd3ef456789abc",
    name: "Bob Rodriguez",
    avatar: "/avatars/bob.jpg", 
    role: "Contributor",
    votingPower: "280,000 VFG",
    votingPowerPercent: 2.8,
    proposalsCreated: 5,
    participationRate: 78,
    joinedDate: "Mar 2023",
    status: "active"
  },
  {
    address: "0xdef456789abc0123456789def0123456789d",
    name: "Charlie Kim",
    avatar: "/avatars/charlie.jpg",
    role: "Founder",
    votingPower: "1,200,000 VFG",
    votingPowerPercent: 12,
    proposalsCreated: 24,
    participationRate: 100,
    joinedDate: "Dec 2022",
    status: "active"
  },
  {
    address: "0x123456789abc0def123456789abc0def1234",
    name: "Diana Foster",
    avatar: "/avatars/diana.jpg",
    role: "Member",
    votingPower: "150,000 VFG",
    votingPowerPercent: 1.5,
    proposalsCreated: 2,
    participationRate: 65,
    joinedDate: "Jun 2023",
    status: "active"
  },
  {
    address: "0x567890abcdef1234567890abcdef123456789",
    name: "Ethereum Whale",
    avatar: "/avatars/whale.jpg",
    role: "Member",
    votingPower: "89,000 VFG", 
    votingPowerPercent: 0.89,
    proposalsCreated: 0,
    participationRate: 23,
    joinedDate: "Aug 2023",
    status: "inactive"
  }
]

const memberStats = {
  totalMembers: 12847,
  activeMembers: 8924,
  coreTeam: 12,
  avgParticipation: 68
}

export default function Members() {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Founder':
        return <Crown className="w-4 h-4" />
      case 'Core Team':
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      Founder: "bg-warning/20 text-warning border-warning/30",
      "Core Team": "bg-primary/20 text-primary border-primary/30",
      Contributor: "bg-accent/20 text-accent border-accent/30",
      Member: "bg-muted/20 text-muted-foreground border-muted/30"
    }
    return variants[role as keyof typeof variants] || variants.Member
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">DAO Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all VoteForge DAO members and their contributions
          </p>
        </div>
        <Button variant="dao">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Members
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dao-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-bold">{memberStats.totalMembers.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-success" />
              <h3 className="text-2xl font-bold">{memberStats.activeMembers.toLocaleString()}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {((memberStats.activeMembers / memberStats.totalMembers) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Core Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-warning" />
              <h3 className="text-2xl font-bold">{memberStats.coreTeam}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">{memberStats.avgParticipation}%</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="dao-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search by address, name, or role..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="dao" size="sm">All</Button>
              <Button variant="ghost" size="sm">Active</Button>
              <Button variant="ghost" size="sm">Core Team</Button>
              <Button variant="ghost" size="sm">Top Holders</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockMembers.map((member, index) => (
          <Card key={index} className="dao-card hover:shadow-xl transition-all group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      {member.address.slice(0, 6)}...{member.address.slice(-4)}
                    </p>
                  </div>
                </div>
                <Badge className={getRoleBadge(member.role)}>
                  {getRoleIcon(member.role)}
                  <span className="ml-1">{member.role}</span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Voting Power */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Voting Power</span>
                <div className="text-right">
                  <p className="font-semibold">{member.votingPower}</p>
                  <p className="text-xs text-muted-foreground">{member.votingPowerPercent}% of total</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/50">
                <div className="text-center">
                  <p className="text-lg font-bold">{member.proposalsCreated}</p>
                  <p className="text-xs text-muted-foreground">Proposals</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{member.participationRate}%</p>
                  <p className="text-xs text-muted-foreground">Participation</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{member.joinedDate}</p>
                  <p className="text-xs text-muted-foreground">Joined</p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex justify-between items-center pt-2">
                <Badge 
                  variant="outline"
                  className={member.status === 'active' 
                    ? "bg-success/20 text-success border-success/30" 
                    : "bg-muted/20 text-muted-foreground border-muted/30"
                  }
                >
                  {member.status}
                </Badge>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Members
        </Button>
      </div>
    </div>
  )
}