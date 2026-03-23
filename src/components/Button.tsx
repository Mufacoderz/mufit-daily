'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function Button({ children, onClick, variant = 'primary', size = 'md', type = 'button', disabled, className }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        'relative overflow-hidden flex items-center justify-center gap-1.5 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' ? 'text-xs px-3 py-2' : 'text-sm px-4 py-2.5',
        variant === 'primary' && 'bg-fire-grad text-white shadow-fire hover:shadow-fire-lg',
        variant === 'secondary' && 'bg-stone-800 border border-stone-700/50 text-stone-300 hover:text-white hover:bg-stone-700',
        variant === 'ghost' && 'text-stone-400 hover:text-white hover:bg-stone-800',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
