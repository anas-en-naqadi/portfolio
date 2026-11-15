'use client'

import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WindowPreviewProps {
  isVisible: boolean
  icon: ReactNode
  title: string
  subtitle: string
}

export default function WindowPreview({ isVisible, icon, title, subtitle }: WindowPreviewProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900/98 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 shadow-2xl z-[99998] max-w-[350px]"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="text-center text-white">
            <motion.div
              className="flex items-center justify-center mb-3 text-6xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {icon}
            </motion.div>
            <div className="text-lg font-bold mb-1.5 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {title}
            </div>
            <div className="text-xs text-gray-400 font-medium">{subtitle}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

