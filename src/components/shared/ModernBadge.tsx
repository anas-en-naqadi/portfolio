'use client'

import { motion } from 'framer-motion'

interface ModernBadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'info'
  className?: string
}

export default function ModernBadge({ 
  children, 
  variant = 'primary',
  className = '' 
}: ModernBadgeProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-dark text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white',
    info: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white',
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold
        shadow-md hover:shadow-lg transition-all duration-200
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </motion.span>
  )
}


