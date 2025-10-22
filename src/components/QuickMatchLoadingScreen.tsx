import { motion } from 'motion/react';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';

interface QuickMatchLoadingScreenProps {
  onMatchFound: () => void;
  onCancel: () => void;
}

export function QuickMatchLoadingScreen({ onMatchFound, onCancel }: QuickMatchLoadingScreenProps) {
  const [dots, setDots] = useState('');
  const [searchingText, setSearchingText] = useState('Searching for opponent');

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const textVariations = [
      'Searching for opponent',
      'Finding your match',
      'Looking for players',
      'Matching you up'
    ];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % textVariations.length;
      setSearchingText(textVariations[textIndex]);
    }, 2000);

    // Simulate finding a match after 3 seconds
    const timeout = setTimeout(() => {
      onMatchFound();
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [onMatchFound]);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl text-center">
          {/* Animated Loader */}
          <div className="relative mb-8 h-40 flex items-center justify-center">
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 rounded-full border-8 border-blue-200 border-t-blue-500"
            />
            
            {/* Middle pulsing circle */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-500 opacity-50"
            />
            
            {/* Inner rotating blocks */}
            <div className="relative w-16 h-16">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity, delay: i * 0.2 }
                  }}
                  className="absolute w-6 h-6 rounded-lg"
                  style={{
                    background: ['#3b82f6', '#ef4444', '#eab308', '#22c55e'][i],
                    top: i === 0 || i === 1 ? 0 : 'auto',
                    bottom: i === 2 || i === 3 ? 0 : 'auto',
                    left: i === 0 || i === 2 ? 0 : 'auto',
                    right: i === 1 || i === 3 ? 0 : 'auto',
                  }}
                />
              ))}
            </div>

            {/* Center icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute text-4xl"
            >
              🎯
            </motion.div>
          </div>

          {/* Status Text */}
          <motion.h2
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl font-black text-gray-800 mb-2"
          >
            {searchingText}{dots}
          </motion.h2>
          <p className="text-gray-600 mb-8">
            Please wait while we find you a worthy opponent
          </p>

          {/* Animated player count */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-4 bg-blue-50 rounded-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">👥</span>
              <motion.span
                key={Math.random()}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xl font-black text-blue-600"
              >
                {Math.floor(Math.random() * 50) + 120}
              </motion.span>
              <span className="text-gray-600">players online</span>
            </div>
          </motion.div>

          {/* Cancel Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="w-full px-8 py-4 rounded-xl font-bold bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-lg border-2 border-black/10 transition-all"
            style={{
              boxShadow: '0 4px 0 0 #6b7280',
            }}
          >
            Cancel Search
          </motion.button>
        </Card>
      </motion.div>
    </div>
  );
}
