'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getAppleIcon } from '../shared/AppleIcons'

type WindowType = 'about' | 'experience' | 'projects' | 'skills' | 'contact'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenWindow: (window: WindowType) => void
  onDownloadCV: () => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

interface LaunchpadApp {
  id: WindowType | 'cv' | 'github'
  icon: string
  label: string
  color: string
}

const LAUNCHPAD_APPS: LaunchpadApp[] = [
  { id: 'about', icon: '💼', label: 'About', color: 'linear-gradient(135deg, #007aff, #0055d4)' },
  { id: 'experience', icon: '🚀', label: 'Experience', color: 'linear-gradient(135deg, #ff9500, #ff6000)' },
  { id: 'projects', icon: '📱', label: 'Projects', color: 'linear-gradient(135deg, #34c759, #248a3d)' },
  { id: 'skills', icon: '⚡', label: 'Skills', color: 'linear-gradient(135deg, #ffcc00, #ff9500)' },
  { id: 'contact', icon: '📧', label: 'Contact', color: 'linear-gradient(135deg, #af52de, #5e17eb)' },
  { id: 'cv', icon: '📥', label: 'Download CV', color: 'linear-gradient(135deg, #ff3b30, #c0392b)' },
  { id: 'github', icon: '🐙', label: 'GitHub', color: 'linear-gradient(135deg, #3a3a3c, #1c1c1e)' },
]

export default function StartMenu({
  isOpen,
  onClose,
  onOpenWindow,
  onDownloadCV,
}: StartMenuProps) {
  const t = useTranslations()

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleAppClick = (app: LaunchpadApp) => {
    if (app.id === 'cv') {
      onDownloadCV()
      onClose()
    } else if (app.id === 'github') {
      window.open('https://github.com/anas-en-naqadi', '_blank', 'noopener,noreferrer')
      onClose()
    } else {
      onOpenWindow(app.id as WindowType)
      onClose()
    }
  }

  const appLabels: Partial<Record<string, string>> = {
    about: t('common.about'),
    experience: t('common.experience'),
    projects: t('common.projects'),
    skills: t('common.skills'),
    contact: t('common.contact'),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="start-menu launchpad-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Launchpad"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              marginBottom: '40px',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            Launchpad
          </motion.h1>

          {/* App grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '28px 24px',
              padding: '0 24px',
              maxWidth: '480px',
              width: '100%',
            }}
          >
            {LAUNCHPAD_APPS.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{
                  delay: 0.05 * index,
                  type: 'spring',
                  stiffness: 320,
                  damping: 22,
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
                onClick={() => handleAppClick(app)}
                role="button"
                tabIndex={0}
                aria-label={appLabels[app.id] ?? app.label}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAppClick(app) }}
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '22%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getAppleIcon(app.id, '100%')}
                </motion.div>
                <span
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '11px',
                    fontWeight: 500,
                    textAlign: 'center',
                    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                    lineHeight: 1.2,
                    maxWidth: '72px',
                    wordBreak: 'break-word',
                  }}
                >
                  {appLabels[app.id] ?? app.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Close hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.4 }}
            style={{
              color: '#fff',
              fontSize: '12px',
              marginTop: '48px',
            }}
          >
            Press Esc or click outside to close
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
