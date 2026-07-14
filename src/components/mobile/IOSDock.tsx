'use client'

import { motion } from 'framer-motion'
import IOSAppIcon from './IOSAppIcon'

type AppId = 'about' | 'experience' | 'projects' | 'skills' | 'contact'

interface DockApp {
  id: string
  label: string
  badge?: number
  onClick?: () => void
}

interface IOSDockProps {
  onOpenApp: (appId: any) => void
  theme?: 'dark' | 'light'
  apps?: DockApp[]
}

const defaultDockApps: DockApp[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function IOSDock({ onOpenApp, theme = 'dark', apps }: IOSDockProps) {
  const isDark = theme === 'dark'
  const displayApps = apps || defaultDockApps

  return (
    <motion.div
      className="fixed bottom-6 z-40 pointer-events-auto w-[90%]"
      initial={{ y: 50, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      style={{ left: '50%' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      role="navigation"
      aria-label="iPhone Dock"
    >
      <div
        className="flex items-center gap-4 px-6 py-3 rounded-[28px]"
        style={{
          background: isDark
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: isDark
            ? '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 10px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}
      >
        {displayApps.map((app, index) => (
          <IOSAppIcon
            key={app.id}
            id={app.id}
            label={app.label}
            onClick={app.onClick || (() => onOpenApp(app.id))}
            index={index}
            size={54}
            badge={app.badge}
          />
        ))}
      </div>
    </motion.div>
  )
}
