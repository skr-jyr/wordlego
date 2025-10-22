import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { WordBlock } from './WordBlock';
import { Card } from './ui/card';

interface HomeScreenProps {
  onRandomMatch: () => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
  onLeaderboard: () => void;
  onProfile: () => void;
  username: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function HomeScreen({ onRandomMatch, onCreateRoom, onJoinRoom, onLeaderboard, onProfile, username, isDarkMode, onToggleDarkMode }: HomeScreenProps) {
  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8 pt-4"
      >
        <div>
          <h1 className="text-2xl font-black text-white">WordLego</h1>
          <p className="text-white/90">Hey {username}! 👋</p>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl border-2 border-white/30 hover:bg-white/30 transition-all"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3 mb-8"
      >
        <Card className="p-4 text-center bg-card/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="text-2xl font-black text-blue-500">12</div>
          <div className="text-sm text-muted-foreground">Wins</div>
        </Card>
        <Card className="p-4 text-center bg-card/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="text-2xl font-black text-green-500">847</div>
          <div className="text-sm text-muted-foreground">Points</div>
        </Card>
        <Card className="p-4 text-center bg-card/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="text-2xl font-black text-purple-500">#15</div>
          <div className="text-sm text-muted-foreground">Rank</div>
        </Card>
      </motion.div>

      {/* Main Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl">
          <div className="text-center mb-4">
            <h2 className="text-xl font-black text-card-foreground mb-2">🎯 Quick Match</h2>
            <p className="text-muted-foreground text-sm">Get matched with a random player</p>
          </div>
          <GameButton onClick={onRandomMatch} className="w-full" size="lg">
            Find Match
          </GameButton>
        </Card>

        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl">
          <div className="text-center mb-4">
            <h2 className="text-xl font-black text-card-foreground mb-2">👥 Play with Friends</h2>
            <p className="text-muted-foreground text-sm">Create or join a room with a code</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <GameButton onClick={onCreateRoom} variant="success">
              Create Room
            </GameButton>
            <GameButton onClick={onJoinRoom} variant="secondary">
              Join Room
            </GameButton>
          </div>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-lg font-black text-card-foreground mb-4">🏆 Recent Games</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-500/10 dark:bg-green-500/20 rounded-xl border border-green-500/20">
              <div>
                <div className="font-medium text-green-600 dark:text-green-400">Win vs Alex</div>
                <div className="text-sm text-green-600/80 dark:text-green-400/80">Animals theme • 2 min ago</div>
              </div>
              <div className="flex gap-1">
                <WordBlock word="CAT" color="green" size="sm" />
                <WordBlock word="TIGER" color="blue" size="sm" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-500/10 dark:bg-red-500/20 rounded-xl border border-red-500/20">
              <div>
                <div className="font-medium text-red-600 dark:text-red-400">Loss vs Sam</div>
                <div className="text-sm text-red-600/80 dark:text-red-400/80">Food theme • 5 min ago</div>
              </div>
              <div className="flex gap-1">
                <WordBlock word="APPLE" color="red" size="sm" />
                <WordBlock word="EGG" color="yellow" size="sm" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-border/50"
      >
        <div className="grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center gap-1 p-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={onLeaderboard}
            className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:bg-yellow-500/10 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all"
          >
            <span className="text-xl">🏆</span>
            <span className="text-xs font-medium">Leaderboard</span>
          </button>
          <button 
            onClick={onProfile}
            className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
          >
            <span className="text-xl">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}