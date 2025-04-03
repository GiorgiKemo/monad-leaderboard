import { useState, useEffect } from 'react';
import { Player, LeaderboardFilters } from '@/types/leaderboard';

interface LeaderboardProps {
  players: Player[];
  onPlayerClick: (address: string) => void;
}

export const Leaderboard = ({ players, onPlayerClick }: LeaderboardProps) => {
  const [filters, setFilters] = useState<LeaderboardFilters>({});
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(players);

  useEffect(() => {
    let result = [...players];

    if (filters.searchQuery) {
      result = result.filter(player => 
        player.address.toLowerCase().includes(filters.searchQuery!.toLowerCase())
      );
    }

    if (filters.minTransactions) {
      result = result.filter(player => player.transactions >= filters.minTransactions!);
    }

    if (filters.minUniqueContracts) {
      result = result.filter(player => player.uniqueContracts >= filters.minUniqueContracts!);
    }

    if (filters.minDaysActive) {
      result = result.filter(player => player.daysActive >= filters.minDaysActive!);
    }

    if (filters.minMonTokens) {
      result = result.filter(player => player.monTokens >= filters.minMonTokens!);
    }

    setFilteredPlayers(result);
  }, [players, filters]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by address"
          className="px-4 py-2 border rounded"
          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min transactions"
          className="px-4 py-2 border rounded"
          onChange={(e) => setFilters({ ...filters, minTransactions: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Min unique contracts"
          className="px-4 py-2 border rounded"
          onChange={(e) => setFilters({ ...filters, minUniqueContracts: Number(e.target.value) })}
        />
      </div>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Contracts</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Active</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MON Tokens</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPlayers.map((player) => (
            <tr 
              key={player.address}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onPlayerClick(player.address)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.rank}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.address}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.compositeScore}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.transactions}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.uniqueContracts}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.daysActive}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.monTokens}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 