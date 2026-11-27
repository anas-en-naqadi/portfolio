'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedPortfolioData } from '@/lib/data'
import { WindowToolbar } from '@/components/shared/WindowToolbar'
import {
  CpuSymbol,
  BookSymbol,
  DatabaseSymbol,
  ArrowCycleSymbol,
  WrenchSymbol,
  GlobeSymbol,
  LaptopCodeSymbol,
  GridSymbol,
  SearchSymbol,
  XMarkCircleSymbol,
} from '@/components/shared/SFSymbols'

interface SkillsWindowProps {
  theme?: 'dark' | 'light'
  spotlightQuery?: { term: string; nonce: number } | null
}

type SkillCategoryKey =
  | 'all'
  | 'languages'
  | 'frameworks'
  | 'libraries'
  | 'databases'
  | 'methodologies'
  | 'tools'
  | 'spoken'

type SkillTier = 'all' | 'core'

const CORE_CATEGORIES = new Set<SkillCategoryKey>(['languages', 'frameworks', 'databases', 'tools'])

export function SkillsWindow({ theme = 'dark', spotlightQuery }: SkillsWindowProps) {
  const t = useTranslations('skills')
  const tCommon = useTranslations('common')
  const tDesktop = useTranslations('desktop.windows.skills')
  const locale = useLocale()
  const isDark = theme === 'dark'

  const [category, setCategory] = useState<SkillCategoryKey>('all')
  const [tier, setTier] = useState<SkillTier>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (spotlightQuery?.term) {
      setCategory('all')
      setTier('all')
      setSearch(spotlightQuery.term)
    }
  }, [spotlightQuery])

  const portfolio = useMemo(() => getLocalizedPortfolioData(locale), [locale])
  const { skills } = portfolio

  const allGroups = useMemo(
    () => [
      {
        id: 'languages' as const,
        title: t('languages'),
        icon: <LaptopCodeSymbol className="w-4 h-4 text-blue-400" />,
        items: skills.languages,
      },
      {
        id: 'frameworks' as const,
        title: t('frameworks'),
        icon: <CpuSymbol className="w-4 h-4 text-purple-400" />,
        items: skills.frameworks,
      },
      {
        id: 'libraries' as const,
        title: t('libraries'),
        icon: <BookSymbol className="w-4 h-4 text-pink-400" />,
        items: skills.libraries,
      },
      {
        id: 'databases' as const,
        title: t('databases'),
        icon: <DatabaseSymbol className="w-4 h-4 text-emerald-400" />,
        items: skills.databases,
      },
      {
        id: 'methodologies' as const,
        title: t('methodologies'),
        icon: <ArrowCycleSymbol className="w-4 h-4 text-amber-400" />,
        items: skills.methodologies,
      },
      {
        id: 'tools' as const,
        title: t('tools'),
        icon: <WrenchSymbol className="w-4 h-4 text-cyan-400" />,
        items: skills.tools,
      },
      {
        id: 'spoken' as const,
        title: t('spoken'),
        icon: <GlobeSymbol className="w-4 h-4 text-indigo-400" />,
        items: skills.languages_spoken.map((l) => `${l.language} (${l.level})`),
      },
    ],
    [skills, t]
  )

  const tierGroups = useMemo(() => {
    return allGroups
      .filter((group) => tier === 'all' || CORE_CATEGORIES.has(group.id))
      .map((group) => ({
        ...group,
        items: tier === 'all' ? group.items : group.items.slice(0, 6),
      }))
  }, [allGroups, tier])

  const visibleGroups = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tierGroups
      .filter((group) => category === 'all' || group.id === category)
      .map((group) => {
        const filteredItems = group.items.filter((item) => {
          return !q || item.toLowerCase().includes(q) || group.title.toLowerCase().includes(q)
        })
        return { ...group, items: filteredItems }
      })
      .filter((group) => group.items.length > 0)
  }, [tierGroups, category, search])

  const totalVisible = visibleGroups.reduce((sum, g) => sum + g.items.length, 0)
  const totalInTier = tierGroups.reduce((sum, g) => sum + g.items.length, 0)

  const handleSelectTier = (nextTier: SkillTier) => {
    setTier(nextTier)
    if (nextTier === 'core' && category !== 'all' && !CORE_CATEGORIES.has(category)) {
      setCategory('all')
    }
  }

  const handleSelectCategory = (nextCategory: SkillCategoryKey) => {
    setCategory(nextCategory)
    if (tier === 'core' && nextCategory !== 'all' && !CORE_CATEGORIES.has(nextCategory)) {
      setTier('all')
    }
  }

  const toolbarButtons = [
    {
      icon: <GridSymbol className="w-3.5 h-3.5" />,
      label: tDesktop('levelAll'),
      active: tier === 'all',
      onClick: () => handleSelectTier('all'),
    },
    {
      icon: <CpuSymbol className="w-3.5 h-3.5" />,
      label: tDesktop('levelCore'),
      active: tier === 'core',
      onClick: () => handleSelectTier('core'),
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <WindowToolbar
        buttons={toolbarButtons}
        theme={theme}
        rightContent={
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs w-44 sm:w-52 ${
                isDark
                  ? 'bg-white/[0.06] border-white/10 text-white'
                  : 'bg-black/[0.04] border-black/10 text-gray-900'
              }`}
            >
              <SearchSymbol className="w-3.5 h-3.5 opacity-55 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tDesktop('searchPlaceholder')}
                className="flex-1 bg-transparent outline-none text-[12px] min-w-0 placeholder:opacity-55"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label={tCommon('clearSearch')}
                  className="opacity-50 hover:opacity-100"
                >
                  <XMarkCircleSymbol className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <span
              className={`hidden sm:inline text-[11.5px] font-medium ${
                isDark ? 'text-white/50' : 'text-gray-500'
              }`}
            >
              {tDesktop('itemsCount', { count: totalVisible })}
            </span>
          </div>
        }
      />

      <div className="macos-split-layout flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={`macos-split-sidebar p-3 ${isDark ? 'bg-white/[0.03]' : 'bg-black/[0.025]'}`}
        >
          <div
            className={`macos-desktop-only px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider ${
              isDark ? 'text-white/40' : 'text-gray-500'
            }`}
          >
            {tDesktop('sidebarTitle')}
          </div>
          <nav className="macos-sidebar-nav">
            <button
              type="button"
              onClick={() => handleSelectCategory('all')}
              className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                category === 'all'
                  ? 'bg-[#0066CC] text-white'
                  : isDark
                    ? 'text-white/80 hover:bg-white/[0.07]'
                    : 'text-gray-800 hover:bg-black/[0.05]'
              }`}
            >
              <span>{tDesktop('allCategories')}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                  category === 'all'
                    ? 'bg-white/20 text-white'
                    : isDark
                      ? 'bg-white/[0.08] text-white/55'
                      : 'bg-black/[0.06] text-gray-600'
                }`}
              >
                {totalInTier}
              </span>
            </button>

            {allGroups.map((group) => {
              const active = category === group.id
              const isHiddenByCore = tier === 'core' && !CORE_CATEGORIES.has(group.id)
              const countInTier = isHiddenByCore
                ? 0
                : tier === 'core'
                  ? Math.min(group.items.length, 6)
                  : group.items.length
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleSelectCategory(group.id)}
                  className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[12.5px] font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#0066CC] text-white'
                      : isHiddenByCore
                        ? isDark
                          ? 'text-white/35 hover:bg-white/[0.05]'
                          : 'text-gray-400 hover:bg-black/[0.04]'
                        : isDark
                          ? 'text-white/80 hover:bg-white/[0.07]'
                          : 'text-gray-800 hover:bg-black/[0.05]'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    {group.icon}
                    <span className="truncate">{group.title}</span>
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                      active
                        ? 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-white/[0.08] text-white/55'
                          : 'bg-black/[0.06] text-gray-600'
                    }`}
                  >
                    {countInTier}
                  </span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Skills Area */}
        <div className="flex-1 overflow-y-auto macos-scroll p-5 space-y-4">
          {visibleGroups.length === 0 ? (
            <div
              className={`py-16 text-center text-sm ${
                isDark ? 'text-white/45' : 'text-gray-500'
              }`}
            >
              {tDesktop('empty')}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleGroups.map((group) => (
                <div
                  key={group.id}
                  className={`rounded-xl border p-4 ${
                    isDark
                      ? 'bg-white/[0.04] border-white/10'
                      : 'bg-white/85 border-black/10 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {group.icon}
                      <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {group.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-md ${
                        isDark ? 'bg-white/[0.07] text-white/60' : 'bg-black/[0.05] text-gray-600'
                      }`}
                    >
                      {group.items.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-1 rounded-lg text-[11.5px] font-medium border ${
                          isDark
                            ? 'bg-white/[0.06] border-white/10 text-white/85'
                            : 'bg-black/[0.035] border-black/10 text-gray-800'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
