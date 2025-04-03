import { NextResponse } from 'next/server';
import { PlayerDetails } from '@/types/leaderboard';

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const { address } = params;

    // Mock data - replace with actual blockchain data
    const mockPlayerDetails: PlayerDetails = {
      address,
      transactions: 1500,
      uniqueContracts: 45,
      daysActive: 30,
      monTokens: 25000,
      compositeScore: 850,
      rank: 1,
      transactionHistory: [
        { date: '2024-01-01', count: 50 },
        { date: '2024-01-02', count: 45 },
        { date: '2024-01-03', count: 60 },
        // Add more mock data as needed
      ],
      contractInteractions: [
        { address: '0xabc1...def2', count: 120 },
        { address: '0xdef3...ghi4', count: 85 },
        { address: '0xghi5...jkl6', count: 45 },
        // Add more mock data as needed
      ],
      activityTrend: [
        { date: '2024-01-01', score: 750 },
        { date: '2024-01-02', score: 780 },
        { date: '2024-01-03', score: 820 },
        // Add more mock data as needed
      ],
    };

    return NextResponse.json(mockPlayerDetails);
  } catch (error) {
    console.error('Error fetching player details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch player details' },
      { status: 500 }
    );
  }
} 