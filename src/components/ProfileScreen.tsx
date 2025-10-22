import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { useState } from 'react';

interface ProfileScreenProps {
  onBack: () => void;
  onViewStats: () => void;
  onSignOut: () => void;
  username: string;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function ProfileScreen({ onBack, onViewStats, onSignOut, username, isDarkMode = false, onToggleDarkMode }: ProfileScreenProps) {
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showInviteMessage, setShowInviteMessage] = useState(false);

  const userStats = {
    gamesPlayed: 47,
    gamesWon: 29,
    winRate: 62,
    totalWords: 1247,
    bestStreak: 8,
    rank: 15,
    points: 2847,
    achievements: [
      { name: 'Word Master', emoji: '📚', description: 'Play 50 games' },
      { name: 'Speed Demon', emoji: '⚡', description: 'Average response under 10s' },
      { name: 'Theme Expert', emoji: '🎯', description: 'Win with 5 different themes' },
    ]
  };

  const handleUsernameUpdate = () => {
    setEditingUsername(false);
    // Here you would update the username in your app state/backend
  };

  const handleInviteFriends = async () => {
    const inviteText = `Join me on WordLego! Use my invite code: ${username.toUpperCase()}123`;
    
    // Try to share if available, but just show message as fallback
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join WordLego!',
          text: inviteText,
        });
        // Share was successful, no need to show message
        return;
      } catch (err) {
        // User cancelled or permission denied - just show the message instead
        // Don't log the error as it's expected behavior
      }
    }
    
    // Fallback: Show invite message
    setShowInviteMessage(true);
    setTimeout(() => setShowInviteMessage(false), 3000);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 pt-4"
      >
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          ←
        </button>
        <h1 className="text-xl font-black text-white">Profile</h1>
        <div className="w-10 h-10"></div>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-4">
            {username.charAt(0).toUpperCase()}
          </div>
          
          {editingUsername ? (
            <div className="flex gap-2 justify-center items-center">
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="text-center font-bold text-lg max-w-32"
              />
              <GameButton
                onClick={handleUsernameUpdate}
                size="sm"
                variant="success"
              >
                ✓
              </GameButton>
              <GameButton
                onClick={() => setEditingUsername(false)}
                size="sm"
                variant="secondary"
              >
                ✕
              </GameButton>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-black text-card-foreground">{username}</h2>
              <button
                onClick={() => setEditingUsername(true)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✏️
              </button>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground mt-2">Rank #{userStats.rank} • {userStats.points} points</div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-xl text-center">
          <div className="text-2xl font-black text-blue-500">{userStats.gamesPlayed}</div>
          <div className="text-sm text-muted-foreground">Games Played</div>
        </Card>
        <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-xl text-center">
          <div className="text-2xl font-black text-green-500">{userStats.gamesWon}</div>
          <div className="text-sm text-muted-foreground">Games Won</div>
        </Card>
        <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-xl text-center">
          <div className="text-2xl font-black text-purple-500">{userStats.winRate}%</div>
          <div className="text-sm text-muted-foreground">Win Rate</div>
        </Card>
        <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-xl text-center">
          <div className="text-2xl font-black text-orange-500">{userStats.bestStreak}</div>
          <div className="text-sm text-muted-foreground">Best Streak</div>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-lg font-black text-card-foreground mb-4">🏆 Achievements</h3>
          <div className="space-y-3">
            {userStats.achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-xl border border-yellow-500/30"
              >
                <div className="text-2xl">{achievement.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-card-foreground">{achievement.name}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
                <div className="text-green-500 text-xl">✅</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-lg font-black text-card-foreground mb-4">⚙️ Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-card-foreground">Sound Effects</div>
                <div className="text-sm text-muted-foreground">Game sounds and feedback</div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-card-foreground">Background Music</div>
                <div className="text-sm text-muted-foreground">Ambient game music</div>
              </div>
              <Switch
                checked={musicEnabled}
                onCheckedChange={setMusicEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-card-foreground">Push Notifications</div>
                <div className="text-sm text-muted-foreground">Game invites and updates</div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            {onToggleDarkMode && (
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-card-foreground">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">Switch to dark theme</div>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={onToggleDarkMode}
                />
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-3 mb-6"
      >
        <GameButton onClick={onViewStats} variant="secondary" className="w-full">
          📊 View Detailed Stats
        </GameButton>
        <GameButton onClick={handleInviteFriends} variant="secondary" className="w-full">
          👥 Invite Friends
        </GameButton>
        <GameButton onClick={onSignOut} variant="danger" className="w-full">
          🚪 Sign Out
        </GameButton>
      </motion.div>

      {/* Invite Message */}
      {showInviteMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-4 right-4 z-50"
        >
          <Card className="p-4 bg-green-500 border-0 shadow-2xl text-center">
            <div className="text-white font-bold mb-2">📤 Share your invite code!</div>
            <div className="text-white/90 text-sm">
              Invite code: <span className="font-black">{username.toUpperCase()}123</span>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}