import { NextResponse } from 'next/server';
import { Player } from '@/types/leaderboard';
import { calculateCompositeScore } from '@/utils/scoreCalculator';

// This is a mock implementation. In production, you would:
// 1. Connect to the Monad blockchain API
// 2. Fetch real-time data
// 3. Cache results appropriately
// 4. Implement proper error handling

export async function GET() {
  try {
    // Mock data - replace with actual blockchain data
    const mockPlayers: Player[] = [
      {
        address: '0x1234...5678',
        transactions: 1500,
        uniqueContracts: 45,
        daysActive: 30,
        monTokens: 25000,
        compositeScore: 0, // Will be calculated
        rank: 1,
      },
      {
        address: '0xabcd...efgh',
        transactions: 1200,
        uniqueContracts: 38,
        daysActive: 28,
        monTokens: 20000,
        compositeScore: 0,
        rank: 2,
      },
      {
        address: '0xijkl...mnop',
        transactions: 900,
        uniqueContracts: 32,
        daysActive: 25,
        monTokens: 15000,
        compositeScore: 0,
        rank: 3,
      },
      {
        address: '0xqrst...uvwx',
        transactions: 800,
        uniqueContracts: 28,
        daysActive: 22,
        monTokens: 12000,
        compositeScore: 0,
        rank: 4,
      },
      {
        address: '0xyzab...cdef',
        transactions: 700,
        uniqueContracts: 25,
        daysActive: 20,
        monTokens: 10000,
        compositeScore: 0,
        rank: 5,
      }
    ];

    // Calculate composite scores and sort
    const playersWithScores = mockPlayers.map(player => ({
      ...player,
      compositeScore: calculateCompositeScore({
        transactions: player.transactions,
        uniqueContracts: player.uniqueContracts,
        daysActive: player.daysActive,
        monTokens: player.monTokens,
      }),
    }));

    // Sort by composite score and assign ranks
    const sortedPlayers = playersWithScores
      .sort((a, b) => b.compositeScore - a.compositeScore)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));

    return NextResponse.json(sortedPlayers);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard data' },
      { status: 500 }
    );
  }
} 