import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { WordBlock } from './WordBlock';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';

interface GameplayScreenProps {
  theme: string;
  onGameEnd: (result: 'win' | 'lose') => void;
  onBack: () => void;
}

export function GameplayScreen({ theme, onGameEnd, onBack }: GameplayScreenProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [wordChain, setWordChain] = useState(['ANIMAL']);
  const [currentRound, setCurrentRound] = useState(1);
  const [timer, setTimer] = useState(45);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [score, setScore] = useState({ player: 0, opponent: 0 });
  const [gameStatus, setGameStatus] = useState<'playing' | 'validating' | 'error'>('playing');
  const [errorMessage, setErrorMessage] = useState('');

  const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'orange'] as const;

  useEffect(() => {
    if (timer > 0 && gameStatus === 'playing') {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else if (timer === 0) {
      handleTimeout();
    }
  }, [timer, gameStatus]);

  const handleTimeout = () => {
    if (isPlayerTurn) {
      // Player timeout - opponent wins round
      handleRoundEnd(false);
    } else {
      // Opponent timeout - player wins round
      handleRoundEnd(true);
    }
  };

  const handleWordSubmit = () => {
    if (!currentWord.trim()) return;

    const lastWord = wordChain[wordChain.length - 1];
    const lastLetter = lastWord.charAt(lastWord.length - 1).toLowerCase();
    const firstLetter = currentWord.charAt(0).toLowerCase();

    if (firstLetter !== lastLetter) {
      setGameStatus('error');
      setErrorMessage(`Word must start with "${lastLetter.toUpperCase()}"`);
      setTimeout(() => {
        setGameStatus('playing');
        setErrorMessage('');
      }, 2000);
      return;
    }

    // Add word to chain
    setGameStatus('validating');
    setTimeout(() => {
      setWordChain([...wordChain, currentWord.toUpperCase()]);
      setCurrentWord('');
      setIsPlayerTurn(false);
      setTimer(45);
      setGameStatus('playing');

      // Simulate opponent move after 2-5 seconds
      setTimeout(() => {
        simulateOpponentMove();
      }, Math.random() * 3000 + 2000);
    }, 1000);
  };

  const simulateOpponentMove = () => {
    const opponentWords = ['TIGER', 'ELEPHANT', 'TURTLE', 'EAGLE', 'SNAKE', 'KANGAROO', 'OCTOPUS'];
    const lastWord = wordChain[wordChain.length - 1];
    const lastLetter = lastWord.charAt(lastWord.length - 1);
    
    // Find a word that starts with the last letter (simplified for demo)
    let opponentWord = opponentWords[Math.floor(Math.random() * opponentWords.length)];
    
    setWordChain(prev => [...prev, opponentWord]);
    setIsPlayerTurn(true);
    setTimer(45);
  };

  const handleRoundEnd = (playerWon: boolean) => {
    const newScore = { ...score };
    if (playerWon) {
      newScore.player++;
    } else {
      newScore.opponent++;
    }
    setScore(newScore);

    if (currentRound < 5) {
      setCurrentRound(currentRound + 1);
      setWordChain(['ANIMAL']);
      setTimer(45);
      setIsPlayerTurn(true);
      setCurrentWord('');
    } else {
      // Game over
      const finalResult = newScore.player > newScore.opponent ? 'win' : 'lose';
      setTimeout(() => onGameEnd(finalResult), 2000);
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 pt-4"
      >
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-white font-black">Round {currentRound}/5</div>
          <div className="text-white/80 text-sm">{theme}</div>
        </div>
        <div className="w-10 h-10"></div>
      </motion.div>

      {/* Timer */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex justify-center mb-6"
      >
        <div className={`
          w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black
          ${timer <= 10 ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-blue-600'}
          shadow-lg border-4 border-white/30
        `}>
          {timer}
        </div>
      </motion.div>

      {/* Score */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="text-2xl font-black text-blue-600">{score.player}</div>
              <div className="text-sm text-gray-600">You</div>
            </div>
            <div className="text-xl font-black text-gray-400">-</div>
            <div className="text-center flex-1">
              <div className="text-2xl font-black text-red-600">{score.opponent}</div>
              <div className="text-sm text-gray-600">Alex</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Word Chain */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card className="p-4 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <h3 className="text-sm font-medium text-gray-600 mb-3 text-center">Word Chain</h3>
          <div className="flex flex-wrap gap-2 justify-center min-h-[60px]">
            {wordChain.map((word, index) => (
              <WordBlock
                key={index}
                word={word}
                color={colors[index % colors.length]}
                size="sm"
                delay={index * 0.1}
              />
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          {isPlayerTurn ? (
            <>
              <div className="text-center mb-4">
                <h3 className="text-lg font-black text-gray-800">Your Turn!</h3>
                <p className="text-sm text-gray-600">
                  Enter a word starting with "{wordChain[wordChain.length - 1].charAt(wordChain[wordChain.length - 1].length - 1)}"
                </p>
              </div>
              
              {gameStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-center"
                >
                  <div className="text-red-600 font-medium">{errorMessage}</div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <Input
                  value={currentWord}
                  onChange={(e) => setCurrentWord(e.target.value.toUpperCase())}
                  placeholder="TYPE YOUR WORD"
                  className="flex-1 px-4 py-4 text-lg font-bold text-center rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                  onKeyPress={(e) => e.key === 'Enter' && handleWordSubmit()}
                  disabled={gameStatus !== 'playing'}
                />
                <GameButton
                  onClick={handleWordSubmit}
                  size="lg"
                  disabled={!currentWord.trim() || gameStatus !== 'playing'}
                >
                  {gameStatus === 'validating' ? '⏳' : '✓'}
                </GameButton>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🤔</div>
              <h3 className="text-lg font-black text-gray-800 mb-2">Alex is thinking...</h3>
              <div className="flex justify-center gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Game Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <div className="text-white/80 text-sm">
          {isPlayerTurn ? 'Your turn to play' : 'Waiting for opponent'}
        </div>
      </motion.div>
    </div>
  );
}