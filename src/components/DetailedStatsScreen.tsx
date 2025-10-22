import { motion } from 'motion/react';
import { Card } from './ui/card';
import { useState } from 'react';

interface DetailedStatsScreenProps {
  onBack: () => void;
  username: string;
}

export function DetailedStatsScreen({ onBack, username }: DetailedStatsScreenProps) {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'alltime'>('alltime');

  const detailedStats = {
    overview: {
      gamesPlayed: 47,
      gamesWon: 29,
      gamesLost: 18,
      winRate: 62,
      totalWords: 1247,
      bestStreak: 8,
      currentStreak: 3,
      averageResponseTime: 8.5,
      totalPlayTime: '12h 34m',
    },
    themeStats: [
      { theme: 'Animals', emoji: '🐾', played: 15, won: 10, winRate: 67 },
      { theme: 'Food & Drinks', emoji: '🍕', played: 12, won: 8, winRate: 67 },
      { theme: 'Countries', emoji: '🌍', played: 8, won: 5, winRate: 63 },
      { theme: 'Sports', emoji: '⚽', played: 6, won: 3, winRate: 50 },
      { theme: 'Movies', emoji: '🎬', played: 4, won: 2, winRate: 50 },
      { theme: 'Science', emoji: '🔬', played: 2, won: 1, winRate: 50 },
    ],
    recentPerformance: [
      { date: 'Today', games: 5, wins: 3 },
      { date: 'Yesterday', games: 4, wins: 2 },
      { date: '2 days ago', games: 6, wins: 4 },
      { date: '3 days ago', games: 3, wins: 2 },
      { date: '4 days ago', games: 5, wins: 3 },
    ],
    wordStats: {
      longestWord: 'EXTRAORDINARY',
      mostUsedLetter: 'A',
      favoriteTheme: 'Animals',
      perfectRounds: 23,
    }
  };

  return (
    <div className="min-h-screen p-4 pb-8">
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
        <h1 className="text-2xl font-black text-white ml-4">Detailed Statistics</h1>
      </motion.div>

      {/* Time Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="p-2 bg-card/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {(['week', 'month', 'alltime'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`py-3 px-4 rounded-xl font-bold transition-all ${
                  timeFilter === filter
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {filter === 'week' ? '📅 Week' : filter === 'month' ? '📊 Month' : '📈 All Time'}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-xl font-black text-white mb-4">📊 Overview</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-3xl font-black text-blue-500">{detailedStats.overview.gamesPlayed}</div>
            <div className="text-sm text-muted-foreground">Games Played</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-3xl font-black text-green-500">{detailedStats.overview.gamesWon}</div>
            <div className="text-sm text-muted-foreground">Games Won</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-3xl font-black text-red-500">{detailedStats.overview.gamesLost}</div>
            <div className="text-sm text-muted-foreground">Games Lost</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-3xl font-black text-purple-500">{detailedStats.overview.winRate}%</div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
          </Card>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-2xl font-black text-orange-500">{detailedStats.overview.totalWords}</div>
            <div className="text-xs text-muted-foreground">Total Words</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-2xl font-black text-yellow-500">{detailedStats.overview.bestStreak}</div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-2xl font-black text-pink-500">{detailedStats.overview.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
          </Card>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-lg">
          <h3 className="text-lg font-black text-card-foreground mb-4">⚡ Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Avg Response Time</div>
              <div className="text-2xl font-black text-blue-500">{detailedStats.overview.averageResponseTime}s</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Play Time</div>
              <div className="text-2xl font-black text-green-500">{detailedStats.overview.totalPlayTime}</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Theme Performance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-xl font-black text-white mb-4">🎯 Theme Performance</h2>
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="space-y-3">
            {detailedStats.themeStats.map((theme, index) => (
              <motion.div
                key={theme.theme}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="p-4 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{theme.emoji}</span>
                    <span className="font-black text-card-foreground">{theme.theme}</span>
                  </div>
                  <div className="text-sm font-black text-blue-500">{theme.winRate}%</div>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Played: {theme.played}</span>
                  <span>Won: {theme.won}</span>
                </div>
                <div className="mt-2 w-full bg-border rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${theme.winRate}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Recent Performance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-xl font-black text-white mb-4">📈 Recent Performance</h2>
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-lg">
          <div className="space-y-3">
            {detailedStats.recentPerformance.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl border border-blue-500/20">
                <div>
                  <div className="font-medium text-card-foreground">{day.date}</div>
                  <div className="text-sm text-muted-foreground">{day.games} games played</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-green-500">{day.wins}</div>
                  <div className="text-xs text-muted-foreground">wins</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Word Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-6"
      >
        <h2 className="text-xl font-black text-white mb-4">📝 Word Statistics</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-lg font-black text-purple-500 mb-1">{detailedStats.wordStats.longestWord}</div>
            <div className="text-xs text-muted-foreground">Longest Word</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-3xl font-black text-orange-500 mb-1">{detailedStats.wordStats.mostUsedLetter}</div>
            <div className="text-xs text-muted-foreground">Most Used Letter</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-lg font-black text-green-500 mb-1">{detailedStats.wordStats.favoriteTheme}</div>
            <div className="text-xs text-muted-foreground">Favorite Theme</div>
          </Card>
          <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-lg text-center">
            <div className="text-3xl font-black text-blue-500 mb-1">{detailedStats.wordStats.perfectRounds}</div>
            <div className="text-xs text-muted-foreground">Perfect Rounds</div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
