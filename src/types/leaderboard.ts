export interface Player {
  address: string;
  transactions: number;
  uniqueContracts: number;
  daysActive: number;
  monTokens: number;
  compositeScore: number;
  rank: number;
}

export interface LeaderboardMetrics {
  transactions: number;
  uniqueContracts: number;
  daysActive: number;
  monTokens: number;
}

export interface PlayerDetails extends Player {
  transactionHistory: {
    date: string;
    count: number;
  }[];
  contractInteractions: {
    address: string;
    count: number;
  }[];
  activityTrend: {
    date: string;
    score: number;
  }[];
}

export interface LeaderboardFilters {
  searchQuery?: string;
  minTransactions?: number;
  minUniqueContracts?: number;
  minDaysActive?: number;
  minMonTokens?: number;
} 