'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/hooks/useTheme'
import {
  AppleLogoSymbol,
  ChevronLeftSymbol,
  DocumentTextSymbol,
  GlobeSymbol,
  HouseSymbol,
  MoonSymbol,
  SearchSymbol,
  SunSymbol,
} from '@/components/shared/SFSymbols'

interface AppleNotFoundProps {
  defaultLocale?: 'en' | 'fr'
}

const COPY = {
  en: {
    menuTitle: 'Finder',
    windowTitle: 'Finder — Error 404',
    codeBadge: 'Error 404',
    title: "The page you're looking for can't be found.",
    description:
      'This destination may have been moved, renamed, or does not exist in ANAS EN-NAQADI’s workspace.',
    pathLabel: 'Requested path',
    primaryAction: 'Return to Portfolio',
    secondaryAction: 'Go Back',
    themeLabel: 'Toggle theme',
  },
  fr: {
    menuTitle: 'Finder',
    windowTitle: 'Finder — Erreur 404',
    codeBadge: 'Erreur 404',
    title: 'La page que vous recherchez est introuvable.',
    description:
      'Cette destination a peut-être été déplacée, renommée ou n’existe pas dans l’espace d’ANAS EN-NAQADI.',
    pathLabel: 'Chemin demandé',
    primaryAction: 'Retour au Portfolio',
    secondaryAction: 'Page précédente',
    themeLabel: 'Changer le thème',
  },
} as const

