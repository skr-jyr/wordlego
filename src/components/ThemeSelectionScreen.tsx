import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';

interface ThemeSelectionScreenProps {
  onThemeSelected: (theme: string) => void;
  onBack: () => void;
}

export function ThemeSelectionScreen({ onThemeSelected, onBack }: ThemeSelectionScreenProps) {
  const [customTheme, setCustomTheme] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [opponentDecision, setOpponentDecision] = useState<'pending' | 'accepted' | 'declined'>('pending');

  const systemThemes = [
    { name: 'Animals', emoji: '🐾', description: 'Wild and domestic creatures' },
    { name: 'Food & Drinks', emoji: '🍕', description: 'Delicious edibles and beverages' },
    { name: 'Countries', emoji: '🌍', description: 'Nations from around the world' },
    { name: 'Sports', emoji: '⚽', description: 'Athletic activities and games' },
    { name: 'Movies', emoji: '🎬', description: 'Films and cinema classics' },
    { name: 'Music', emoji: '🎵', description: 'Songs, artists, and instruments' },
    { name: 'Science', emoji: '🔬', description: 'Scientific terms and discoveries' },
    { name: 'Technology', emoji: '💻', description: 'Tech, gadgets, and innovations' },
    { name: 'Nature', emoji: '🌿', description: 'Plants, landscapes, and natural world' },
    { name: 'Occupations', emoji: '👨‍💼', description: 'Jobs and professions' },
    { name: 'Colors', emoji: '🎨', description: 'Shades, tints, and hues' },
    { name: 'Vehicles', emoji: '🚗', description: 'Cars, boats, and transport' },
  ];

  useEffect(() => {
    if (showCustomInput && opponentDecision === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setOpponentDecision('declined');
    }
  }, [countdown, showCustomInput, opponentDecision]);

  const handleCustomThemeSubmit = () => {
    if (customTheme.trim()) {
      setShowCustomInput(true);
      // Simulate opponent response after 3 seconds
      setTimeout(() => {
        setOpponentDecision(Math.random() > 0.5 ? 'accepted' : 'declined');
      }, 3000);
    }
  };

  const handleThemeConfirm = (theme: string) => {
    onThemeSelected(theme);
  };

  if (showCustomInput) {
    return (
      <div className="min-h-screen p-4 flex flex-col">
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
          <h1 className="text-xl font-black text-white">Custom Theme</h1>
          <div className="w-10 h-10"></div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-0 shadow-xl text-center">
              {opponentDecision === 'pending' && (
                <>
                  <div className="text-6xl mb-4">⏱️</div>
                  <h2 className="text-2xl font-black text-card-foreground mb-2">Waiting for Opponent</h2>
                  <p className="text-muted-foreground mb-4">Your opponent is deciding on your custom theme:</p>
                  <div className="text-xl font-bold text-purple-500 mb-4 p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl border border-purple-500/30">
                    "{customTheme}"
                  </div>
                  <div className="text-3xl font-black text-red-500 mb-4">{countdown}s</div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(countdown / 15) * 100}%` }}
                    ></div>
                  </div>
                </>
              )}

              {opponentDecision === 'accepted' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-black text-green-500 mb-2">Theme Accepted!</h2>
                  <p className="text-muted-foreground mb-4">Your opponent agreed to play with:</p>
                  <div className="text-xl font-bold text-green-500 mb-6 p-3 bg-green-500/10 dark:bg-green-500/20 rounded-xl border border-green-500/30">
                    "{customTheme}"
                  </div>
                  <GameButton 
                    onClick={() => handleThemeConfirm(customTheme)}
                    variant="success"
                    size="lg"
                    className="w-full"
                  >
                    Start Game!
                  </GameButton>
                </motion.div>
              )}

              {opponentDecision === 'declined' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <div className="text-6xl mb-4">❌</div>
                  <h2 className="text-2xl font-black text-red-500 mb-2">Theme Declined</h2>
                  <p className="text-muted-foreground mb-4">Your opponent didn't accept the custom theme.</p>
                  <p className="text-sm text-muted-foreground/80 mb-6">A random theme will be assigned instead.</p>
                  <GameButton 
                    onClick={() => handleThemeConfirm(systemThemes[Math.floor(Math.random() * systemThemes.length)].name)}
                    size="lg"
                    className="w-full"
                  >
                    Continue with Random Theme
                  </GameButton>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-xl font-black text-white">Choose Theme</h1>
        <div className="w-10 h-10"></div>
      </motion.div>

      {/* Opponent Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="p-4 bg-card/95 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-lg mb-1">
                Y
              </div>
              <div className="text-sm font-medium">You</div>
            </div>
            <div className="text-2xl">⚡</div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-black text-lg mb-1">
                A
              </div>
              <div className="text-sm font-medium">Alex</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* System Themes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        <h2 className="text-lg font-black text-white mb-4">🎲 Random Themes</h2>
        {systemThemes.map((theme, index) => (
          <motion.div
            key={theme.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
                  onClick={() => handleThemeConfirm(theme.name)}>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{theme.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-card-foreground">{theme.name}</h3>
                  <p className="text-muted-foreground text-sm">{theme.description}</p>
                </div>
                <div className="w-8 h-8 border-2 border-border rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Custom Theme */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-lg font-black text-card-foreground mb-4">✨ Custom Theme</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Suggest your own theme. Your opponent has 15 seconds to accept or decline.
          </p>
          <div className="flex gap-3">
            <Input
              placeholder="Type your theme (e.g., Space, Sports...)"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-input-background text-foreground focus:border-purple-500 focus:ring-0"
            />
            <GameButton
              onClick={handleCustomThemeSubmit}
              variant="success"
              disabled={!customTheme.trim()}
            >
              Suggest
            </GameButton>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}