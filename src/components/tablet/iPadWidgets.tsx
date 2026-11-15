'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { personalInfo } from '@/lib/data'
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

interface WeatherState {
  temp: number
  condition: string
  high: number
  low: number
  code: number
}

function getWeatherConditionText(code: number): string {
  if (code === 0) return 'Clear Sky'
  if ([1, 2, 3].includes(code)) return 'Partly Cloudy'
  if ([45, 48].includes(code)) return 'Foggy'
  if ([51, 53, 55].includes(code)) return 'Drizzle'
  if ([61, 63, 65].includes(code)) return 'Rainy'
  if ([71, 73, 75].includes(code)) return 'Snowy'
  if ([80, 81, 82].includes(code)) return 'Showers'
  if ([95, 96, 99].includes(code)) return 'Thunderstorm'
  return 'Clear'
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
  const { timeShort, dateString } = useTime()
  const isDark = theme === 'dark'

  const [weather, setWeather] = useState<WeatherState>({
    temp: 23,
    condition: 'Partly Cloudy',
    high: 25,
    low: 22,
    code: 2
  })

  useEffect(() => {
    async function getWeather() {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=31.6295&longitude=-7.9811&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto')
        const data = await res.json()
        const temp = Math.round(data.current.temperature_2m)
        const code = data.current.weather_code
        const high = Math.round(data.daily.temperature_2m_max[0])
        const low = Math.round(data.daily.temperature_2m_min[0])
        const conditionText = getWeatherConditionText(code)
        
        setWeather({ temp, condition: conditionText, high, low, code })
      } catch (e) {
        console.error('Error fetching Marrakech weather for iPad:', e)
      }
    }
    getWeather()
  }, [])

  const widgetStyles: React.CSSProperties = {
    width: '100%',
    height: 180,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    background: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.5)',
    borderRadius: 22,
    border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: isDark ? '0 12px 40px rgba(0,0,0,0.3)' : '0 12px 40px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  }

  const textColorClass = isDark ? 'text-white' : 'text-zinc-800'
  const subTextColorClass = isDark ? 'text-white/70' : 'text-zinc-500'

  return (
    <motion.div
      className="grid grid-cols-2 gap-6 md:gap-8 justify-items-center w-full max-w-4xl mx-auto px-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      aria-label="Home screen widgets grid"
    >
      {/* Widget 1: Clock */}
      <motion.div
        style={widgetStyles}
        className="p-5 flex flex-col justify-between w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label="Clock widget"
      >
        <div className="flex items-center gap-2 mb-2">
          <ClockSymbol className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span className={`${subTextColorClass} text-[9px] font-bold uppercase tracking-wider`}>
            Clock
          </span>
        </div>
        <div>
          <div
            className={`${textColorClass} font-extrabold leading-none mb-1 tracking-tight`}
            style={{ fontSize: 44 }}
            aria-live="polite"
            aria-label={`Current time: ${timeShort}`}
          >
            {timeShort}
          </div>
          <div className={`${subTextColorClass} text-xs font-semibold`}>{dateString.split(',')[0]}</div>
        </div>
      </motion.div>

      {/* Widget 2: Weather */}
      <motion.div
        style={{
          ...widgetStyles,
          background: 'linear-gradient(to bottom, #0A1931, #15305B)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        className="p-5 flex flex-col justify-between text-white w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label="Weather widget"
      >
        <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-white/60">
          <span className="flex items-center gap-1">
            Marrakech
            <LocationArrowSymbol className="w-2.5 h-2.5" />
          </span>
          {getWeatherIcon(weather.code, 22)}
        </div>
        <div>
          <div className="flex items-baseline justify-between -mt-1">
            <span className="text-5xl font-light tracking-tighter" style={{ fontFamily: '"SF Pro Rounded", -apple-system, sans-serif' }}>
              {weather.temp}°
            </span>
          </div>
          <div className="text-left text-[11px] font-medium leading-tight mt-2">
            <p className="font-bold tracking-tight text-xs">{weather.condition}</p>
            <p className="text-white/70 mt-0.5">H:{weather.high}° L:{weather.low}°</p>
          </div>
        </div>
      </motion.div>

      {/* Widget 3: Profile */}
      <motion.div
        style={widgetStyles}
        className="p-5 flex flex-col justify-between w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label="Profile widget"
      >
        <div className="flex items-center gap-2">
          <PersonSymbol className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span className={`${subTextColorClass} text-[9px] font-bold uppercase tracking-wider`}>
            Profile
          </span>
        </div>

        <div className="flex items-center gap-3 mt-1">
          <div className="relative flex-shrink-0">
            <div
              className="rounded-full overflow-hidden border border-black/5 shadow-inner"
              style={{ width: 48, height: 48 }}
            >
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                width={48}
                height={48}
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

        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full self-start mt-1"
          style={{ background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.05)' }}
        >
          <MapPinSymbol className="w-3 h-3 text-[#FF2D55] shrink-0" />
          <span className={`${textColorClass} text-[9px] font-semibold`}>
            {personalInfo.location.split(',')[0]}
          </span>
        </div>
      </motion.div>

      {/* Widget 4: CV / Resume */}
      <motion.div
        style={widgetStyles}
        className="p-5 flex flex-col justify-between w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        role="region"
        aria-label="Resume widget"
      >
        <div className="flex items-center gap-2 mb-1">
          <DocumentTextSymbol className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span className={`${subTextColorClass} text-[9px] font-bold uppercase tracking-wider`}>
            CV / Resume
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-1 mt-1">
          <h4 className={`${textColorClass} font-bold text-[12px] leading-tight`}>
            Curriculum Vitae
          </h4>
          <p className={`${subTextColorClass} text-[9.5px] leading-snug`}>
            Download latest resume for professional overview.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] px-1.5 py-0.5 bg-red-500/10 dark:bg-red-500/20 text-red-500 rounded font-bold uppercase tracking-wide">
              PDF
            </span>
            <span className={`${subTextColorClass} text-[9px] font-medium`}>
              ~1.2 MB
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            const link = document.createElement('a')
            link.href = personalInfo.cvPath
            link.download = 'Anas_En-Naqadi_CV.pdf'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }}
          className="w-full py-2 mb-4 rounded-xl text-[10px] font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm mt-1.5 flex items-center justify-center gap-1.5"
        >
          <DownloadSymbol className="w-3 h-3 shrink-0" />
          Download CV
        </button>
      </motion.div>
    </motion.div>
  )
}
