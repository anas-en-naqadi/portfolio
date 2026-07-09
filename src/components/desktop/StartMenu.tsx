'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { personalInfo, socialLinks } from '@/lib/data'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenWindow: (window: string) => void
  onDownloadCV: () => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function StartMenu({ isOpen, onClose, onOpenWindow, onDownloadCV, theme, toggleTheme }: StartMenuProps) {
  const t = useTranslations()
  
  const menuItems = [
    { icon: '💼', title: t('common.about'), desc: t('startMenu.whoIam'), window: 'about' },
    { icon: '🚀', title: t('common.experience'), desc: t('startMenu.myJourney'), window: 'experience' },
    { icon: '📱', title: t('common.projects'), desc: t('startMenu.myWork'), window: 'projects' },
    { icon: '⚡', title: t('common.skills'), desc: t('startMenu.techStack'), window: 'skills' },
    { icon: '📧', title: t('common.contact'), desc: t('startMenu.getInTouch'), window: 'contact' },
  ]

  const quickActions = [
    { icon: '📥', title: t('common.downloadCV'), desc: t('startMenu.getResume'), action: onDownloadCV },
    { icon: '💻', title: 'GitHub', desc: t('startMenu.viewRepos'), action: () => window.open(socialLinks.github, '_blank') },
    { icon: '📞', title: t('common.scheduleCall'), desc: t('startMenu.bookMeeting'), action: () => alert('Schedule a Call - Integrate with Calendly') },
    { icon: '✉️', title: t('common.emailMe'), desc: t('startMenu.directContact'), action: () => window.location.href = `mailto:${personalInfo.email}` },
  ]

  return (
    <>
      {isOpen && (
        <div className={`start-menu ${isOpen ? 'active' : ''}`} id="startMenu">
          {/* Header */}
          <div className="start-menu-header">
            <div className="start-menu-user">
              <div className="user-avatar">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  width={50}
                  height={50}
                  className="profile-photo"
                />
              </div>
              <div className="user-info">
                <h3>{personalInfo.name}</h3>
                <p>{personalInfo.title}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="start-menu-content">
            {/* Portfolio Sections */}
            <div className="start-menu-section">
              <div className="section-title">{t('startMenu.portfolioSections')}</div>
              <div className="start-menu-grid">
                {menuItems.map((item) => (
                  <div
                    key={item.window}
                    className="start-menu-item"
                    onClick={() => {
                      onOpenWindow(item.window)
                      onClose()
                    }}
                  >
                    <div className="start-menu-item-icon">{item.icon}</div>
                    <div className="start-menu-item-text">
                      <div className="start-menu-item-title">{item.title}</div>
                      <div className="start-menu-item-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="start-menu-section">
              <div className="section-title">{t('startMenu.quickActions')}</div>
              <div className="start-menu-grid">
                {quickActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="start-menu-item"
                    onClick={action.action}
                  >
                    <div className="start-menu-item-icon">{action.icon}</div>
                    <div className="start-menu-item-text">
                      <div className="start-menu-item-title">{action.title}</div>
                      <div className="start-menu-item-desc">{action.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="start-menu-footer">
            <div
              className="start-footer-btn"
              onClick={toggleTheme}
            >
              <span>🎨</span> {t('common.theme')}
            </div>
            <div
              className="start-footer-btn"
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen()
                } else {
                  document.exitFullscreen()
                }
              }}
            >
              <span>⛶</span> {t('common.fullscreen')}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

