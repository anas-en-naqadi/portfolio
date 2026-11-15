'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedPortfolioData } from '@/lib/data'
import IPadSplitView from './IPadSplitView'
import { SearchSymbol, XMarkCircleSymbol } from '../shared/SFSymbols'

interface IPadSkillsProps {
  theme: 'dark' | 'light'
}

type NoteId = 'languages' | 'frameworks' | 'databases' | 'libraries' | 'tools' | 'methodologies'

export default function IPadSkills({ theme }: IPadSkillsProps) {
  const locale = useLocale()
  const t = useTranslations('tablet.skills')
  const { skills } = getLocalizedPortfolioData(locale)
  const [activeNoteId, setActiveNoteId] = useState<NoteId>('languages')
  const [searchQuery, setSearchQuery] = useState('')
  const isDark = theme === 'dark'

  const detailBg = isDark ? 'bg-[#1C1C1E]' : 'bg-[#FCF9F2]'
  const searchBg = isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
  const activeNoteBg = isDark ? 'bg-[#EAA135]/20 text-white shadow-sm' : 'bg-[#FBEED7] text-zinc-900 shadow-sm'
  const hoverNoteBg = isDark ? 'hover:bg-white/5 text-zinc-300' : 'hover:bg-black/5 text-zinc-700'

  const notesList = [
    { id: 'languages', title: t('categories.languages'), items: skills.languages, excerpt: skills.languages.join(', ') },
    { id: 'frameworks', title: t('categories.frameworks'), items: skills.frameworks, excerpt: skills.frameworks.join(', ') },
    { id: 'databases', title: t('categories.databases'), items: skills.databases, excerpt: skills.databases.join(', ') },
    { id: 'libraries', title: t('categories.libraries'), items: skills.libraries, excerpt: skills.libraries.join(', ') },
    { id: 'tools', title: t('categories.tools'), items: skills.tools, excerpt: skills.tools.join(', ') },
    { id: 'methodologies', title: t('categories.methodologies'), items: skills.methodologies, excerpt: skills.methodologies.join(', ') },
  ] as const

  const filteredNotes = notesList.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeNote =
    notesList.find((note) => note.id === activeNoteId) || filteredNotes[0] || notesList[0]

  const searchBar = (
    <div className="px-0.5 sm:px-1.5">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 rtl:left-auto rtl:right-3 flex items-center text-zinc-400 dark:text-zinc-500 pointer-events-none">
          <SearchSymbol className="w-3.5 h-3.5" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchPlaceholder')}
          className={`w-full pl-8 pr-8 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D08A00]/30 transition-all ${searchBg}`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute inset-y-0 right-2.5 rtl:right-auto rtl:left-2.5 flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-zinc-600"
          >
            <XMarkCircleSymbol className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )

  const folderList = (
    <div className="ipad-sidebar-nav">
      {filteredNotes.map((note) => (
        <button
          key={note.id}
          type="button"
          onClick={() => setActiveNoteId(note.id as NoteId)}
          className={`text-left rtl:text-right px-3.5 py-2 sm:py-3 rounded-xl transition-all duration-200 flex flex-col gap-0.5 shrink-0 ${
            activeNote.id === note.id ? activeNoteBg : hoverNoteBg
          }`}
        >
          <span className="text-xs font-bold text-gray-900 dark:text-white whitespace-nowrap">
            {note.title}
          </span>
          <span className="ipad-desktop-only text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate w-full">
            {note.excerpt}
          </span>
        </button>
      ))}
      {filteredNotes.length === 0 && (
        <div className="text-center py-4 text-xs font-semibold text-zinc-400 w-full">
          {t('empty')}
        </div>
      )}
    </div>
  )

  return (
    <IPadSplitView
      theme={theme}
      sidebarTitle={t('sidebarTitle')}
      sidebarHeaderExtra={searchBar}
      sidebarContent={folderList}
      detailTitle={activeNote.title}
      detailHeaderRight={
        <span className="text-xs font-semibold text-[#D08A00] dark:text-[#EAA135] whitespace-nowrap">
          {t('itemsCount', { count: activeNote.items.length })}
        </span>
      }
      detailBgClass={detailBg}
      detailPaddingClass="p-0"
    >
      <div className="min-h-full p-5 sm:p-6 md:p-10 relative flex flex-col">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:100%_24px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeNote.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl w-full mx-auto relative z-10 flex flex-col gap-5 flex-1"
          >
            <div className="flex-1">
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.04,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {activeNote.items.map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 8, scale: 0.95 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { type: 'spring', stiffness: 350, damping: 22 },
                      },
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="p-3 sm:p-3.5 bg-[#D08A00]/10 dark:bg-[#EAA135]/10 border border-[#D08A00]/20 dark:border-[#EAA135]/20 rounded-xl flex items-center justify-center text-center shadow-sm cursor-default hover:bg-[#D08A00]/15 dark:hover:bg-[#EAA135]/15 transition-all duration-200"
                  >
                    <span className="text-xs font-bold text-[#D08A00] dark:text-[#EAA135] tracking-wide select-text">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </IPadSplitView>
  )
}
