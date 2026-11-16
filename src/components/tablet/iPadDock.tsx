'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import IPadAppIcon from './iPadAppIcon'

interface DockApp {
  id: string
  label: string
  onClick: () => void
}

interface IPadDockProps {
  apps: DockApp[]
  theme: 'dark' | 'light'
  iconSize?: number
}

export default function IPadDock({ apps, theme, iconSize = 62 }: IPadDockProps) {
  const t = useTranslations('tablet.home')
  const isDark = theme === 'dark'

  return (
    <motion.nav
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 max-w-[calc(100vw-2rem)]"
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
            : 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(22px) saturate(165%)',
          WebkitBackdropFilter: 'blur(22px) saturate(165%)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.32)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.45)',
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
