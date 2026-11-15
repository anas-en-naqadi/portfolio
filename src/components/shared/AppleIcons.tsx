'use client'

import React, { useId } from 'react'

interface IconProps {
  size?: number | string
  className?: string
}

export function FinderIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`finderL-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#65C7FF" />
          <stop offset="100%" stopColor="#1472FF" />
        </linearGradient>
        <linearGradient id={`finderR-${uid}`} x1="256" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5FAFF" />
          <stop offset="100%" stopColor="#CFE6FF" />
        </linearGradient>
        <filter id={`finderSh-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="4" dy="0" stdDeviation="8" floodColor="#0A3A7E" floodOpacity="0.25" />
        </filter>
        <clipPath id={`finderClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#finderClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#finderL-${uid})`} />
        <path
          d="M276 0H512V512H242C246 420 260 326 260 288H212C212 220 236 105 276 0Z"
          fill={`url(#finderR-${uid})`}
          filter={`url(#finderSh-${uid})`}
        />
        <rect x="140" y="156" width="26" height="54" rx="13" fill="#172A45" />
        <rect x="346" y="156" width="26" height="54" rx="13" fill="#172A45" />
        <path
          d="M118 320C156 368 205 390 256 390C307 390 356 368 394 320"
          stroke="#172A45"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function CalendarIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  const now = new Date()
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  const dateNum = now.getDate()

  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`calTop-${uid}`} x1="0" y1="0" x2="0" y2="146" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF5B52" />
          <stop offset="100%" stopColor="#E62B22" />
        </linearGradient>
        <linearGradient id={`calBody-${uid}`} x1="0" y1="146" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F2F2F7" />
        </linearGradient>
        <clipPath id={`calClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#calClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#calBody-${uid})`} />
        <rect width="512" height="146" fill={`url(#calTop-${uid})`} />
        <rect y="146" width="512" height="4" fill="rgba(0,0,0,0.08)" />
        <text
          x="256"
          y="102"
          fill="#FFFFFF"
          fontSize="66"
          fontWeight="700"
          letterSpacing="4"
          textAnchor="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
        >
          {dayName}
        </text>
        <text
          x="256"
          y="404"
          fill="#1C1C1E"
          fontSize="248"
          fontWeight="500"
          letterSpacing="-8"
          textAnchor="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
        >
          {dateNum}
        </text>
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function AppStoreIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`asGrad-${uid}`} x1="256" y1="0" x2="256" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#35B8FF" />
          <stop offset="100%" stopColor="#0066F5" />
        </linearGradient>
        <filter id={`asSh-${uid}`} x="0" y="0" width="512" height="512" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#003E99" floodOpacity="0.28" />
        </filter>
        <clipPath id={`asClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#asClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#asGrad-${uid})`} />
        <g filter={`url(#asSh-${uid})`} stroke="#FFFFFF" strokeWidth="38" strokeLinecap="round">
          <line x1="234" y1="128" x2="366" y2="358" />
          <line x1="278" y1="128" x2="146" y2="358" />
          <line x1="120" y1="306" x2="300" y2="306" />
          <line x1="344" y1="306" x2="392" y2="306" />
        </g>
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function SettingsIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`setBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D6D9DF" />
          <stop offset="100%" stopColor="#8E929B" />
        </linearGradient>
        <linearGradient id={`setMetal-${uid}`} x1="0" y1="80" x2="0" y2="432" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F6F8" />
          <stop offset="50%" stopColor="#C4C7CE" />
          <stop offset="100%" stopColor="#8C9099" />
        </linearGradient>
        <clipPath id={`setClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#setClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#setBg-${uid})`} />
        <circle cx="256" cy="256" r="184" fill="#3A3A3E" />
        {/* Outer gear teeth */}
        <g transform="translate(256 256)" stroke={`url(#setMetal-${uid})`} strokeWidth="28" strokeLinecap="round">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="0" y1="-156" x2="0" y2="-130" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle cx="256" cy="256" r="126" stroke={`url(#setMetal-${uid})`} strokeWidth="26" fill="#2C2C2E" />
        {/* Inner three spokes */}
        <g transform="translate(256 256)" stroke="#B0B4BD" strokeWidth="18" strokeLinecap="round">
          <line x1="0" y1="0" x2="0" y2="-112" />
          <line x1="0" y1="0" x2="97" y2="56" />
          <line x1="0" y1="0" x2="-97" y2="56" />
        </g>
        <circle cx="256" cy="256" r="78" stroke="#6E727A" strokeWidth="12" fill="none" />
        <circle cx="256" cy="256" r="34" fill={`url(#setMetal-${uid})`} stroke="#48484A" strokeWidth="8" />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function MailIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`mailBg-${uid}`} x1="256" y1="0" x2="256" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B82FF" />
          <stop offset="100%" stopColor="#5CE1FF" />
        </linearGradient>
        <filter id={`mailSh-${uid}`} x="40" y="100" width="432" height="320" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#00499E" floodOpacity="0.28" />
        </filter>
        <clipPath id={`mailClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#mailClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#mailBg-${uid})`} />
        <g filter={`url(#mailSh-${uid})`}>
          <rect x="76" y="136" width="360" height="240" rx="28" fill="#FFFFFF" />
          <path d="M84 364L198 256M428 364L314 256" stroke="#DCEBFF" strokeWidth="14" strokeLinecap="round" />
          <path d="M82 152L242 268C250.5 274 261.5 274 270 268L430 152" stroke="#1E88FF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function SafariIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`safBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E6E8EE" />
        </linearGradient>
        <linearGradient id={`safDial-${uid}`} x1="256" y1="48" x2="256" y2="464" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3BC1FF" />
          <stop offset="100%" stopColor="#0066F5" />
        </linearGradient>
        <filter id={`safSh-${uid}`} x="40" y="40" width="432" height="432" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#002D73" floodOpacity="0.35" />
        </filter>
        <clipPath id={`safClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#safClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#safBg-${uid})`} />
        <circle cx="256" cy="256" r="206" fill={`url(#safDial-${uid})`} />
        <g transform="translate(256 256)">
          {Array.from({ length: 36 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-190"
              x2="0"
              y2={i % 3 === 0 ? '-168' : '-178'}
              stroke="rgba(255,255,255,0.85)"
              strokeWidth={i % 3 === 0 ? '4.5' : '2.5'}
              strokeLinecap="round"
              transform={`rotate(${i * 10})`}
            />
          ))}
        </g>
        <g transform="rotate(42 256 256)" filter={`url(#safSh-${uid})`}>
          <polygon points="256,88 286,256 226,256" fill="#FF3B30" />
          <polygon points="256,424 286,256 226,256" fill="#FFFFFF" />
          <circle cx="256" cy="256" r="14" fill="#E5E5EA" />
        </g>
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function LaunchpadIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  const tiles = [
    ['#FF453A', '#30D158', '#0A84FF'],
    ['#FF9F0A', '#BF5AF2', '#64D2FF'],
    ['#FFD60A', '#5E5CE6', '#FF375F'],
  ]
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`lpBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F6FA" />
          <stop offset="100%" stopColor="#D8DCE6" />
        </linearGradient>
        <clipPath id={`lpClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#lpClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#lpBg-${uid})`} />
        {tiles.map((row, r) =>
          row.map((color, c) => (
            <rect
              key={`${r}-${c}`}
              x={86 + c * 120}
              y={86 + r * 120}
              width="100"
              height="100"
              rx="26"
              fill={color}
            />
          ))
        )}
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function DownloadsIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`dlBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E8ECF4" />
        </linearGradient>
        <linearGradient id={`dlCircle-${uid}`} x1="256" y1="76" x2="256" y2="436" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#35B8FF" />
          <stop offset="100%" stopColor="#0066F5" />
        </linearGradient>
        <clipPath id={`dlClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#dlClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#dlBg-${uid})`} />
        <circle cx="256" cy="256" r="176" fill={`url(#dlCircle-${uid})`} />
        <path d="M256 146V312M256 312L190 246M256 312L322 246" stroke="#FFFFFF" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M174 352H338" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function GitHubIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`ghBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#323338" />
          <stop offset="100%" stopColor="#141416" />
        </linearGradient>
        <clipPath id={`gitClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#gitClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#ghBg-${uid})`} />
        <path d="M256 88C163.2 88 88 163.2 88 256c0 74.2 48.1 137.2 114.9 159.5 8.4 1.5 11.5-3.6 11.5-8.1v-28.4c-46.7 10.1-56.6-22.6-56.6-22.6-7.7-19.4-18.7-24.6-18.7-24.6-15.3-10.4 1.2-10.2 1.2-10.2 16.9 1.2 25.7 17.3 25.7 17.3 15 25.7 39.3 18.3 48.9 13.9 1.5-10.8 5.9-18.3 10.7-22.4-37.3-4.2-76.5-18.6-76.5-83 0-18.3 6.6-33.3 17.3-45.1-1.7-4.2-7.5-21.3 1.6-44.4 0 0 14.1-4.5 46.2 17.2 13.4-3.7 27.7-5.6 42-5.6 14.3 0 28.6 1.9 42 5.6 32.1-21.7 46.2-17.2 46.2-17.2 9.1 23.1 3.3 40.2 1.6 44.4 10.8 11.8 17.3 26.8 17.3 45.1 0 64.5-39.3 78.7-76.7 82.8 6 5.2 11.5 15.4 11.5 31.2v46.5c0 4.5 3.1 9.7 11.6 8.1C375.9 393.2 424 330.2 424 256c0-92.8-75.2-168-168-168Z" fill="#FFFFFF" />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function LinkedInIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`lnBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1A7FE0" />
          <stop offset="100%" stopColor="#0055AC" />
        </linearGradient>
        <clipPath id={`lnClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#lnClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#lnBg-${uid})`} />
        <path d="M168 148c0-20-16-36-36-36s-36 16-36 36 16 36 36 36 36-16 36-36zM100 206h64v196h-64zM204 206h61v27h1c9-16 30-33 61-33 65 0 77 43 77 98v104h-64V312c0-25-1-58-35-58-35 0-41 28-41 56v92h-60V206z" fill="#FFFFFF" />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function PhoneIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`phGrad-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#65F57E" />
          <stop offset="100%" stopColor="#1DB944" />
        </linearGradient>
        <clipPath id={`phClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#phClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#phGrad-${uid})`} />
        <path
          d="M170 112c-16 0-32 8-42 21-10 12-14 28-12 44 12 88 68 164 140 218 22 17 50 28 79 28 16 0 32-8 42-21 10-12 14-28 12-44-3-19-13-36-28-48l-20-16c-12-10-29-11-43-4l-13 7c-10 5-22 2-29-7l-46-54c-8-9-7-22 0-31l8-11c9-13 9-30 0-43l-20-27c-9-13-24-21-40-21z"
          fill="#FFFFFF"
        />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function InstagramIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`igGrad-${uid}`} x1="60" y1="452" x2="452" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED976" />
          <stop offset="30%" stopColor="#FA7E1E" />
          <stop offset="65%" stopColor="#D62976" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
        <clipPath id={`igClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#igClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#igGrad-${uid})`} />
        <rect x="112" y="112" width="288" height="288" rx="76" stroke="#FFFFFF" strokeWidth="28" />
        <circle cx="256" cy="256" r="68" stroke="#FFFFFF" strokeWidth="28" />
        <circle cx="338" cy="174" r="18" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export function WhatsAppIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`waBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5FF57B" />
          <stop offset="100%" stopColor="#1DB944" />
        </linearGradient>
        <clipPath id={`waClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#waClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#waBg-${uid})`} />
        <path d="M256 96c-88.4 0-160 71.6-160 160 0 28.3 7.4 54.8 20.3 77.8L88 424l94-24.6c22.1 12 47.3 18.8 74 18.8 88.4 0 160-71.6 160-160S344.4 96 256 96z" fill="#FFFFFF" />
        <path d="M334.4 296c-4.8-2.4-28.4-14-32.9-15.6-4.4-1.6-7.6-2.4-10.8 2.4-3.2 4.8-12.4 15.6-15.3 18.8-2.8 3.2-5.7 3.6-10.5 1.2-4.8-2.4-20.3-7.5-38.6-23.8-14.2-12.7-23.8-28.4-26.7-33.2-2.8-4.8-.3-7.4 2.1-9.8 2.1-2.1 4.8-5.6 7.2-8.4 2.4-2.8 3.2-4.8 4.8-8 1.6-3.2.8-6-.4-8.4-1.2-2.4-10.8-26.1-14.8-35.7-3.9-9.4-7.9-8.2-10.8-8.3-2.8-.1-6-.1-9.2-.1-3.2 0-8.4 1.2-12.8 6-4.4 4.8-16.8 16.4-16.8 40s17.2 46.4 19.6 49.6c2.4 3.2 33.7 51.5 81.7 72.2 11.4 4.9 20.4 7.9 27.3 10.1 11.5 3.6 21.9 3.1 30.1 1.9 9.2-1.3 28.4-11.6 32.4-22.8 4-11.2 4-20.8 2.8-22.8-1.2-2.1-4.4-3.2-9.2-5.6z" fill={`url(#waBg-${uid})`} />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function FaceTimeIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`ftGrad-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#62F27D" />
          <stop offset="100%" stopColor="#1FC447" />
        </linearGradient>
        <clipPath id={`ftClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#ftClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#ftGrad-${uid})`} />
        <rect x="98" y="152" width="204" height="208" rx="46" fill="#FFFFFF" />
        <path d="M320 202L394 158C404 152 416 159 416 170V342C416 353 404 360 394 354L320 310V202Z" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export function PhotosIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  const petals = [
    { color: '#FF9500', angle: 0 },
    { color: '#FFCC00', angle: 45 },
    { color: '#64D248', angle: 90 },
    { color: '#30B0C7', angle: 135 },
    { color: '#007AFF', angle: 180 },
    { color: '#8944AB', angle: 225 },
    { color: '#AF52DE', angle: 270 },
    { color: '#FF2D55', angle: 315 },
  ]
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`phClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#phClip-${uid})`}>
        <rect width="512" height="512" fill="#FFFFFF" />
        <g transform="translate(256 256)">
          {petals.map((p) => (
            <rect
              key={p.angle}
              x="-38"
              y="-156"
              width="76"
              height="128"
              rx="38"
              fill={p.color}
              fillOpacity="0.82"
              transform={`rotate(${p.angle})`}
            />
          ))}
        </g>
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function CameraIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`camBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ECEEF2" />
          <stop offset="100%" stopColor="#B8BCC6" />
        </linearGradient>
        <clipPath id={`camClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#camClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#camBg-${uid})`} />
        <path d="M180 166L208 130H304L332 166H386C407 166 424 183 424 204V352C424 373 407 390 386 390H126C105 390 88 373 88 352V204C88 183 105 166 126 166H180Z" fill="#2C2C2E" />
        <circle cx="256" cy="278" r="68" fill="#18181A" stroke="#636366" strokeWidth="10" />
        <circle cx="256" cy="278" r="34" fill="#0A84FF" fillOpacity="0.65" />
        <circle cx="362" cy="214" r="10" fill="#FFD60A" />
      </g>
    </svg>
  )
}

