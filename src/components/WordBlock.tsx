import { motion } from 'motion/react';

interface WordBlockProps {
  word: string;
  color: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const colorClasses = {
  blue: 'bg-blue-500 text-white shadow-blue-200',
  red: 'bg-red-500 text-white shadow-red-200',
  yellow: 'bg-yellow-500 text-black shadow-yellow-200',
  green: 'bg-green-500 text-white shadow-green-200',
  purple: 'bg-purple-500 text-white shadow-purple-200',
  orange: 'bg-orange-500 text-white shadow-orange-200',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

export function WordBlock({ word, color, size = 'md', delay = 0 }: WordBlockProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay 
      }}
      className={`
        inline-block rounded-xl font-bold uppercase tracking-wide
        shadow-lg border-2 border-black/10 transform hover:scale-105
        transition-transform cursor-default select-none
        ${colorClasses[color]} ${sizeClasses[size]}
      `}
      style={{
        boxShadow: `0 4px 0 0 ${color === 'yellow' ? '#eab308' : color === 'blue' ? '#2563eb' : color === 'red' ? '#dc2626' : color === 'green' ? '#16a34a' : color === 'purple' ? '#9333ea' : '#ea580c'}`,
      }}
    >
      {word}
    </motion.div>
  );
}