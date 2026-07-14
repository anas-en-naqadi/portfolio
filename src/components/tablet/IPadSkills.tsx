'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { skills } from '@/lib/data'
import AnimatedSection from '../shared/AnimatedSection'

interface IPadSkillsProps {
  theme: 'dark' | 'light'
}

type NoteId = 'languages' | 'frameworks' | 'databases' | 'libraries' | 'tools' | 'methodologies'

export default function IPadSkills({ theme }: IPadSkillsProps) {
  const t = useTranslations()
  const [activeNoteId, setActiveNoteId] = useState<NoteId>('languages')
  const [searchQuery, setSearchQuery] = useState('')
  const isDark = theme === 'dark'

  const sidebarBg = isDark ? 'bg-zinc-900/40' : 'bg-black/5'
  const detailBg = isDark 
    ? 'bg-[#1C1C1E]' 
    : 'bg-[#FCF9F2]' // Apple Notes classic paper tint in light mode
  
  const searchBg = isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'
  const activeNoteBg = isDark ? 'bg-[#EAA135]/20 text-white' : 'bg-[#FBEED7] text-zinc-900'
  const hoverNoteBg = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'

  const notesList = [
    { id: 'languages', title: t('skills.languages') || 'Languages', items: skills.languages, date: '12:45 AM', excerpt: skills.languages.join(', ') },
    { id: 'frameworks', title: t('skills.frameworks') || 'Frameworks', items: skills.frameworks, date: 'Yesterday', excerpt: skills.frameworks.join(', ') },
    { id: 'databases', title: t('skills.databases') || 'Databases', items: skills.databases, date: 'Friday', excerpt: skills.databases.join(', ') },
    { id: 'libraries', title: t('skills.libraries') || 'Libraries', items: skills.libraries, date: '08/07/2026', excerpt: skills.libraries.join(', ') },
    { id: 'tools', title: t('skills.tools') || 'Tools', items: skills.tools, date: '05/07/2026', excerpt: skills.tools.join(', ') },
    { id: 'methodologies', title: t('skills.methodologies') || 'Methodologies', items: skills.methodologies, date: '28/06/2026', excerpt: skills.methodologies.join(', ') },
  ] as const

  const filteredNotes = notesList.filter((note) => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeNote = notesList.find((note) => note.id === activeNoteId) || notesList[0]

  return (
    <div className="flex h-full w-full overflow-hidden select-none">
      {/* LEFT Side: Apple Notes Sidebar */}
      <div className={`w-[260px] md:w-[280px] h-full flex-shrink-0 border-r ${isDark ? 'border-white/10' : 'border-black/10'} ${sidebarBg} p-4 flex flex-col gap-4 overflow-y-auto`}>
        {/* Title */}
        <div className="px-2 pt-2">
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-zinc-500'}`}>
            Notes
          </span>
        </div>

        {/* iOS Notes Search Bar */}
        <div className="px-1.5">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 dark:text-zinc-500 pointer-events-none">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Notes..."
              className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D08A00]/30 transition-all ${searchBg}`}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 dark:text-zinc-500 text-xs hover:text-zinc-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Note List Items */}
        <div className="flex flex-col gap-1 mt-2">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNoteId(note.id as NoteId)}
              className={`w-full text-left px-3.5 py-3 rounded-xl transition-all duration-200 flex flex-col gap-0.5 ${
                activeNoteId === note.id
                  ? activeNoteBg
                  : hoverNoteBg
              }`}
            >
              <span className="text-xs font-bold text-gray-900 dark:text-white truncate">
                {note.title}
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium truncate w-full">
                {note.excerpt}
              </span>
            </button>
          ))}
          {filteredNotes.length === 0 && (
            <div className="text-center py-8 text-xs font-semibold text-zinc-400">
              No notes found
            </div>
          )}
        </div>
      </div>

      {/* RIGHT Side: Note Detail Board */}
      <div className={`flex-1 h-full overflow-y-auto p-6 md:p-10 relative flex flex-col ${detailBg}`}>
        {/* Subtle grid pattern to look like paper structure */}
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


            {/* Note Title */}
            <div className="shrink-0">
              <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">
                {activeNote.title}
              </h1>
            </div>

            {/* Notes content: Grid of interactive visual card tags */}
            <div className="flex-1">
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.05
                    }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {activeNote.items.map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: 8, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 22 } }
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-3.5 bg-[#D08A00]/10 dark:bg-[#EAA135]/10 border border-[#D08A00]/20 dark:border-[#EAA135]/20 rounded-xl flex items-center justify-center text-center shadow-sm cursor-default hover:bg-[#D08A00]/15 dark:hover:bg-[#EAA135]/15 transition-all duration-200"
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
    </div>
  )
}