export function NotesIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`notesTop-${uid}`} x1="0" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE033" />
          <stop offset="100%" stopColor="#F5BA00" />
        </linearGradient>
        <linearGradient id={`notesBg-${uid}`} x1="0" y1="128" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F7" />
        </linearGradient>
        <clipPath id={`notesClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#notesClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#notesBg-${uid})`} />
        <rect width="512" height="128" fill={`url(#notesTop-${uid})`} />
        <line x1="0" y1="138" x2="512" y2="138" stroke="#D1D1D6" strokeWidth="5" strokeDasharray="10 14" />
        <g stroke="#D1D1D6" strokeWidth="5">
          <line x1="0" y1="226" x2="512" y2="226" />
          <line x1="0" y1="316" x2="512" y2="316" />
          <line x1="0" y1="406" x2="512" y2="406" />
        </g>
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function RemindersIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  const rows = [
    { y: 154, color: '#007AFF' },
    { y: 256, color: '#FF9500' },
    { y: 358, color: '#FF3B30' },
  ]
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`remClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#remClip-${uid})`}>
        <rect width="512" height="512" fill="#FFFFFF" />
        {rows.map((r) => (
          <g key={r.y}>
            <circle cx="118" cy={r.y} r="30" fill={r.color} fillOpacity="0.16" stroke={r.color} strokeWidth="10" />
            <circle cx="118" cy={r.y} r="13" fill={r.color} />
            <line x1="178" y1={r.y} x2="424" y2={r.y} stroke="#E5E5EA" strokeWidth="10" strokeLinecap="round" />
          </g>
        ))}
      </g>
    </svg>
  )
}

