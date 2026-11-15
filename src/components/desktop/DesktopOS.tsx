'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import MacOSMenuBar from './MacOSMenuBar'
import AboutWindow from './windows/AboutWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import SkillsWindow from './windows/SkillsWindow'
import ContactWindow from './windows/ContactWindow'
import { personalInfo, socialLinks } from '@/lib/data'
import { getAppleIcon } from '@/components/shared/AppleIcons'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'

type WindowType = 'about' | 'experience' | 'projects' | 'skills' | 'contact'

interface WindowState {
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
}

const MENU_BAR_HEIGHT = 28
const DOCK_HEIGHT = 80

export default function DesktopOS() {
  const t = useTranslations()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const [openWindows, setOpenWindows] = useState<Record<WindowType, WindowState>>({
    about: { isOpen: false, isMinimized: false, zIndex: 100 },
    experience: { isOpen: false, isMinimized: false, zIndex: 100 },
    projects: { isOpen: false, isMinimized: false, zIndex: 100 },
    skills: { isOpen: false, isMinimized: false, zIndex: 100 },
    contact: { isOpen: false, isMinimized: false, zIndex: 100 },
  })
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false)
  const [nextZIndex, setNextZIndex] = useState(101)
  const [maximizedWindows, setMaximizedWindows] = useState<Set<WindowType>>(new Set())

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.start-menu') && !target.closest('.start-button')) {
        setIsLaunchpadOpen(false)
      }
    }
    if (isLaunchpadOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isLaunchpadOpen])

  const desktopIcons: { id: WindowType; image?: string; label: string }[] = [
    { id: 'about', image: personalInfo.profileImage, label: t('common.about') },
    { id: 'experience', label: t('common.experience') },
    { id: 'projects', label: t('common.projects') },
    { id: 'skills', label: t('common.skills') },
    { id: 'contact', label: t('common.contact') },
  ]

  const openWindow = (windowId: WindowType) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: {
        isOpen: true,
        isMinimized: false,
        zIndex: nextZIndex,
      },
    }))
    setNextZIndex((prev) => prev + 1)
    setIsLaunchpadOpen(false)
  }

  const closeWindow = (windowId: WindowType) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isOpen: false, isMinimized: false },
    }))
    setMaximizedWindows((prev) => {
      const newSet = new Set(prev)
      newSet.delete(windowId)
      return newSet
    })
  }

  const minimizeWindow = (windowId: WindowType) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isOpen: false, isMinimized: true },
    }))
  }

  const bringToFront = (windowId: WindowType) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], zIndex: nextZIndex },
    }))
    setNextZIndex((prev) => prev + 1)
  }

  const handleMaximize = (windowId: WindowType) => {
    setMaximizedWindows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(windowId)) {
        newSet.delete(windowId)
      } else {
        newSet.add(windowId)
      }
      return newSet
    })
    bringToFront(windowId)
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = personalInfo.cvPath
    link.download = 'Anas_En-Naqadi_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const dockApps = (Object.keys(openWindows) as WindowType[]).map((id) => {
    const state = openWindows[id]
    return {
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      isOpen: state.isOpen,
      isMinimized: state.isMinimized,
      onClick: () => {
        if (state.isOpen) {
          minimizeWindow(id)
        } else if (state.isMinimized) {
          setOpenWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZIndex },
          }))
          setNextZIndex((prev) => prev + 1)
        } else {
          openWindow(id)
        }
      },
    }
  })

  const windowTitles: Record<WindowType, string> = {
    about: t('common.about'),
    experience: t('common.experience'),
    projects: t('common.projects'),
    skills: t('common.skills'),
    contact: t('common.contact'),
  }

  const windowIcons: Record<WindowType, React.ReactNode> = {
    about: getAppleIcon('about', 16),
    experience: getAppleIcon('experience', 16),
    projects: getAppleIcon('projects', 16),
    skills: getAppleIcon('skills', 16),
    contact: getAppleIcon('contact', 16),
  }

  const windowComponents: Record<WindowType, React.ReactNode> = {
    about: <AboutWindow />,
    experience: <ExperienceWindow />,
    projects: <ProjectsWindow />,
    skills: <SkillsWindow />,
    contact: <ContactWindow />,
  }

  const getInitialPosition = (windowId: WindowType): { x: number; y: number } => {
    const index = (Object.keys(openWindows) as WindowType[]).indexOf(windowId)
    return {
      x: 120 + index * 30,
      y: MENU_BAR_HEIGHT + 20 + index * 30,
    }
  }

  const wallpaper = '/images/desktop-bg.png'
  const fallbackGradient = isDark
    ? 'radial-gradient(circle at 80% 20%, rgba(120, 50, 150, 0.35) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(50, 80, 180, 0.35) 0%, transparent 60%)'
    : 'radial-gradient(circle at 80% 20%, rgba(255, 180, 200, 0.45) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(100, 180, 255, 0.4) 0%, transparent 60%)'

  // Find currently active window (highest zIndex)
  const activeWindowId = (Object.keys(openWindows) as WindowType[])
    .filter((id) => openWindows[id].isOpen && !openWindows[id].isMinimized)
    .sort((a, b) => openWindows[b].zIndex - openWindows[a].zIndex)[0]

  const activeAppTitle = activeWindowId ? windowTitles[activeWindowId] : 'Finder'

  return (
    <div
      className={clsx('desktop-os', theme)}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#121024',
        backgroundImage: `url('${wallpaper}'), ${fallbackGradient}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Soft contrast scrim over wallpaper (consistent across light & dark modes) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 12, 24, 0.14) 0%, rgba(10, 12, 24, 0.04) 45%, rgba(10, 12, 24, 0.25) 100%)',
        }}
      />

      {/* macOS Menu Bar — pinned top, z-50 */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50000 }}>
        <MacOSMenuBar theme={theme} toggleTheme={toggleTheme} activeAppTitle={activeAppTitle} />
      </div>

      {/* Desktop area — below menu bar, above dock */}
      <div
        style={{
          position: 'fixed',
          top: MENU_BAR_HEIGHT,
          left: 0,
          right: 0,
          bottom: DOCK_HEIGHT,
          overflow: 'hidden',
        }}
      >
        {/* Desktop Icons — left column */}
        <div
          className="desktop-icons"
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              image={icon.image}
              label={icon.label}
              onClick={() => openWindow(icon.id)}
              isSelected={openWindows[icon.id]?.isOpen}
            />
          ))}
        </div>
      </div>

      {/* Windows */}
      {(Object.keys(openWindows) as WindowType[]).map((windowId) => {
        const windowState = openWindows[windowId]
        return (
          <Window
            key={windowId}
            id={`${windowId}Window`}
            title={windowTitles[windowId]}
            icon={windowIcons[windowId]}
            isOpen={windowState.isOpen && !windowState.isMinimized}
            onClose={() => closeWindow(windowId)}
            onMinimize={() => minimizeWindow(windowId)}
            onMaximize={() => handleMaximize(windowId)}
            zIndex={windowState.zIndex}
            isMaximized={maximizedWindows.has(windowId)}
            initialPosition={getInitialPosition(windowId)}
            theme={theme}
          >
            {windowComponents[windowId]}
          </Window>
        )
      })}

      {/* macOS Dock */}
      <Taskbar
        apps={dockApps}
        onStartClick={() => setIsLaunchpadOpen(!isLaunchpadOpen)}
        theme={theme}
        onDownloadCV={downloadCV}
        onGitHub={() => window.open(process.env.NEXT_PUBLIC_GITHUB_URL || socialLinks.github, '_blank', 'noopener,noreferrer')}
        onLinkedIn={() => window.open(process.env.NEXT_PUBLIC_LINKEDIN_URL || socialLinks.linkedin, '_blank', 'noopener,noreferrer')}
      />

      {/* Launchpad */}
      <StartMenu
        isOpen={isLaunchpadOpen}
        onClose={() => setIsLaunchpadOpen(false)}
        onOpenWindow={openWindow}
        onDownloadCV={downloadCV}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  )
}
