'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedPortfolioData } from '@/lib/data'
import { useTime } from '@/hooks/useTime'
import {
  ClockSymbol,
  DocumentTextSymbol,
  DownloadSymbol,
  LocationArrowSymbol,
  MapPinSymbol,
  PersonSymbol,
} from '../shared/SFSymbols'

interface iPadWidgetsProps {
  theme: 'dark' | 'light'
}

type WeatherConditionKey =
  | 'clearSky'
  | 'partlyCloudy'
  | 'foggy'
  | 'drizzle'
  | 'rainy'
  | 'snowy'
  | 'showers'
  | 'thunderstorm'
  | 'clear'

interface HourlyForecast {
  hour: string
  temp: number
  code: number
}

interface WeatherState {
  temp: number
  conditionKey: WeatherConditionKey
  high: number
  low: number
  code: number
  hourly: HourlyForecast[]
}

function getWeatherConditionKey(code: number): WeatherConditionKey {
  if (code === 0) return 'clearSky'
  if ([1, 2, 3].includes(code)) return 'partlyCloudy'
  if ([45, 48].includes(code)) return 'foggy'
  if ([51, 53, 55].includes(code)) return 'drizzle'
  if ([61, 63, 65].includes(code)) return 'rainy'
  if ([71, 73, 75].includes(code)) return 'snowy'
  if ([80, 81, 82].includes(code)) return 'showers'
  if ([95, 96, 99].includes(code)) return 'thunderstorm'
  return 'clear'
}

function getWeatherIcon(code: number, size = 20) {
  if (code === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="6" fill="#FFCC00" />
        <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  } else if ([1, 2, 3].includes(code)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="15" cy="9" r="4" fill="#FFCC00" />
        <path d="M17 18H7C4.79 18 3 16.21 3 14C3 12.08 4.35 10.48 6.18 10.1C6.91 7.72 9.13 6 11.75 6C14.8 6 17.37 8.27 17.89 11.23C19.64 11.57 21 13.13 21 15C21 16.66 19.66 18 17 18Z" fill="#E5E5EA" />
      </svg>
    )
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M17 14H7C4.79 14 3 12.21 3 10C3 8.08 4.35 6.48 6.18 6.1C6.91 3.72 9.13 2 11.75 2C14.8 2 17.37 4.27 17.89 7.23C19.64 7.57 21 9.13 21 11C21 12.66 19.66 14 17 14Z" fill="#AEAEB2" />
        <path d="M8 16L7 18M12 16L11 18M16 16L15 18" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  } else if ([95, 96, 99].includes(code)) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M17 14H7C4.79 14 3 12.21 3 10C3 8.08 4.35 6.48 6.18 6.1C6.91 3.72 9.13 2 11.75 2C14.8 2 17.37 4.27 17.89 7.23C19.64 7.57 21 9.13 21 11C21 12.66 19.66 14 17 14Z" fill="#636366" />
        <path d="M11 14L9 17H13L11 20" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  } else {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M17 16H7C4.79 16 3 14.21 3 12C3 10.08 4.35 8.48 6.18 8.1C6.91 5.72 9.13 4 11.75 4C14.8 4 17.37 6.27 17.89 9.23C19.64 9.57 21 11.13 21 13C21 14.66 19.66 16 17 16Z" fill="#F2F2F7" />
      </svg>
    )
  }
}