export function ClockIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`clkClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clkClip-${uid})`}>
        <rect width="512" height="512" fill="#1C1C1E" />
        <circle cx="256" cy="256" r="196" fill="#FFFFFF" />
        <line x1="256" y1="256" x2="256" y2="128" stroke="#1C1C1E" strokeWidth="16" strokeLinecap="round" />
        <line x1="256" y1="256" x2="352" y2="256" stroke="#1C1C1E" strokeWidth="12" strokeLinecap="round" />
        <line x1="256" y1="286" x2="184" y2="338" stroke="#FF9500" strokeWidth="6" strokeLinecap="round" />
        <circle cx="256" cy="256" r="12" fill="#FF9500" />
      </g>
    </svg>
  )
}

export function MessagesIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`msgGrad-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#65F57E" />
          <stop offset="100%" stopColor="#1DB944" />
        </linearGradient>
        <clipPath id={`msgClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#msgClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#msgGrad-${uid})`} />
        <path d="M256 124c-84 0-152 55.5-152 124 0 39.5 22.8 74.5 58.6 96.5l-15 49.5c-2 6.8 5.2 12.6 11.2 9l56-33.4c12.4 3.4 25.5 5.4 39.2 5.4 84 0 152-55.5 152-124S340 124 256 124z" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export function WalletIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`walClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#walClip-${uid})`}>
        <rect width="512" height="512" fill="#F2F2F7" />
        <rect x="68" y="106" width="376" height="300" rx="34" fill="#1C1C1E" />
        <rect x="88" y="132" width="336" height="60" rx="16" fill="#007AFF" />
        <rect x="88" y="164" width="336" height="60" rx="16" fill="#FF9500" />
        <rect x="88" y="196" width="336" height="60" rx="16" fill="#34C759" />
        <rect x="88" y="228" width="336" height="60" rx="16" fill="#FF3B30" />
        <path d="M68 256H196C205 280 228 296 256 296C284 296 307 280 316 256H444V372C444 391 429 406 410 406H102C83 406 68 391 68 372V256Z" fill="#2C2C2E" />
      </g>
    </svg>
  )
}