export function AppleNotFound({ defaultLocale }: AppleNotFoundProps) {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname() || '/'
  const isDark = theme === 'dark'

  const detectedLocale: 'en' | 'fr' =
    defaultLocale ?? (pathname.startsWith('/fr') ? 'fr' : 'en')
  const [lang, setLang] = React.useState<'en' | 'fr'>(detectedLocale)

  React.useEffect(() => {
    setLang(pathname.startsWith('/fr') ? 'fr' : detectedLocale)
  }, [pathname, detectedLocale])

  const copy = COPY[lang]

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back()
      return
    }
    window.location.href = `/${lang}`
  }

  return (
    <div className="min-h-screen min-h-[100dvh] w-full relative overflow-hidden flex flex-col select-none transition-colors duration-300 bg-[#eef1f8] text-[#1d1d1f] dark:bg-[#070913] dark:text-[#f5f5f7]">
      {/* Apple Sequoia / iOS Ambient Mesh Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.18) 0%, transparent 46%), radial-gradient(circle at 80% 75%, rgba(175, 82, 222, 0.16) 0%, transparent 48%), linear-gradient(180deg, #f5f7fc 0%, #e7ecf7 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at 18% 22%, rgba(0, 122, 255, 0.24) 0%, transparent 45%), radial-gradient(circle at 82% 76%, rgba(175, 82, 222, 0.22) 0%, transparent 48%), radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.9) 0%, #05070e 100%)',
        }}
      />

      {/* Responsive Apple Top Bar */}
      <header
        className="relative z-20 h-8 sm:h-7 px-3 sm:px-4 flex items-center justify-between text-[12px] font-medium bg-white/65 dark:bg-[#16161a]/65 border-b border-black/10 dark:border-white/10"
        style={{
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0 leading-none">
          <Link
            href={`/${lang}`}
            aria-label={copy.primaryAction}
            className="px-1.5 h-[22px] rounded-[5px] inline-flex items-center justify-center text-current no-underline transition-colors hover:bg-black/10 dark:hover:bg-white/15"
            style={{ color: 'inherit' }}
          >
            <AppleLogoSymbol size={13} className="w-[13px] h-[13px] shrink-0 -translate-y-[0.5px]" />
          </Link>
          <span className="h-[22px] inline-flex items-center font-semibold truncate leading-none">
            {copy.menuTitle}
          </span>
          <span className="hidden sm:inline-flex items-center h-[22px] opacity-45 leading-none">
            •
          </span>
          <span className="hidden sm:inline-flex items-center h-[22px] opacity-70 truncate leading-none">
            ANAS EN-NAQADI
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setLang((prev) => (prev === 'en' ? 'fr' : 'en'))}
            className="px-2 h-[22px] rounded-[5px] inline-flex items-center gap-1 text-[11px] font-semibold uppercase transition-colors hover:bg-black/10 dark:hover:bg-white/15"
          >
            <GlobeSymbol size={12} className="w-3 h-3 text-[#007AFF] shrink-0" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={copy.themeLabel}
            className="px-2 h-[22px] rounded-[5px] inline-flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/15"
          >
            {isDark ? (
              <SunSymbol size={14} className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <MoonSymbol size={14} className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            )}
          </button>
        </div>
      </header>

      {/* Centered Liquid-Glass Apple OS 404 Window */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <motion.section
          aria-labelledby="not-found-heading"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white/80 dark:bg-[#1c1c22]/80 border border-white/75 dark:border-white/15"
          style={{
            backdropFilter: 'blur(34px) saturate(185%)',
            WebkitBackdropFilter: 'blur(34px) saturate(185%)',
          }}
        >
          {/* macOS Titlebar */}
          <div className="h-10 px-3.5 flex items-center justify-between relative bg-[#f5f5f8]/80 dark:bg-[#2c2c34]/75 border-b border-black/[0.07] dark:border-white/[0.08]">
            <div className="flex items-center gap-2" aria-hidden="true">
              <Link
                href={`/${lang}`}
                className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/10 hover:brightness-90 transition block"
                title={copy.primaryAction}
              />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/10 block" />
              <span className="w-3 h-3 rounded-full bg-[#28C840] border border-black/10 block" />
            </div>

            <span className="absolute left-1/2 -translate-x-1/2 text-[12.5px] font-semibold truncate max-w-[60%] text-gray-800 dark:text-white/85">
              {copy.windowTitle}
            </span>

            <div className="w-10" />
          </div>

          {/* Window Content */}
          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
            {/* Apple Finder-style 404 Document Badge */}
            <div className="relative mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[20px] flex items-center justify-center shadow-lg bg-gradient-to-br from-[#007AFF]/15 to-[#5856D6]/15 dark:from-[#007AFF]/25 dark:to-[#5856D6]/25 border border-[#007AFF]/20 dark:border-white/15">
                <DocumentTextSymbol size={34} className="w-8 h-8 sm:w-9 sm:h-9 text-[#007AFF] shrink-0" />
              </div>
              <span className="absolute -bottom-1.5 -right-2 w-7 h-7 rounded-full bg-[#FF3B30] text-white flex items-center justify-center shadow-md ring-2 ring-white/80 dark:ring-[#1c1c22]">
                <SearchSymbol size={14} className="w-3.5 h-3.5 shrink-0" />
              </span>
            </div>

            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/25 mb-3">
              {copy.codeBadge}
            </span>

            <h1
              id="not-found-heading"
              className="text-lg sm:text-2xl font-bold tracking-tight leading-snug mb-2"
            >
              {copy.title}
            </h1>

            <p className="text-xs sm:text-[13.5px] leading-relaxed max-w-sm mb-5 text-gray-600 dark:text-white/65">
              {copy.description}
            </p>

            {/* Requested Path Pill */}
            <div className="w-full rounded-xl px-3.5 py-2.5 mb-6 flex items-center justify-between gap-3 text-left border bg-black/[0.04] border-black/10 text-gray-700 dark:bg-black/25 dark:border-white/10 dark:text-white/75">
              <span className="text-[11px] font-semibold opacity-65 shrink-0">
                {copy.pathLabel}
              </span>
              <code className="text-[11.5px] font-mono truncate select-all">
                {pathname}
              </code>
            </div>

            {/* Responsive Action Buttons */}
            <div className="w-full flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-colors bg-black/[0.06] hover:bg-black/[0.11] text-gray-800 dark:bg-white/[0.08] dark:hover:bg-white/[0.15] dark:text-white"
              >
                <ChevronLeftSymbol size={14} className="w-3.5 h-3.5 shrink-0" />
                <span>{copy.secondaryAction}</span>
              </button>

              <Link
                href={`/${lang}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#0055B3] text-white text-xs sm:text-[13px] font-semibold shadow-sm no-underline transition-colors"
              >
                <HouseSymbol size={14} className="w-3.5 h-3.5 shrink-0" />
                <span>{copy.primaryAction}</span>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