export default function iPadWidgets({ theme }: iPadWidgetsProps) {
  const locale = useLocale()
  const tRoot = useTranslations()
  const t = useTranslations('tablet.widgets')
  const { personalInfo } = getLocalizedPortfolioData(locale)
  const { time, timeShort, dateString } = useTime(locale)
  const isDark = theme === 'dark'

  const [weather, setWeather] = useState<WeatherState>({
    temp: 23,
    conditionKey: 'partlyCloudy',
    high: 25,
    low: 22,
    code: 2,
    hourly: [
      { hour: '14', temp: 24, code: 2 },
      { hour: '15', temp: 25, code: 1 },
      { hour: '16', temp: 24, code: 2 },
      { hour: '17', temp: 23, code: 2 },
      { hour: '18', temp: 22, code: 3 },
      { hour: '19', temp: 21, code: 0 },
    ],
  })

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=31.6295&longitude=-7.9811&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto'
        )
        const data = await res.json()
        const temp = Math.round(data.current.temperature_2m)
        const code = data.current.weather_code
        const high = Math.round(data.daily.temperature_2m_max[0])
        const low = Math.round(data.daily.temperature_2m_min[0])

        const currentHour = new Date().getHours()
        const hourlyForecast: HourlyForecast[] = []
        for (let i = 0; i < 6; i++) {
          const targetIndex = (currentHour + i) % 24
          hourlyForecast.push({
            hour: String(targetIndex).padStart(2, '0'),
            temp: Math.round(data.hourly.temperature_2m[targetIndex]),
            code: data.hourly.weather_code[targetIndex],
          })
        }

        setWeather({
          temp,
          conditionKey: getWeatherConditionKey(code),
          high,
          low,
          code,
          hourly: hourlyForecast,
        })
      } catch (e) {
        console.error('Error fetching Marrakech weather for iPad:', e)
      }
    }
    getWeather()
  }, [])

  // Analog clock angles
  const seconds = time.getSeconds()
  const minutes = time.getMinutes()
  const hours = time.getHours() % 12
  const secondDeg = seconds * 6
  const minuteDeg = minutes * 6 + seconds * 0.1
  const hourDeg = hours * 30 + minutes * 0.5

  const widgetStyles: React.CSSProperties = {
    backdropFilter: 'blur(22px) saturate(170%)',
    WebkitBackdropFilter: 'blur(22px) saturate(170%)',
    background: isDark
      ? 'rgba(255, 255, 255, 0.12)'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.10) 100%)',
    borderRadius: 22,
    border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.38)',
    boxShadow: isDark
      ? '0 12px 40px rgba(0,0,0,0.3)'
      : '0 12px 36px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.48)',
    overflow: 'hidden',
  }

  const cardSizeClass =
    'w-full min-h-[168px] sm:min-h-[192px] short:min-h-[154px] h-full p-3.5 sm:p-4 flex flex-col justify-between gap-2.5'
  const textColorClass = 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]'
  const subTextColorClass = isDark
    ? 'text-white/75'
    : 'text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]'
  const dividerClass = isDark ? 'border-white/15' : 'border-white/25'

  return (
    <motion.div
      className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-5 md:gap-6 short:gap-3.5 justify-items-center w-full max-w-4xl mx-auto px-1 sm:px-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      aria-label="Home screen widgets grid"
    >
      {/* Widget 1: Rich Apple Analog + Digital Clock */}
      <motion.div
        style={widgetStyles}
        className={cardSizeClass}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label={t('clock')}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <ClockSymbol className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className={`${subTextColorClass} text-[10px] font-bold uppercase tracking-wider`}>
              {t('clock')}
            </span>
          </div>
          <span
            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
              isDark ? 'bg-white/10 text-white/80' : 'bg-white/20 text-white'
            }`}
          >
            {personalInfo.timezone}
          </span>
        </div>

        {/* Center: Analog Dial + Digital Readout */}
        <div className="flex items-center justify-between gap-3 my-auto">
          <div className="min-w-0">
            <div
              className={`${textColorClass} font-bold leading-none tracking-tight text-3xl sm:text-4xl short:text-3xl tabular-nums`}
              aria-live="polite"
              aria-label={timeShort}
            >
              {timeShort}
            </div>
            <div className={`${subTextColorClass} text-[11px] sm:text-xs font-semibold capitalize mt-1 truncate`}>
              {dateString}
            </div>
          </div>

          {/* Minimal Apple Watch-style Analog Dial */}
          <div
            aria-hidden="true"
            className={`relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full border shadow-inner flex items-center justify-center ${
              isDark
                ? 'bg-zinc-900/70 border-white/15'
                : 'bg-white/90 border-black/10'
            }`}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="8"
                  x2="50"
                  y2={i % 3 === 0 ? '15' : '12'}
                  stroke="currentColor"
                  className={isDark ? 'text-white/50' : 'text-zinc-500'}
                  strokeWidth={i % 3 === 0 ? '2.5' : '1.5'}
                  strokeLinecap="round"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
              {/* Hour hand */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="27"
                stroke="currentColor"
                className={isDark ? 'text-white' : 'text-zinc-900'}
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${hourDeg} 50 50)`}
              />
              {/* Minute hand */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="18"
                stroke="currentColor"
                className={isDark ? 'text-white' : 'text-zinc-900'}
                strokeWidth="2.8"
                strokeLinecap="round"
                transform={`rotate(${minuteDeg} 50 50)`}
              />
              {/* Second hand */}
              <line
                x1="50"
                y1="56"
                x2="50"
                y2="14"
                stroke="#FF9500"
                strokeWidth="1.6"
                strokeLinecap="round"
                transform={`rotate(${secondDeg} 50 50)`}
              />
              <circle cx="50" cy="50" r="3" fill="#FF9500" />
            </svg>
          </div>
        </div>

        {/* Footer metadata strip */}
        <div className={`border-t ${dividerClass} pt-2 flex items-center justify-between text-[10px] font-semibold ${subTextColorClass}`}>
          <span className="truncate">{personalInfo.location.split(',')[0]}</span>
          <span className="tabular-nums">
            {String(hours === 0 ? 12 : hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      {/* Widget 2: Weather (Exact match to Phone Weather Widget) */}
      <motion.div
        style={{
          ...widgetStyles,
          background: 'linear-gradient(to bottom, #0A1931, #15305B)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
        className={`${cardSizeClass} text-white`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label={t('weather.label')}
      >
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/60">
          <span className="flex items-center gap-1">
            {t('marrakech')}
            <LocationArrowSymbol className="w-2.5 h-2.5" />
          </span>
          <span className="text-[9px] text-white/50">{t('weather.label')}</span>
        </div>

        <div className="flex items-center justify-between gap-2 -my-0.5">
          <span
            className="text-4xl sm:text-5xl short:text-3xl font-light tracking-tighter tabular-nums"
            style={{ fontFamily: '"SF Pro Rounded", -apple-system, sans-serif' }}
          >
            {weather.temp}°
          </span>

          <div className="flex flex-col items-end gap-0.5 text-right rtl:items-start rtl:text-left">
            {getWeatherIcon(weather.code, 20)}
            <p className="font-bold tracking-tight text-[11px] sm:text-xs text-white leading-tight mb-0">
              {t(`weather.conditions.${weather.conditionKey}`)}
            </p>
            <p className="text-[10px] text-white/70 tabular-nums mb-0">
              {t('weather.high')}:{weather.high}° {t('weather.low')}:{weather.low}°
            </p>
          </div>
        </div>

        {/* 6-Hour Forecast Strip */}
        <div className="border-t border-white/15 pt-2 flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-center">
          {weather.hourly.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
              <span className="text-white/75 tabular-nums">{h.hour}</span>
              <span className="my-0.5 flex justify-center">{getWeatherIcon(h.code, 13)}</span>
              <span className="tabular-nums">{h.temp}°</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Widget 3: Profile with 2-3 row description */}
      <motion.div
        style={widgetStyles}
        className={cardSizeClass}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label={t('profile')}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <PersonSymbol className="w-3.5 h-3.5 text-sky-300 shrink-0" />
            <span className={`${subTextColorClass} text-[10px] font-bold uppercase tracking-wider`}>
              {t('profile')}
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[9.5px] font-semibold text-emerald-300 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            {t('availability')}
          </span>
        </div>

        {/* Avatar + Name/Title */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-black/10 dark:border-white/15 shadow-sm">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                width={44}
                height={44}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
          </div>
          <div className="flex-1 min-w-0">
            <div className={`${textColorClass} font-bold text-xs leading-tight truncate`}>
              {personalInfo.name}
            </div>
            <div className={`${subTextColorClass} text-[10px] mt-0.5 truncate font-medium`}>
              {personalInfo.title}
            </div>
          </div>
        </div>

        {/* 2-3 Row Bio Description */}
        <p className={`${subTextColorClass} text-[10px] sm:text-[10.5px] leading-snug line-clamp-3 mb-0`}>
          {tRoot('about.profile.description')}
        </p>

        {/* Footer Strip */}
        <div className={`border-t ${dividerClass} pt-2 flex items-center justify-between gap-2`}>
          <div className="flex items-center gap-1 min-w-0">
            <MapPinSymbol className="w-3 h-3 text-[#FF2D55] shrink-0" />
            <span className={`${textColorClass} text-[10px] font-semibold truncate`}>
              {personalInfo.location}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Widget 4: CV / Resume */}
      <motion.div
        style={widgetStyles}
        className={cardSizeClass}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label={t('resumeTitle')}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <DocumentTextSymbol className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className={`${subTextColorClass} text-[10px] font-bold uppercase tracking-wider`}>
              {t('resumeTitle')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[9px] px-1.5 py-0.5 bg-[#FF3B30]/90 text-white rounded font-bold uppercase tracking-wide shadow-sm">
              PDF
            </span>
            <span className={`${subTextColorClass} text-[9.5px] font-medium`}>1.2 MB</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-1">
          <h4 className={`${textColorClass} font-bold text-xs sm:text-sm leading-tight mb-0`}>
            {t('curriculumVitae')}
          </h4>
          <p className={`${subTextColorClass} text-[10px] sm:text-[10.5px] leading-snug line-clamp-2 sm:line-clamp-3 mb-0`}>
            {t('resumeDesc')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const link = document.createElement('a')
            link.href = personalInfo.cvPath
            link.download = 'Anas_En-Naqadi_CV.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }}
          className="w-full py-2 rounded-xl text-[11px] font-bold text-white bg-blue-500 hover:bg-blue-600 active:scale-[0.98] transition shadow-sm flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <DownloadSymbol className="w-3.5 h-3.5 shrink-0" />
          {t('downloadCV')}
        </button>
      </motion.div>
    </motion.div>
  )
}
