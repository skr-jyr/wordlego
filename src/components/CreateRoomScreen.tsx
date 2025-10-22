import { motion } from 'motion/react';
import { Card } from './ui/card';
import { GameButton } from './GameButton';
import { useState, useEffect } from 'react';

interface CreateRoomScreenProps {
  onPlayerJoined: () => void;
  onBack: () => void;
}

export function CreateRoomScreen({ onPlayerJoined, onBack }: CreateRoomScreenProps) {
  const [roomCode] = useState(() => {
    // Generate a random 6-character room code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  });

  const [copied, setCopied] = useState(false);
  const [waitingDots, setWaitingDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(roomCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback: Just show copied state for visual feedback
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // Silently handle clipboard error, just show visual feedback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    // Try to share if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my WordLego game!',
          text: `Join my WordLego game with code: ${roomCode}`,
        });
        // Share was successful
        return;
      } catch (err) {
        // User cancelled or permission denied - fall through to copy
      }
    }
    
    // Fallback: Copy to clipboard
    handleCopyCode();
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-8 pt-4"
      >
        <button
          onClick={onBack}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl border-2 border-white/30"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-white ml-4">Create Room</h1>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl text-center">
          {/* Animated Waiting Indicator */}
          <div className="relative mb-8 h-32 flex items-center justify-center">
            {/* Pulsing rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                className="absolute w-24 h-24 rounded-full border-4 border-green-400"
              />
            ))}
            
            {/* Center icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              👥
            </motion.div>
          </div>

          <h2 className="text-2xl font-black text-gray-800 mb-2">
            Room Created!
          </h2>
          <p className="text-gray-600 mb-8">
            Share this code with your friend{waitingDots}
          </p>

          {/* Room Code Display */}
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-1 rounded-2xl mb-2">
                <div className="bg-white rounded-xl p-6">
                  <div className="text-sm text-gray-600 mb-2">ROOM CODE</div>
                  <div className="flex justify-center gap-2">
                    {roomCode.split('').map((char, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-10 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center text-2xl font-black text-white shadow-lg"
                        style={{
                          boxShadow: '0 4px 0 0 #ea580c',
                        }}
                      >
                        {char}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyCode}
                className="px-6 py-3 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 text-white shadow-lg border-2 border-black/10 transition-all"
                style={{
                  boxShadow: '0 4px 0 0 #2563eb',
                }}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="px-6 py-3 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-lg border-2 border-black/10 transition-all"
                style={{
                  boxShadow: '0 4px 0 0 #16a34a',
                }}
              >
                📤 Share
              </motion.button>
            </div>
          </div>

          {/* Waiting Status */}
          <div className="p-4 bg-yellow-50 rounded-xl mb-6">
            <div className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                ⏳
              </motion.span>
              <span className="text-gray-700">
                Waiting for player to join{waitingDots}
              </span>
            </div>
          </div>

          {/* Test Button - In real app, this would be triggered when someone joins */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlayerJoined}
              className="w-full px-6 py-3 rounded-xl font-bold bg-purple-500 hover:bg-purple-600 text-white shadow-lg border-2 border-black/10 transition-all text-sm"
              style={{
                boxShadow: '0 4px 0 0 #7c3aed',
              }}
            >
              🎮 Simulate Player Joined
            </motion.button>

            <GameButton onClick={onBack} variant="secondary" className="w-full">
              Cancel
            </GameButton>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