export function HealthIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`hltHeart-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF5277" />
          <stop offset="100%" stopColor="#FF1F4B" />
        </linearGradient>
        <clipPath id={`hltClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#hltClip-${uid})`}>
        <rect width="512" height="512" fill="#FFFFFF" />
        <path
          d="M334 296 C334 296 232 230 232 162 C232 126 260 102 292 102 C312 102 326 112 334 126 C342 112 356 102 376 102 C408 102 436 126 436 162 C436 230 334 296 334 296 Z"
          fill={`url(#hltHeart-${uid})`}
        />
      </g>
      <rect width="512" height="512" rx="114" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
    </svg>
  )
}

export function ContactsIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`cntBg-${uid}`} x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D7BFA8" />
          <stop offset="100%" stopColor="#9A7E64" />
        </linearGradient>
        <clipPath id={`cntClip-${uid}`}>
          <rect width="512" height="512" rx="114" />
        </clipPath>
      </defs>
      <g clipPath={`url(#cntClip-${uid})`}>
        <rect width="512" height="512" fill={`url(#cntBg-${uid})`} />
        {/* Right-edge colored index tabs */}
        <rect x="430" y="0" width="82" height="128" fill="#007AFF" />
        <rect x="430" y="128" width="82" height="128" fill="#FF9500" />
        <rect x="430" y="256" width="82" height="128" fill="#34C759" />
        <rect x="430" y="384" width="82" height="128" fill="#FF3B30" />
        <rect x="424" y="0" width="8" height="512" fill="rgba(0,0,0,0.18)" />
        {/* Person silhouette */}
        <circle cx="222" cy="202" r="56" fill="#4A3B2D" />
        <path d="M126 368c0-48 43-84 96-84s96 36 96 84v18H126v-18z" fill="#4A3B2D" />
        <rect x="1" y="1" width="510" height="510" rx="113" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function TrashIcon({ size = 48, className }: IconProps) {
  const uid = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`trBody-${uid}`} x1="120" y1="112" x2="392" y2="440" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E4E7EC" />
          <stop offset="50%" stopColor="#B8C0CC" />
          <stop offset="100%" stopColor="#838C9B" />
        </linearGradient>
        <linearGradient id={`trRim-${uid}`} x1="112" y1="88" x2="400" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={`trInner-${uid}`} x1="256" y1="92" x2="256" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="256" cy="442" rx="110" ry="18" fill="rgba(0,0,0,0.24)" />
      {/* Bin Body */}
      <path d="M128 122 L156 410 C158 428 198 442 256 442 C314 442 354 428 356 410 L384 122 Z" fill={`url(#trBody-${uid})`} stroke="rgba(255,255,255,0.45)" strokeWidth="3" />
      {/* Subtle metallic flutes */}
      <path d="M180 156 L192 406" stroke="rgba(255,255,255,0.35)" strokeWidth="6" strokeLinecap="round" />
      <path d="M218 160 L224 412" stroke="rgba(15,23,42,0.12)" strokeWidth="5" strokeLinecap="round" />
      <path d="M256 162 L256 414" stroke="rgba(255,255,255,0.28)" strokeWidth="6" strokeLinecap="round" />
      <path d="M294 160 L288 412" stroke="rgba(15,23,42,0.12)" strokeWidth="5" strokeLinecap="round" />
      <path d="M332 156 L320 406" stroke="rgba(255,255,255,0.25)" strokeWidth="5" strokeLinecap="round" />
      {/* Top Rim & Hollow */}
      <ellipse cx="256" cy="122" rx="132" ry="30" fill={`url(#trRim-${uid})`} stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" />
      <ellipse cx="256" cy="122" rx="112" ry="20" fill={`url(#trInner-${uid})`} />
    </svg>
  )
}

