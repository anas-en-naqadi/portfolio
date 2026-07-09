'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface RecentApp {
  id: string
  name: string
  icon: string
  time: string
}

interface RecentAppsModalProps {
  isOpen: boolean
  apps: RecentApp[]
  onClose: () => void
  onOpenApp: (appId: string) => void
  onRemoveApp: (appId: string) => void
  onCloseAll: () => void
}

export default function RecentAppsModal({
  isOpen,
  apps,
  onClose,
  onOpenApp,
  onRemoveApp,
  onCloseAll,
}: RecentAppsModalProps) {
  const t = useTranslations()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xl font-bold mb-6 text-center">Recent Apps</div>
            {apps.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                No recent apps
              </div>
            ) : (
              <div className="space-y-3">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
                    onClick={() => {
                      onOpenApp(app.id)
                      onClose()
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-2xl">
                      {app.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">{app.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Last opened: {app.time}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveApp(app.id)
                      }}
                      className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {apps.length > 0 && (
              <button
                onClick={onCloseAll}
                className="w-full mt-6 py-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold active:scale-95 transition-transform"
              >
                Close All
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


