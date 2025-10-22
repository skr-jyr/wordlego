import { motion } from 'motion/react';
import { Card } from './ui/card';
import { GameButton } from './GameButton';
import { useState } from 'react';

interface JoinRoomScreenProps {
  onJoinRoom: () => void;
  onBack: () => void;
}

export function JoinRoomScreen({ onJoinRoom, onBack }: JoinRoomScreenProps) {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleCodeChange = (value: string) => {
    // Only allow alphanumeric characters, max 6
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setRoomCode(cleaned);
    setError('');
  };

  const handleJoin = () => {
    if (roomCode.length !== 6) {
      setError('Please enter a 6-character room code');
      return;
    }

    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      onJoinRoom();
    }, 1500);
  };

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        handleCodeChange(text);
      } else {
        // Clipboard API not available - user can still type manually
        setError('Please enter the code manually');
        setTimeout(() => setError(''), 2000);
      }
    } catch (err) {
      // Clipboard permission denied or not available
      setError('Please enter the code manually');
      setTimeout(() => setError(''), 2000);
    }
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
        <h1 className="text-2xl font-black text-white ml-4">Join Room</h1>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          {/* Icon */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🔍
            </motion.div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">
              Enter Room Code
            </h2>
            <p className="text-gray-600">
              Enter the 6-character code shared by your friend
            </p>
          </div>

          {/* Code Input */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-12 h-14 rounded-lg flex items-center justify-center text-2xl font-black border-4 transition-all ${
                    roomCode[i]
                      ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white border-blue-600 shadow-lg'
                      : 'bg-gray-100 text-gray-400 border-gray-300'
                  }`}
                  style={
                    roomCode[i]
                      ? {
                          boxShadow: '0 4px 0 0 #2563eb',
                        }
                      : undefined
                  }
                >
                  {roomCode[i] || '·'}
                </motion.div>
              ))}
            </div>

            {/* Hidden input for mobile keyboards */}
            <input
              type="text"
              value={roomCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-gray-300 text-center text-xl font-bold tracking-widest uppercase focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Enter code"
              maxLength={6}
              autoFocus
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePaste}
              className="w-full p-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all border-2 border-gray-300"
            >
              📋 Paste Code
            </motion.button>
          </div>

          {/* Join Button */}
          <div className="space-y-3">
            {isSearching ? (
              <div className="p-6 bg-blue-50 rounded-xl text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block text-3xl mb-2"
                >
                  🔄
                </motion.div>
                <div className="text-blue-700 font-medium">Joining room...</div>
              </div>
            ) : (
              <>
                <GameButton
                  onClick={handleJoin}
                  disabled={roomCode.length !== 6}
                  className="w-full"
                  size="lg"
                >
                  🚀 Join Room
                </GameButton>
                <GameButton onClick={onBack} variant="secondary" className="w-full">
                  Cancel
                </GameButton>
              </>
            )}
          </div>

          {/* Recent Rooms (Optional) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t-2 border-gray-200"
          >
            <div className="text-sm font-medium text-gray-600 mb-3">Recent Rooms</div>
            <div className="space-y-2">
              {['ABC123', 'XYZ789'].map((code, i) => (
                <motion.button
                  key={code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCodeChange(code)}
                  className="w-full p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium transition-all border-2 border-purple-200 text-left"
                >
                  <span className="text-sm">🕐 {i === 0 ? '2 min ago' : '10 min ago'}</span>
                  <br />
                  <span className="font-black">{code}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