export function getAppleIcon(id: string, size: number | string = 48) {
  switch (id.toLowerCase()) {
    case 'finder':
    case 'files':
      return <FinderIcon size={size} />
    case 'about':
    case 'contacts':
      return <ContactsIcon size={size} />
    case 'experience':
    case 'calendar':
      return <CalendarIcon size={size} />
    case 'projects':
    case 'appstore':
      return <AppStoreIcon size={size} />
    case 'skills':
    case 'notes':
      return <NotesIcon size={size} />
    case 'settings':
      return <SettingsIcon size={size} />
    case 'contact':
    case 'mail':
      return <MailIcon size={size} />
    case 'safari':
      return <SafariIcon size={size} />
    case 'launchpad':
      return <LaunchpadIcon size={size} />
    case 'downloads':
    case 'cv':
      return <DownloadsIcon size={size} />
    case 'github':
      return <GitHubIcon size={size} />
    case 'linkedin':
      return <LinkedInIcon size={size} />
    case 'phone':
      return <PhoneIcon size={size} />
    case 'instagram':
      return <InstagramIcon size={size} />
    case 'whatsapp':
      return <WhatsAppIcon size={size} />
    case 'facetime':
      return <FaceTimeIcon size={size} />
    case 'photos':
      return <PhotosIcon size={size} />
    case 'camera':
      return <CameraIcon size={size} />
    case 'reminders':
      return <RemindersIcon size={size} />
    case 'clock':
      return <ClockIcon size={size} />
    case 'messages':
      return <MessagesIcon size={size} />
    case 'wallet':
      return <WalletIcon size={size} />
    case 'health':
      return <HealthIcon size={size} />
    case 'trash':
      return <TrashIcon size={size} />
    default:
      return <SafariIcon size={size} />
  }
}
