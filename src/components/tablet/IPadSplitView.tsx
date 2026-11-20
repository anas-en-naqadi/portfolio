'use client'

import { ReactNode } from 'react'

interface IPadSplitViewProps {
  theme: 'dark' | 'light'
  sidebarTitle: string
  sidebarHeaderExtra?: ReactNode
  sidebarContent: ReactNode
  detailTitle?: string
  detailHeaderCenter?: ReactNode
  detailHeaderRight?: ReactNode
  detailBgClass?: string
  sidebarBgClass?: string
  detailPaddingClass?: string
  children: ReactNode
}

/** Unified neutral iPadOS sidebar selection classes shared across About, Contact, Settings, and Experience. */
export function getIPadSidebarItemClasses(theme: 'dark' | 'light') {
  const isDark = theme === 'dark'
  return {
    active: isDark ? 'bg-white/15 text-white shadow-sm' : 'bg-white text-zinc-900 shadow-sm',
    inactive: isDark ? 'hover:bg-white/5 text-zinc-400' : 'hover:bg-black/5 text-zinc-600',
  }
}

/**
 * Shared iPadOS UISplitViewController shell used across iPad apps.
 * Provides responsive container-query stacking on narrow sheets (< 700px)
 * and edge-to-edge native top navigation bars.
 */
export default function IPadSplitView({
  theme,
  sidebarTitle,
  sidebarHeaderExtra,
  sidebarContent,
  detailTitle,
  detailHeaderCenter,
  detailHeaderRight,
  detailBgClass,
  sidebarBgClass,
  detailPaddingClass = 'p-4 sm:p-6 md:p-8',
  children,
}: IPadSplitViewProps) {
  const isDark = theme === 'dark'

  const resolvedSidebarBg = sidebarBgClass ?? (isDark ? 'bg-[#161618]/95' : 'bg-[#EFEFF4]/95')
  const resolvedDetailBg = detailBgClass ?? (isDark ? 'bg-[#1C1C1E]' : 'bg-[#F2F2F7]')
  const borderClass = isDark ? 'border-white/10' : 'border-black/10'

  return (
    <div className="ipad-split-layout select-none relative">
      {/* Sidebar */}
      <aside className={`ipad-split-sidebar ${resolvedSidebarBg} flex flex-col`}>
        {/* Sidebar Native Top Bar (clears top ••• multitasking dots with pt-5) */}
        <div className="px-4 pt-5 pb-2.5 flex items-center justify-between gap-2 flex-shrink-0">
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white m-0 truncate">
            {sidebarTitle}
          </h2>
        </div>

        <div className="px-3 pb-3 sm:p-3 sm:pt-1 flex flex-col gap-3 min-h-0">
          {sidebarHeaderExtra}
          {sidebarContent}
        </div>
      </aside>

      {/* Detail Pane */}
      <div className={`flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden ${resolvedDetailBg}`}>
        {/* Detail Native Toolbar */}
        <div
          className={`px-4 sm:px-6 pt-5 pb-2.5 flex items-center justify-between gap-3 flex-shrink-0 border-b ${borderClass}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {detailTitle && (
              <span className="text-sm sm:text-base font-bold tracking-tight text-gray-900 dark:text-white truncate">
                {detailTitle}
              </span>
            )}
          </div>

          {detailHeaderCenter && (
            <div className="flex items-center justify-center shrink-0">
              {detailHeaderCenter}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 shrink-0 min-w-[32px]">
            {detailHeaderRight}
          </div>
        </div>

        {/* Scrollable App Content */}
        <div className={`flex-1 min-h-0 overflow-y-auto ${detailPaddingClass} pb-10`}>
          {children}
        </div>
      </div>
    </div>
  )
}
