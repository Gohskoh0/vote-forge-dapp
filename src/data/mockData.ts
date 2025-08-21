export interface Proposal {
  id: string
  title: string
  description: string
  creator: string
  status: 'active' | 'passed' | 'failed' | 'pending'
  votesFor: number
  votesAgainst: number
  votesAbstain: number
  totalVotes: number
  endTime: Date
  createdAt: Date
  category: string
  quorum: number
  threshold: number
}

export interface DAOStats {
  totalMembers: number
  totalProposals: number
  activeProposals: number
  treasuryValue: string
  governanceToken: {
    symbol: string
    totalSupply: string
    holders: number
  }
}

export const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Increase Treasury Allocation for Development Fund',
    description: 'Proposal to allocate 15% of treasury funds to accelerate protocol development and hire additional core developers. This will help us ship features faster and improve the overall protocol security.',
    creator: '0x742d35cc6ba7b2341e652BF094F5f3E8D4a',
    status: 'active',
    votesFor: 2450000,
    votesAgainst: 850000,
    votesAbstain: 125000,
    totalVotes: 3425000,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    category: 'Treasury',
    quorum: 2000000,
    threshold: 60
  },
  {
    id: '2', 
    title: 'Deploy on Polygon Network',
    description: 'Proposal to deploy VoteForge protocol on Polygon network to reduce gas fees and improve user experience for smaller token holders.',
    creator: '0x89ab30d4c5e6f7890ab12cd3ef456789abc',
    status: 'active',
    votesFor: 1890000,
    votesAgainst: 1240000,
    votesAbstain: 95000,
    totalVotes: 3225000,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    category: 'Technical',
    quorum: 2000000,
    threshold: 50
  },
  {
    id: '3',
    title: 'Partnership with Chainlink for Oracle Services',
    description: 'Establish partnership with Chainlink to integrate reliable price feeds and external data oracles into our governance decisions.',
    creator: '0xdef456789abc0123456789def0123456789d',
    status: 'passed',
    votesFor: 4200000,
    votesAgainst: 980000,
    votesAbstain: 220000,
    totalVotes: 5400000,
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    category: 'Partnerships',
    quorum: 2000000,
    threshold: 60
  },
  {
    id: '4',
    title: 'Implement Quadratic Voting Mechanism',
    description: 'Replace current linear voting with quadratic voting to prevent whale dominance and give smaller holders more influence.',
    creator: '0x123456789abc0def123456789abc0def1234',
    status: 'failed',
    votesFor: 1200000,
    votesAgainst: 2800000,
    votesAbstain: 150000,
    totalVotes: 4150000,
    endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    category: 'Governance',
    quorum: 2000000,
    threshold: 50
  },
  {
    id: '5',
    title: 'Launch Bug Bounty Program',
    description: 'Establish a comprehensive bug bounty program with rewards up to $100,000 to improve protocol security through community auditing.',
    creator: '0x567890abcdef1234567890abcdef123456789',
    status: 'pending',
    votesFor: 0,
    votesAgainst: 0,
    votesAbstain: 0,
    totalVotes: 0,
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    category: 'Security',
    quorum: 2000000,
    threshold: 60
  }
]

export const mockDAOStats: DAOStats = {
  totalMembers: 12847,
  totalProposals: 156,
  activeProposals: 3,
  treasuryValue: '$2.4M',
  governanceToken: {
    symbol: 'VFG',
    totalSupply: '10,000,000',
    holders: 8924
  }
}