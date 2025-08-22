import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Wallet, TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react"

const mockTreasuryData = {
  totalValue: "$2,400,000",
  monthlyChange: "+12.5%",
  assets: [
    { name: "ETH", amount: "1,250 ETH", value: "$2,100,000", percentage: 87.5, change: "+5.2%" },
    { name: "USDC", amount: "150,000 USDC", value: "$150,000", percentage: 6.25, change: "+0.1%" },
    { name: "VFG", amount: "500,000 VFG", value: "$100,000", percentage: 4.17, change: "+18.3%" },
    { name: "Other", amount: "Various", value: "$50,000", percentage: 2.08, change: "-2.1%" }
  ],
  transactions: [
    { type: "Received", amount: "+50,000 USDC", from: "Development Grant", date: "2 hours ago", status: "completed" },
    { type: "Sent", amount: "-25 ETH", to: "Core Team Payment", date: "1 day ago", status: "completed" },
    { type: "Received", amount: "+100 ETH", from: "Protocol Fees", date: "3 days ago", status: "completed" },
    { type: "Sent", amount: "-10,000 USDC", to: "Security Audit", date: "5 days ago", status: "completed" }
  ]
}

export default function Treasury() {
  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Treasury Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage DAO treasury assets and transactions
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <PieChart className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button variant="dao">
            <Wallet className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Treasury Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dao-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Treasury Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold gradient-text">{mockTreasuryData.totalValue}</h3>
              <Badge className="bg-success/20 text-success border-success/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                {mockTreasuryData.monthlyChange}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">vs last month</p>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Asset Diversification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">4</h3>
              <span className="text-muted-foreground">Assets</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>ETH Dominance</span>
                <span className="font-medium">87.5%</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="dao-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-bold">23</h3>
              <span className="text-muted-foreground">Transactions</span>
            </div>
            <div className="flex justify-between mt-3 text-sm">
              <span className="text-success">+12 Inbound</span>
              <span className="text-muted-foreground">11 Outbound</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Breakdown */}
      <Card className="dao-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Asset Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTreasuryData.assets.map((asset, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{asset.name}</h4>
                  <Badge variant="outline" className={
                    asset.change.startsWith('+') 
                      ? "text-success border-success/30" 
                      : "text-destructive border-destructive/30"
                  }>
                    {asset.change.startsWith('+') ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {asset.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold">{asset.value}</p>
                  <p className="text-sm text-muted-foreground">{asset.amount}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Portfolio %</span>
                    <span className="font-medium">{asset.percentage}%</span>
                  </div>
                  <Progress value={asset.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="dao-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTreasuryData.transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-border transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    tx.type === 'Received' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {tx.type === 'Received' ? (
                      <ArrowDownRight className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {tx.type === 'Received' ? `From ${tx.from}` : `To ${tx.to}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className="bg-success/20 text-success border-success/30 mb-1"
                  >
                    {tx.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}