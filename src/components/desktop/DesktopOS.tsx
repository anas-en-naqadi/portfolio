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

  const desktopIcons = [
    { id: 'about' as WindowType, icon: undefined as string | undefined, image: personalInfo.profileImage, label: t('common.about') },
    { id: 'experience' as WindowType, icon: '🚀', label: t('common.experience') },
    { id: 'projects' as WindowType, icon: '📱', label: t('common.projects') },
    { id: 'skills' as WindowType, icon: '⚡', label: t('common.skills') },
    { id: 'contact' as WindowType, icon: '📧', label: t('common.contact') },
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
    const iconMap: Record<WindowType, string> = {
      about: '💼',
      experience: '🚀',
      projects: '📱',
      skills: '⚡',
      contact: '📧',
    }
    return {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      icon: iconMap[id],
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

  const windowIcons: Record<WindowType, string> = {
    about: '💼',
    experience: '🚀',
    projects: '📱',
    skills: '⚡',
    contact: '📧',
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

  const wallpaper = isDark ? '/images/dark-mode.jpg' : '/images/light-mode.jpg'

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
        backgroundImage: `url('${wallpaper}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
              icon={icon.icon}
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
        onGitHub={() => window.open(socialLinks.github, '_blank', 'noopener,noreferrer')}
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
