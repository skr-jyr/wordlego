import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { soundManager } from '../utils/sounds';

interface GameButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-300',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-gray-300',
  success: 'bg-green-500 hover:bg-green-600 text-white shadow-green-300',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-300',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function GameButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = ''
}: GameButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      onMouseEnter={() => {
        if (!disabled) {
          soundManager.playSound('hover').catch(() => {});
        }
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={disabled ? undefined : () => {
        soundManager.playSound('buttonClick').catch(() => {});
        onClick?.();
      }}
      disabled={disabled}
      className={`
        rounded-xl font-bold tracking-wide shadow-lg border-2 border-black/10
        transform transition-all duration-150 active:translate-y-1
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
      style={{
        boxShadow: disabled ? 'none' : `0 4px 0 0 ${variant === 'primary' ? '#2563eb' : variant === 'success' ? '#16a34a' : variant === 'danger' ? '#dc2626' : '#6b7280'}`,
      }}
    >
      {children}
    </motion.button>
  );
}