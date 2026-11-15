'use client'

import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

const THEME_STORAGE_KEY = 'portfolio-theme'

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    // Default to dark on first visit unless user explicitly saved 'light'
    const resolvedTheme = getStoredTheme()
    setTheme(resolvedTheme)

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch {
      // Ignore storage errors (e.g. private browsing restrictions)
    }

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
  }

  return { theme, toggleTheme }
}


