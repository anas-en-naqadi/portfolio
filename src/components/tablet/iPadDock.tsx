'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import IPadAppIcon from './iPadAppIcon'

interface DockApp {
  id: string
  label: string
  onClick: () => void
}

interface iPadDockProps {
  apps: DockApp[]
  theme: 'dark' | 'light'
  iconSize?: number
}

export default function iPadDock({ apps, theme, iconSize = 62 }: iPadDockProps) {
  const t = useTranslations('tablet.home')
  const isDark = theme === 'dark'

  return (
    <motion.nav
      className="fixed bottom-4 sm:bottom-6 z-40 max-w-[calc(100vw-2rem)]"
      initial={{ y: 40, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      style={{ left: '50%' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      aria-label={t('dockLabel')}
    >
      {/* Glassmorphic dock pill */}
      <div
        className="flex items-end justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-[26px] sm:rounded-[30px]"
        style={{
          background: isDark
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {apps.map((app, index) => (
          <IPadAppIcon
            key={app.id}
            id={app.id}
            label={app.label}
            onClick={app.onClick}
            index={index}
            size={iconSize}
            showLabel={false}
          />
        ))}
      </div>
    </motion.nav>
  )
}
