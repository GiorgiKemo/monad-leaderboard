import { LeaderboardMetrics } from '@/types/leaderboard';

// Weights for each metric in the composite score
const WEIGHTS = {
  transactions: 0.3,
  uniqueContracts: 0.25,
  daysActive: 0.2,
  monTokens: 0.25,
};

// Normalization factors to bring all metrics to a similar scale
const NORMALIZATION_FACTORS = {
  transactions: 1000, // Normalize to 1000 transactions
  uniqueContracts: 100, // Normalize to 100 unique contracts
  daysActive: 30, // Normalize to 30 days
  monTokens: 10000, // Normalize to 10,000 MON tokens
};

export const calculateCompositeScore = (metrics: LeaderboardMetrics): number => {
  const normalizedMetrics = {
    transactions: Math.min(metrics.transactions / NORMALIZATION_FACTORS.transactions, 1),
    uniqueContracts: Math.min(metrics.uniqueContracts / NORMALIZATION_FACTORS.uniqueContracts, 1),
    daysActive: Math.min(metrics.daysActive / NORMALIZATION_FACTORS.daysActive, 1),
    monTokens: Math.min(metrics.monTokens / NORMALIZATION_FACTORS.monTokens, 1),
  };

  const weightedScore = 
    normalizedMetrics.transactions * WEIGHTS.transactions +
    normalizedMetrics.uniqueContracts * WEIGHTS.uniqueContracts +
    normalizedMetrics.daysActive * WEIGHTS.daysActive +
    normalizedMetrics.monTokens * WEIGHTS.monTokens;

  // Convert to a score out of 1000
  return Math.round(weightedScore * 1000);
};

export const getScoreBreakdown = (metrics: LeaderboardMetrics) => {
  const compositeScore = calculateCompositeScore(metrics);
  return {
    compositeScore,
    breakdown: {
      transactions: Math.round(metrics.transactions * WEIGHTS.transactions),
      uniqueContracts: Math.round(metrics.uniqueContracts * WEIGHTS.uniqueContracts),
      daysActive: Math.round(metrics.daysActive * WEIGHTS.daysActive),
      monTokens: Math.round(metrics.monTokens * WEIGHTS.monTokens),
    },
  };
}; 