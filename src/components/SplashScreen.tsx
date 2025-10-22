import { motion } from 'motion/react';
import { WordBlock } from './WordBlock';
import { GameButton } from './GameButton';

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-8"
      >
        {/* Logo */}
        <div className="mb-6">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl font-black text-white mb-2 tracking-tight"
          >
            WordLego
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white/90"
          >
            Build words. Build wins.
          </motion.div>
        </div>

        {/* Demo word chain */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <WordBlock word="CAT" color="blue" delay={0.8} />
          <WordBlock word="TIGER" color="red" delay={1.0} />
          <WordBlock word="ELEPHANT" color="yellow" delay={1.2} />
          <WordBlock word="TURTLE" color="green" delay={1.4} />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="space-y-3 mb-8"
        >
          <div className="text-white/90 text-lg">🎯 Theme-based word chains</div>
          <div className="text-white/90 text-lg">⏱️ 45-second rounds</div>
          <div className="text-white/90 text-lg">🏆 5 rounds per match</div>
          <div className="text-white/90 text-lg">👥 Play with friends online</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
        >
          <GameButton onClick={onContinue} size="lg" className="bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/50">
            Get Started
          </GameButton>
        </motion.div>
      </motion.div>
    </div>
  );
}