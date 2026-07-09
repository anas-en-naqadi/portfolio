'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ModernCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  glass?: boolean
}

export default function ModernCard({ 
  children, 
  className = '', 
  hover = true,
  gradient = false,
  glass = false 
}: ModernCardProps) {
  const baseClasses = `
    rounded-2xl p-6
    ${glass 
      ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]' 
      : gradient
      ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20'
      : 'bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50'
    }
    ${hover ? 'transition-all duration-300' : ''}
    ${hover && !glass ? 'hover:shadow-xl hover:-translate-y-1' : ''}
    ${hover && glass ? 'hover:bg-white/15 hover:border-white/30' : ''}
  `

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  )
}


