import { motion } from 'motion/react';
import { GameButton } from './GameButton';
import { Input } from './ui/input';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
  onGuestPlay: () => void;
}

export function LoginScreen({ onLogin, onGuestPlay }: LoginScreenProps) {
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full max-w-md bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-border/50"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-card-foreground mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Ready to build some word chains?</p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-card-foreground mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-input-background text-foreground focus:border-blue-500 focus:ring-0"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-input-background text-foreground focus:border-blue-500 focus:ring-0"
            />
          </div>

          <GameButton 
            onClick={onLogin} 
            className="w-full" 
            size="lg"
            disabled={!username.trim()}
          >
            Sign In
          </GameButton>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-border"></div>
          <span className="px-3 text-muted-foreground text-sm">or</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <GameButton 
            variant="secondary" 
            className="w-full flex items-center justify-center gap-3"
          >
            <span className="text-lg">🔵</span>
            Continue with Google
          </GameButton>
          
          <GameButton 
            variant="secondary" 
            className="w-full flex items-center justify-center gap-3"
          >
            <span className="text-lg">🍎</span>
            Continue with Apple
          </GameButton>
        </div>

        {/* Guest Play */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <GameButton 
            onClick={onGuestPlay}
            variant="success" 
            className="w-full"
          >
            🎮 Play as Guest
          </GameButton>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-blue-600 font-medium hover:underline">
              Sign up here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}