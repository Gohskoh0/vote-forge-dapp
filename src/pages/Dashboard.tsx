import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { mockDAOStats, mockProposals } from "@/data/mockData"
import { Users, Vote, Trophy, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const stats = mockDAOStats
  const recentProposals = mockProposals.slice(0, 3)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-warning" />
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-warning/20 text-warning border-warning/30",
      passed: "bg-success/20 text-success border-success/30",
      failed: "bg-destructive/20 text-destructive border-destructive/30",
      pending: "bg-muted/20 text-muted-foreground border-muted/30"
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Welcome Header */}
      <div className="dao-card p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl dao-glow mb-4">
          <Vote className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Welcome to VoteForge DAO</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Participate in decentralized governance and shape the future of our protocol
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <Button asChild variant="dao" size="lg">
            <Link to="/proposals">View Proposals</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/create">Create Proposal</Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dao-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalMembers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Token holders participating
            </p>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <Vote className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeProposals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently open for voting
            </p>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treasury</CardTitle>
            <Trophy className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.treasuryValue}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total treasury value
            </p>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Holders</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.governanceToken.holders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.governanceToken.symbol} token holders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Proposals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="dao-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-primary" />
              Recent Proposals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProposals.map((proposal) => (
              <div key={proposal.id} className="dao-card p-4 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm leading-tight">{proposal.title}</h3>
                  {getStatusIcon(proposal.status)}
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {proposal.description}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className={getStatusBadge(proposal.status)}>
                    {proposal.status.toUpperCase()}
                  </Badge>
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/proposals/${proposal.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link to="/proposals">View All Proposals</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Governance Token Info */}
        <Card className="dao-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-success" />
              Governance Token
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center dao-card p-6">
              <div className="text-4xl font-bold gradient-text mb-2">
                {stats.governanceToken.symbol}
              </div>
              <p className="text-sm text-muted-foreground">VoteForge Governance Token</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Supply</span>
                <span className="font-medium">{stats.governanceToken.totalSupply}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Token Holders</span>
                <span className="font-medium">{stats.governanceToken.holders.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Your Balance</span>
                <span className="font-medium text-primary">1,250 VFG</span>
              </div>
            </div>

            <Button variant="dao" className="w-full">
              View Token Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}