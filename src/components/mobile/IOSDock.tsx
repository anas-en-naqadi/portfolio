'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import IOSAppIcon from './IOSAppIcon'

type AppId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact' | 'settings'

interface DockApp {
  id: string
  label: string
  badge?: number
  onClick?: () => void
}

interface IOSDockProps {
  onOpenApp: (appId: AppId) => void
  theme?: 'dark' | 'light'
  apps?: DockApp[]
}

export default function IOSDock({ onOpenApp, apps }: IOSDockProps) {
  const t = useTranslations()
  const defaultDockApps: DockApp[] = [
    { id: 'about', label: t('common.about') },
    { id: 'projects', label: t('common.projects') },
    { id: 'skills', label: t('common.skills') },
    { id: 'contact', label: t('common.contact') },
  ]
  const displayApps = apps || defaultDockApps

  return (
    <motion.div
      className="fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] z-40 pointer-events-auto w-fit max-w-[92vw]"
      initial={{ y: 50, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      style={{ left: '50%' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      role="navigation"
      aria-label={t('mobile.home.dockLabel')}
    >
      <div
        className="flex items-center justify-center gap-3 min-[380px]:gap-4 min-[540px]:gap-6 px-4 min-[380px]:px-6 py-2.5 sm:py-3 rounded-[28px]"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow:
            '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        }}
      >
        {displayApps.map((app, index) => (
          <IOSAppIcon
            key={app.id}
            id={app.id}
            label={app.label}
            onClick={app.onClick || (() => onOpenApp(app.id as AppId))}
            index={index}
            size={52}
            badge={app.badge}
            showLabel={false}
          />
        ))}
      </div>
    </motion.div>
  )
}
