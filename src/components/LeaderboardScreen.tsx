import { motion } from 'motion/react';
import { Card } from './ui/card';
import { useState } from 'react';

interface LeaderboardScreenProps {
  onBack: () => void;
  username: string;
}

interface Player {
  rank: number;
  name: string;
  points: number;
  wins: number;
  winRate: number;
  avatar: string;
}

const dummyPlayers: Player[] = [
  { rank: 1, name: 'WordMaster3000', points: 2847, wins: 156, winRate: 87, avatar: '👑' },
  { rank: 2, name: 'AlphabetKing', points: 2654, wins: 142, winRate: 85, avatar: '🏆' },
  { rank: 3, name: 'VocabQueen', points: 2531, wins: 138, winRate: 83, avatar: '💎' },
  { rank: 4, name: 'WordNinja', points: 2387, wins: 129, winRate: 81, avatar: '🥷' },
  { rank: 5, name: 'LetterLegend', points: 2245, wins: 121, winRate: 79, avatar: '⭐' },
  { rank: 6, name: 'DictionaryPro', points: 2103, wins: 115, winRate: 76, avatar: '📚' },
  { rank: 7, name: 'WordWizard', points: 1987, wins: 108, winRate: 74, avatar: '🧙' },
  { rank: 8, name: 'LegoLinguist', points: 1845, wins: 99, winRate: 71, avatar: '🎓' },
  { rank: 9, name: 'AlphaGamer', points: 1723, wins: 92, winRate: 69, avatar: '🎮' },
  { rank: 10, name: 'WordChampion', points: 1654, wins: 87, winRate: 67, avatar: '🏅' },
  { rank: 11, name: 'VocabVirtuoso', points: 1543, wins: 81, winRate: 65, avatar: '🎵' },
  { rank: 12, name: 'LetterLord', points: 1432, wins: 76, winRate: 63, avatar: '👨‍💼' },
  { rank: 13, name: 'WordSmith99', points: 1321, wins: 71, winRate: 61, avatar: '🔨' },
  { rank: 14, name: 'SpellBound', points: 1210, wins: 65, winRate: 58, avatar: '✨' },
  { rank: 15, name: 'Player', points: 847, wins: 12, winRate: 55, avatar: '👤' },
];

export function LeaderboardScreen({ onBack, username }: LeaderboardScreenProps) {
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'alltime'>('alltime');

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-500';
    if (rank === 2) return 'from-gray-300 to-gray-400';
    if (rank === 3) return 'from-orange-400 to-orange-500';
    return 'from-blue-400 to-blue-500';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-6 pt-4"
      >
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl border-2 border-white/30"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-white ml-4">Leaderboard</h1>
      </motion.div>

      {/* Time Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="p-2 bg-white/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {(['daily', 'weekly', 'alltime'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`py-3 px-4 rounded-xl font-bold transition-all ${
                  timeFilter === filter
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'daily' ? '📅 Daily' : filter === 'weekly' ? '📊 Weekly' : '🏆 All Time'}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-end justify-center gap-2 mb-8">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <Card className="p-4 bg-gradient-to-br from-gray-200 to-gray-300 border-0 shadow-xl text-center">
              <div className="text-4xl mb-2">{dummyPlayers[1].avatar}</div>
              <div className="font-black text-gray-800 mb-1 truncate text-sm">
                {dummyPlayers[1].name}
              </div>
              <div className="text-2xl font-black text-gray-700">🥈</div>
              <div className="text-sm font-black text-gray-600">{dummyPlayers[1].points}</div>
            </Card>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex-1"
          >
            <Card className="p-6 bg-gradient-to-br from-yellow-400 to-yellow-500 border-0 shadow-2xl text-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-2"
              >
                {dummyPlayers[0].avatar}
              </motion.div>
              <div className="font-black text-yellow-900 mb-1 truncate">
                {dummyPlayers[0].name}
              </div>
              <div className="text-3xl font-black text-yellow-900">🥇</div>
              <div className="font-black text-yellow-900">{dummyPlayers[0].points}</div>
            </Card>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex-1"
          >
            <Card className="p-4 bg-gradient-to-br from-orange-300 to-orange-400 border-0 shadow-xl text-center">
              <div className="text-4xl mb-2">{dummyPlayers[2].avatar}</div>
              <div className="font-black text-orange-900 mb-1 truncate text-sm">
                {dummyPlayers[2].name}
              </div>
              <div className="text-2xl font-black text-orange-900">🥉</div>
              <div className="text-sm font-black text-orange-800">{dummyPlayers[2].points}</div>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Rankings List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        {dummyPlayers.slice(3).map((player, index) => {
          const isCurrentUser = player.name === username;
          return (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <Card
                className={`p-4 border-0 shadow-lg ${
                  isCurrentUser
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-purple-300'
                    : 'bg-white/95 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRankColor(
                      player.rank
                    )} flex items-center justify-center font-black text-white shadow-lg flex-shrink-0`}
                  >
                    {getRankBadge(player.rank)}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-black truncate flex items-center gap-2 ${
                        isCurrentUser ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      <span className="text-xl">{player.avatar}</span>
                      <span>{player.name}</span>
                      {isCurrentUser && <span className="text-sm">✨ You</span>}
                    </div>
                    <div
                      className={`text-sm ${isCurrentUser ? 'text-white/90' : 'text-gray-600'}`}
                    >
                      {player.wins} wins • {player.winRate}% win rate
                    </div>
                  </div>

                  {/* Points */}
                  <div
                    className={`font-black text-right ${
                      isCurrentUser ? 'text-white' : 'text-blue-600'
                    }`}
                  >
                    <div className="text-xl">{player.points}</div>
                    <div className="text-xs opacity-75">points</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
