import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { Card } from './ui/card';

interface ResultsScreenProps {
  result: 'win' | 'lose';
  onPlayAgain: () => void;
  onHome: () => void;
}

export function ResultsScreen({ result, onPlayAgain, onHome }: ResultsScreenProps) {
  const isWin = result === 'win';
  
  // Mock game stats
  const gameStats = {
    playerScore: isWin ? 3 : 2,
    opponentScore: isWin ? 2 : 3,
    roundResults: [
      { round: 1, winner: 'player', theme: 'Animals', words: ['ANIMAL', 'LION', 'NEWT'] },
      { round: 2, winner: 'opponent', theme: 'Animals', words: ['TIGER', 'RABBIT', 'TURTLE'] },
      { round: 3, winner: 'player', theme: 'Animals', words: ['EAGLE', 'ELEPHANT', 'TIGER'] },
      { round: 4, winner: isWin ? 'player' : 'opponent', theme: 'Animals', words: ['RABBIT', 'TIGER', 'RHINO'] },
      { round: 5, winner: isWin ? 'player' : 'opponent', theme: 'Animals', words: ['OCTOPUS', 'SNAKE', 'ELEPHANT'] },
    ],
    wordsPlayed: 23,
    averageResponseTime: '12.3s',
    pointsEarned: isWin ? 150 : 75,
  };

  return (
    <div className={`
      min-h-screen p-4 flex flex-col
      ''
    `}>
      {/* Main Result */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="text-center mb-8 pt-8"
      >
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-8xl mb-4"
        >
          {isWin ? '🏆' : '😔'}
        </motion.div>
        
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-black text-white mb-2"
        >
          {isWin ? 'Victory!' : 'Game Over'}
        </motion.h1>
        
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-white/90"
        >
          {isWin ? 'Awesome word building!' : 'Better luck next time!'}
        </motion.p>
      </motion.div>

      {/* Final Score */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
      >
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <h2 className="text-xl font-black text-center text-gray-800 mb-4">Final Score</h2>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className={`text-4xl font-black ${isWin ? 'text-green-600' : 'text-red-600'}`}>
                {gameStats.playerScore}
              </div>
              <div className="text-sm text-gray-600">You</div>
            </div>
            <div className="text-2xl font-black text-gray-400">:</div>
            <div className="text-center">
              <div className={`text-4xl font-black ${!isWin ? 'text-green-600' : 'text-red-600'}`}>
                {gameStats.opponentScore}
              </div>
              <div className="text-sm text-gray-600">Alex</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Round by Round Results */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mb-6"
      >
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-lg font-black text-gray-800 mb-4">Round Results</h3>
          <div className="space-y-3">
            {gameStats.roundResults.map((round, index) => (
              <motion.div
                key={round.round}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className={`
                  p-3 rounded-xl flex items-center justify-between
                  ${round.winner === 'player' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${round.winner === 'player' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
                  `}>
                    {round.round}
                  </div>
                  <div>
                    <div className={`font-medium ${round.winner === 'player' ? 'text-green-800' : 'text-red-800'}`}>
                      {round.winner === 'player' ? 'Won' : 'Lost'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {round.words.join(' → ')}
                    </div>
                  </div>
                </div>
                <div className="text-xl">
                  {round.winner === 'player' ? '✅' : '❌'}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Performance Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="mb-8"
      >
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-lg font-black text-gray-800 mb-4">Your Performance</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-blue-600">{gameStats.wordsPlayed}</div>
              <div className="text-xs text-gray-600">Words Played</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-600">{gameStats.averageResponseTime}</div>
              <div className="text-xs text-gray-600">Avg Response</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-black ${isWin ? 'text-green-600' : 'text-orange-600'}`}>
                +{gameStats.pointsEarned}
              </div>
              <div className="text-xs text-gray-600">Points Earned</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="space-y-4 mt-auto"
      >
        <GameButton
          onClick={onPlayAgain}
          size="lg"
          className="w-full bg-white text-gray-800 hover:bg-gray-100"
        >
          🔄 Play Again
        </GameButton>
        
        <div className="grid grid-cols-2 gap-3">
          <GameButton
            onClick={onHome}
            variant="secondary"
          >
            🏠 Home
          </GameButton>
          <GameButton
            variant="secondary"
          >
            📊 Leaderboard
          </GameButton>
        </div>
      </motion.div>
    </div>
  );
}