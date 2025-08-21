import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { mockProposals } from "@/data/mockData"
import { Vote, Clock, CheckCircle, XCircle, Plus, User } from "lucide-react"
import { Link } from "react-router-dom"

export default function Proposals() {
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

  const formatTimeLeft = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h left`
    if (hours > 0) return `${hours}h left`
    if (diff > 0) return "< 1h left"
    return "Ended"
  }

  const calculateVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Governance Proposals</h1>
          <p className="text-muted-foreground mt-1">
            Vote on proposals to shape the future of VoteForge DAO
          </p>
        </div>
        <Button asChild variant="dao" size="lg">
          <Link to="/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Proposal
          </Link>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="dao-card p-1 w-fit">
        <div className="flex gap-1">
          <Button variant="dao" size="sm">All</Button>
          <Button variant="ghost" size="sm">Active</Button>
          <Button variant="ghost" size="sm">Passed</Button>
          <Button variant="ghost" size="sm">Failed</Button>
        </div>
      </div>

      {/* Proposals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProposals.map((proposal) => (
          <Card key={proposal.id} className="dao-card hover:shadow-xl transition-all group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge className={getStatusBadge(proposal.status)}>
                  {getStatusIcon(proposal.status)}
                  <span className="ml-1">{proposal.status.toUpperCase()}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {proposal.category}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {proposal.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {proposal.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Creator & Time */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>By {proposal.creator.slice(0, 6)}...{proposal.creator.slice(-4)}</span>
                </div>
                <span>{formatTimeLeft(proposal.endTime)}</span>
              </div>

              {/* Voting Progress */}
              {proposal.totalVotes > 0 && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-success">For ({calculateVotePercentage(proposal.votesFor, proposal.totalVotes).toFixed(1)}%)</span>
                      <span className="font-medium">{proposal.votesFor.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={calculateVotePercentage(proposal.votesFor, proposal.totalVotes)} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-destructive">Against ({calculateVotePercentage(proposal.votesAgainst, proposal.totalVotes).toFixed(1)}%)</span>
                      <span className="font-medium">{proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                    <Progress 
                      value={calculateVotePercentage(proposal.votesAgainst, proposal.totalVotes)} 
                      className="h-2"
                    />
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Total Votes: {proposal.totalVotes.toLocaleString()}</span>
                      <span>Quorum: {((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {proposal.totalVotes === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <Vote className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No votes yet</p>
                </div>
              )}

              {/* Action Button */}
              <Button asChild className="w-full" variant={proposal.status === 'active' ? 'dao' : 'outline'}>
                <Link to={`/proposals/${proposal.id}`}>
                  {proposal.status === 'active' ? 'Vote Now' : 'View Details'}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Proposals
        </Button>
      </div>
    </div>
  )
}