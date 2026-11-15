'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'
import { useRouter, usePathname } from '@/i18n/routing'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { personalInfo } from '@/lib/data'
import IPadStatusBar from './iPadStatusBar'
import IPadDock from './iPadDock'
import IPadAppIcon from './iPadAppIcon'
import IPadSheet from './iPadSheet'
import IPadWidgets from './iPadWidgets'
import IPadAbout from './IPadAbout'
import IPadExperience from './IPadExperience'
import IPadProjects from './IPadProjects'
import IPadSkills from './IPadSkills'
import IPadContact from './IPadContact'
import IPadSettings from './IPadSettings'
import { getAppleIcon } from '../shared/AppleIcons'
import AnimatedSection from '../shared/AnimatedSection'

type AppId = 'about' | 'calendar' | 'appstore' | 'notes' | 'mail' | 'settings'

interface AppConfig {
  id: AppId
  label: string
}

const appConfigs: AppConfig[] = [
  { id: 'about', label: 'About Me' },
  { id: 'calendar', label: 'Experiences' },
  { id: 'appstore', label: 'Projects' },
  { id: 'notes', label: 'Skills' },
  { id: 'mail', label: 'Contact' },
  { id: 'settings', label: 'Settings' },
]

const appTitles: Record<AppId, string> = {
  about: 'About Me',
  calendar: 'Experiences',
  appstore: 'Projects',
  notes: 'Skills',
  mail: 'Contact',
  settings: 'Settings',
}

export default function TabletOS() {
  const { theme, toggleTheme } = useTheme()
  const [activeSheet, setActiveSheet] = useState<AppId | null>(null)
  const isDark = theme === 'dark'
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const openApp = (appId: AppId) => {
    setActiveSheet(appId)
  }

  const closeSheet = () => setActiveSheet(null)

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  const fallbackGradient = isDark
    ? 'radial-gradient(circle at 80% 20%, rgba(120, 50, 150, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(50, 80, 180, 0.3) 0%, transparent 60%)'
    : 'radial-gradient(circle at 80% 20%, rgba(255, 180, 200, 0.45) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(100, 180, 255, 0.4) 0%, transparent 60%)'

  const dockApps = [
    { 
      id: 'phone', 
      label: 'Phone', 
      onClick: () => { window.location.href = `tel:${personalInfo.phone.replace(/\s+/g, '')}` } 
    },
    { 
      id: 'github', 
      label: 'GitHub', 
      onClick: () => window.open(process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/anas-en-naqadi', '_blank') 
    },
    { 
      id: 'linkedin', 
      label: 'LinkedIn', 
      onClick: () => window.open(process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/anas-en-naqadi', '_blank') 
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      onClick: () => window.open(`https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`, '_blank') 
    },
  ]

  const windowComponents: Record<AppId, React.ReactNode> = {
    about: <IPadAbout theme={theme} />,
    calendar: <IPadExperience theme={theme} />,
    appstore: <IPadProjects theme={theme} />,
    notes: <IPadSkills theme={theme} />,
    mail: <IPadContact theme={theme} />,
    settings: <IPadSettings theme={theme} toggleTheme={toggleTheme} />,
  }

  return (
    <div
      className="h-screen w-full overflow-hidden relative flex flex-col select-none"
      style={{
        backgroundColor: '#150f28',
        backgroundImage: `url('/images/tablet-bg.png'), ${fallbackGradient}`,
        backgroundSize: 'cover',
        backgroundPosition: '58% center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Subtle blur + soft contrast scrim over wallpaper (consistent across light & dark modes) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none backdrop-blur-[1.5px]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 12, 24, 0.14) 0%, rgba(10, 12, 24, 0.04) 45%, rgba(10, 12, 24, 0.25) 100%)',
        }}
      />

      {/* Status Bar */}
      <div className="relative z-50">
        <IPadStatusBar theme={theme} isAppOpen={activeSheet !== null} />
      </div>

      {/* Main content layout (Widgets & Apps centered on X/Y, stretched to 90%) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-[90%] mx-auto gap-12 md:gap-16 overflow-hidden">
        
        {/* TOP: Weather/Clock widgets & profile (stretched & centered) */}
        <div className="w-full flex justify-center flex-shrink-0">
          <IPadWidgets theme={theme} />
        </div>

        {/* BOTTOM: App grid in a highly spacious, clean layout */}
        <div className="w-full">
          <div
            className="grid grid-cols-6 w-full max-w-4xl mx-auto justify-items-center gap-y-8 px-2"
            role="main"
            aria-label="Home screen app grid"
          >
            {appConfigs.map((app, index) => (
              <IPadAppIcon
                key={app.id}
                id={app.id}
                label={app.label}
                onClick={() => openApp(app.id)}
                index={index}
                size={82}
              />
            ))}
          </div>
        </div>

      </div>

      {/* iPad Dock */}
      <IPadDock apps={dockApps} theme={theme} />

      {/* App Sheets (Modal view) */}
      <IPadSheet
        isOpen={activeSheet !== null}
        onClose={closeSheet}
        title={activeSheet ? appTitles[activeSheet] : ''}
        icon={activeSheet ? getAppleIcon(activeSheet, 28) : null}
        theme={theme}
      >
        {activeSheet && windowComponents[activeSheet]}
      </IPadSheet>

    </div>
  )
}
