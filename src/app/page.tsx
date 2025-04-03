'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/types/leaderboard';
import { Leaderboard } from '@/components/Leaderboard';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    // Set up polling for real-time updates
    const interval = setInterval(fetchLeaderboard, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePlayerClick = (address: string) => {
    // Navigate to player details page
    window.location.href = `/player/${address}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Monad Ecosystem Leaderboard</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Leaderboard players={players} onPlayerClick={handlePlayerClick} />
        </div>
      </div>
    </main>
  );
} 