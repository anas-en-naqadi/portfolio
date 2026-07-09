'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import AboutWindow from './windows/AboutWindow'
import ExperienceWindow from './windows/ExperienceWindow'
import ProjectsWindow from './windows/ProjectsWindow'
import SkillsWindow from './windows/SkillsWindow'
import ContactWindow from './windows/ContactWindow'
import { personalInfo } from '@/lib/data'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '../shared/LanguageSwitcher'
import { useTheme } from '@/hooks/useTheme'
import clsx from 'clsx'
type WindowType = 'about' | 'experience' | 'projects' | 'skills' | 'contact'

interface WindowState {
  isOpen: boolean
  isMinimized: boolean
  zIndex: number
}

export default function DesktopOS() {
  const t = useTranslations()
  const { theme, toggleTheme } = useTheme()
  const desktopRef = useRef<HTMLDivElement>(null)
  const [openWindows, setOpenWindows] = useState<Record<WindowType, WindowState>>({
    about: { isOpen: false, isMinimized: false, zIndex: 100 },
    experience: { isOpen: false, isMinimized: false, zIndex: 100 },
    projects: { isOpen: false, isMinimized: false, zIndex: 100 },
    skills: { isOpen: false, isMinimized: false, zIndex: 100 },
    contact: { isOpen: false, isMinimized: false, zIndex: 100 },
  })
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [nextZIndex, setNextZIndex] = useState(101)
  const [maximizedWindows, setMaximizedWindows] = useState<Set<WindowType>>(new Set())

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.start-menu') && !target.closest('.start-button')) {
        setIsStartMenuOpen(false)
      }
    }

    if (isStartMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isStartMenuOpen])

  const desktopIcons = [
    { id: 'about', icon: undefined, image: personalInfo.profileImage, label: t('common.about') },
    { id: 'experience', icon: '🚀', label: t('common.experience') },
    { id: 'projects', icon: '📱', label: t('common.projects') },
    { id: 'skills', icon: '⚡', label: t('common.skills') },
    { id: 'contact', icon: '📧', label: t('common.contact') },
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
    setIsStartMenuOpen(false)
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
      [windowId]: {
        ...prev[windowId],
        zIndex: nextZIndex,
      },
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

  const taskbarApps = Object.entries(openWindows)
    .filter(([_, state]) => state.isOpen || state.isMinimized)
    .map(([id, state]) => {
      const appData = {
        about: { icon: '💼', title: t('common.about'), subtitle: 'Personal information' },
        experience: { icon: '🚀', title: t('common.experience'), subtitle: 'Professional journey' },
        projects: { icon: '📱', title: t('common.projects'), subtitle: 'Featured work' },
        skills: { icon: '⚡', title: t('common.skills'), subtitle: 'Technical expertise' },
        contact: { icon: '📧', title: t('common.contact'), subtitle: 'Get in touch' },
      }
      return {
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        icon: desktopIcons.find((icon) => icon.id === id)?.icon || '💼',
        isActive: state.isOpen,
        previewData: appData[id as WindowType],
        onClick: () => {
          if (state.isOpen) {
            minimizeWindow(id as WindowType)
          } else if (state.isMinimized) {
            // Restore from minimized
            setOpenWindows((prev) => ({
              ...prev,
              [id]: { ...prev[id as WindowType], isOpen: true, isMinimized: false, zIndex: nextZIndex },
            }))
            setNextZIndex((prev) => prev + 1)
          } else {
            openWindow(id as WindowType)
          }
        },
      }
    })

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = personalInfo.cvPath
    link.download = 'Anas_En-Naqadi_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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

  return (
    <div ref={desktopRef} className={clsx('desktop-os', theme)}>
      {/* Language Switcher */}
      <div className="absolute top-5 right-5 z-20">
        <LanguageSwitcher />
      </div>

      {/* Desktop Icons */}
      <div className="desktop-icons">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            image={icon.image}
            label={icon.label}
            onClick={() => openWindow(icon.id as WindowType)}
            isSelected={openWindows[icon.id as WindowType]?.isOpen}
          />
        ))}
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
            initialPosition={{
              x: 100 + (Object.keys(openWindows).indexOf(windowId) * 30),
              y: 50 + (Object.keys(openWindows).indexOf(windowId) * 30),
            }}
          >
            {windowComponents[windowId]}
          </Window>
        )
      })}

      {/* Taskbar */}
      <Taskbar apps={taskbarApps} onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)} />

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenWindow={openWindow}
        onDownloadCV={downloadCV}
        theme={theme}
        toggleTheme={toggleTheme}
      />

    </div>
  )
}

