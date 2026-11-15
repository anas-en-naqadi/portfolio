'use client'

import { useState, useEffect } from 'react'

const LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-MA',
}

export function useTime(locale: string = 'en') {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const intlLocale = LOCALE_MAP[locale] || locale || 'en-US'

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const formatDate = (date: Date) => {
    try {
      return new Intl.DateTimeFormat(intlLocale, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }).format(date)
    } catch {
      return date.toDateString()
    }
  }

  const formatWeekday = (date: Date) => {
    try {
      return new Intl.DateTimeFormat(intlLocale, { weekday: 'long' }).format(date)
    } catch {
      return ''
    }
  }

  const formatShortDate = (date: Date) => {
    try {
      return new Intl.DateTimeFormat(intlLocale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(date)
    } catch {
      return date.toDateString()
    }
  }

  const formatDateTime = (date: Date) => {
    const timeStr = formatTime(date)
    try {
      const dateStr = new Intl.DateTimeFormat(intlLocale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date)
      return `${timeStr} | ${dateStr}`
    } catch {
      return `${timeStr} | ${date.toDateString()}`
    }
  }

  return {
    time,
    timeString: formatTime(time),
    timeShort: formatTime(time),
    dateString: formatDate(time),
    weekdayString: formatWeekday(time),
    shortDateString: formatShortDate(time),
    dateTimeString: formatDateTime(time),
  }
}


