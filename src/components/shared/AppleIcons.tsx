'use client'

import React from 'react'

interface IconProps {
  size?: number | string
  className?: string
}

export function FinderIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="finderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#85C2FF" />
          <stop offset="100%" stopColor="#1E80FF" />
        </linearGradient>
        <clipPath id="finderClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#finderClip)">
        <rect width="512" height="512" fill="url(#finderGrad)" />
        {/* Left side face (darker blue) */}
        <rect width="256" height="512" fill="#1E80FF" />
        {/* Right side face (lighter blue) */}
        <rect x="256" width="256" height="512" fill="#85C2FF" />
        {/* Face splitting line (nose profile) */}
        <path d="M256 0V180C256 220 286 250 326 250H460" stroke="#0C346B" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        {/* Left eye */}
        <circle cx="150" cy="180" r="32" fill="#0C346B" />
        {/* Right eye */}
        <circle cx="362" cy="180" r="32" fill="#0C346B" />
        {/* Smile */}
        <path d="M130 320C130 320 180 390 256 390C332 390 382 320 382 320" stroke="#0C346B" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export function CalendarIcon({ size = 48, className }: IconProps) {
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  const dateNum = new Date().getDate()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="calClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#calClip)">
        <rect width="512" height="512" fill="#FFFFFF" />
        {/* Header block for day name */}
        <rect width="512" height="150" fill="#FF3B30" />
        {/* Day name */}
        <text x="256" y="105" fill="#FFFFFF" fontSize="72" fontWeight="800" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">{dayName}</text>
        {/* Date number */}
        <text x="256" y="380" fill="#1C1C1E" fontSize="210" fontWeight="400" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif">{dateNum}</text>
      </g>
    </svg>
  )
}

export function AppStoreIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="appStoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#35A6FF" />
          <stop offset="100%" stopColor="#007AFF" />
        </linearGradient>
        <clipPath id="appStoreClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#appStoreClip)">
        <rect width="512" height="512" fill="url(#appStoreGrad)" />
        {/* The 'A' stick figure logo */}
        <g stroke="#FFFFFF" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round">
          <line x1="256" y1="120" x2="390" y2="390" />
          <line x1="256" y1="120" x2="122" y2="390" />
          <line x1="160" y1="310" x2="352" y2="310" />
        </g>
      </g>
    </svg>
  )
}

export function SettingsIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="settingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E5EA" />
          <stop offset="100%" stopColor="#8E8E93" />
        </linearGradient>
        <clipPath id="settingsClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#settingsClip)">
        <rect width="512" height="512" fill="url(#settingsGrad)" />
        <circle cx="256" cy="256" r="100" fill="#AEAEB2" stroke="#FFFFFF" strokeWidth="24" />
        <circle cx="256" cy="256" r="45" fill="#545456" />
        <g stroke="#FFFFFF" strokeWidth="28" strokeLinecap="round">
          <line x1="256" y1="90" x2="256" y2="130" />
          <line x1="256" y1="382" x2="256" y2="422" />
          <line x1="90" y1="256" x2="130" y2="256" />
          <line x1="382" y1="256" x2="422" y2="256" />
          <line x1="138" y1="138" x2="168" y2="168" />
          <line x1="344" y1="344" x2="374" y2="374" />
          <line x1="374" y1="138" x2="344" y2="168" />
          <line x1="168" y1="344" x2="138" y2="374" />
        </g>
      </g>
    </svg>
  )
}

export function MailIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5AC8FA" />
          <stop offset="100%" stopColor="#007AFF" />
        </linearGradient>
        <clipPath id="mailClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#mailClip)">
        <rect width="512" height="512" fill="url(#mailGrad)" />
        <rect x="80" y="140" width="352" height="232" rx="24" fill="#FFFFFF" />
        <path d="M80 160L256 280L432 160" stroke="#007AFF" strokeWidth="20" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M80 350L180 250" stroke="#007AFF" strokeWidth="16" strokeLinecap="round" />
        <path d="M432 350L332 250" stroke="#007AFF" strokeWidth="16" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function SafariIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="safariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E5E5EA" />
        </linearGradient>
        <linearGradient id="compassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#35A6FF" />
          <stop offset="100%" stopColor="#007AFF" />
        </linearGradient>
        <clipPath id="safariClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#safariClip)">
        <rect width="512" height="512" fill="url(#safariGrad)" />
        <circle cx="256" cy="256" r="200" fill="url(#compassGrad)" stroke="#AEAEB2" strokeWidth="4" />
        <g stroke="rgba(255,255,255,0.6)" strokeWidth="6" strokeLinecap="round">
          <line x1="256" y1="76" x2="256" y2="92" />
          <line x1="256" y1="420" x2="256" y2="436" />
          <line x1="76" y1="256" x2="92" y2="256" />
          <line x1="420" y1="256" x2="436" y2="256" />
          <line x1="129" y1="129" x2="140" y2="140" />
          <line x1="372" y1="372" x2="383" y2="383" />
          <line x1="372" y1="129" x2="363" y2="140" />
          <line x1="140" y1="372" x2="129" y2="383" />
        </g>
        <path d="M256 120L286 256L256 392L226 256L256 120Z" fill="#FF3B30" />
        <path d="M256 256L286 256L256 392L226 256L256 256Z" fill="#F2F2F7" />
        <circle cx="256" cy="256" r="14" fill="#FFFFFF" />
        <circle cx="256" cy="256" r="6" fill="#8E8E93" />
      </g>
    </svg>
  )
}

export function LaunchpadIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="launchpadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E5E5EA" />
        </linearGradient>
        <clipPath id="launchpadClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#launchpadClip)">
        <rect width="512" height="512" fill="url(#launchpadGrad)" />
        <g transform="translate(46, 46)">
          <rect x="0" y="0" width="100" height="100" rx="24" fill="#FF3B30" />
          <rect x="160" y="0" width="100" height="100" rx="24" fill="#34C759" />
          <rect x="320" y="0" width="100" height="100" rx="24" fill="#007AFF" />
          <rect x="0" y="160" width="100" height="100" rx="24" fill="#FF9500" />
          <rect x="160" y="160" width="100" height="100" rx="24" fill="#AF52DE" />
          <rect x="320" y="160" width="100" height="100" rx="24" fill="#5AC8FA" />
          <rect x="0" y="320" width="100" height="100" rx="24" fill="#FFCC00" />
          <rect x="160" y="320" width="100" height="100" rx="24" fill="#5856D6" />
          <rect x="320" y="320" width="100" height="100" rx="24" fill="#FF2D55" />
        </g>
      </g>
    </svg>
  )
}

export function DownloadsIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E5E5EA" />
        </linearGradient>
        <clipPath id="dlClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#dlClip)">
        <rect width="512" height="512" fill="url(#dlGrad)" />
        <circle cx="256" cy="256" r="160" fill="#007AFF" />
        <path d="M256 150V310M256 310L196 250M256 310L316 250" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M176 340H336" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function GitHubIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="gitClip">
          <rect width="512" height="512" rx="112" />
        </clipPath>
      </defs>
      <g clipPath="url(#gitClip)">
        <rect width="512" height="512" fill="#181717" />
        <path d="M256 70C153.2 70 70 153.2 70 256c0 82.2 53.3 152 127.2 176.6 9.3 1.7 12.7-4 12.7-9v-31.5c-51.7 11.2-62.7-25-62.7-25-8.5-21.5-20.7-27.2-20.7-27.2-16.9-11.5 1.3-11.3 1.3-11.3 18.7 1.3 28.5 19.2 28.5 19.2 16.6 28.4 43.5 20.2 54.1 15.4 1.7-12 6.5-20.2 11.8-24.8-41.3-4.7-84.7-20.6-84.7-91.9 0-20.3 7.3-36.9 19.2-49.9-1.9-4.7-8.3-23.6 1.8-49.2 0 0 15.6-5 51.1 19 14.8-4.1 30.7-6.2 46.5-6.2 15.8 0 31.7 2.1 46.5 6.2 35.5-24 51.1-19 51.1-19 10.1 25.6 3.7 44.5 1.8 49.2 11.9 13 19.1 29.6 19.1 49.9 0 71.4-43.5 87.1-84.9 91.7 6.7 5.8 12.7 17.1 12.7 34.5v51.5c0 5 3.4 10.8 12.8 9C388.7 408 442 338.2 442 256 442 153.2 358.8 70 256 70Z" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export function LinkedInIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="linkedinClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#linkedinClip)">
        <rect width="512" height="512" fill="#0A66C2" />
        <path d="M150 110c0-25-20-45-45-45s-45 20-45 45 20 45 45 45 45-20 45-45zM60 180h90v250H60zM195 180h85v35h2c12-22 41-45 84-45 90 0 106 59 106 135v125h-88V290c0-35-1-80-49-80-49 0-56 38-56 77v143h-89V180z" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export function PhoneIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#62EF7D" />
          <stop offset="100%" stopColor="#31C754" />
        </linearGradient>
        <clipPath id="phoneClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#phoneClip)">
        <rect width="512" height="512" fill="url(#phoneGrad)" />
        <g transform="translate(0, -40)">
          <path d="M152.2 110.2c-23.4 0-45.9 10.9-60.7 29.5-12.8 16.1-18.4 36.8-15.6 57.5 13.9 103.5 81 198.8 167.3 268 28.5 22.9 64.9 36.8 102.3 36.8 23.4 0 45.9-10.9 60.7-29.5 12.8-16.1 18.4-36.8 15.6-57.5-3.4-25.2-16.3-48.4-35.8-63.9l-22.9-18.3c-15.6-12.5-37.4-14.7-55.2-5.7l-15 7.6c-13 6.6-28.7 3.3-38-7.7L213.5 285c-9.3-11-8.5-27.1-.2-39.3l9.6-13.9c11.3-16.4 11-38.3-.7-54.4l-25.4-34.9c-12-16.5-31.5-26.3-52.6-26.3z" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  )
}

export function InstagramIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="instaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FED976" />
          <stop offset="25%" stopColor="#FEB24C" />
          <stop offset="50%" stopColor="#FD8D3C" />
          <stop offset="75%" stopColor="#FC4E2A" />
          <stop offset="100%" stopColor="#E31A1C" />
        </linearGradient>
        <clipPath id="instaClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#instaClip)">
        <rect width="512" height="512" fill="url(#instaGrad)" />
        <rect x="106" y="106" width="300" height="300" rx="80" stroke="#FFFFFF" strokeWidth="26" fill="none" />
        <circle cx="256" cy="256" r="70" stroke="#FFFFFF" strokeWidth="26" fill="none" />
        <circle cx="336" cy="176" r="18" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export function WhatsAppIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#128C7E" />
        </linearGradient>
        <clipPath id="waClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#waClip)">
        <rect width="512" height="512" fill="url(#waGrad)" />
        {/* Solid white speech bubble */}
        <path d="M256 76c-99.4 0-180 80.6-180 180 0 31.8 8.3 61.6 22.8 87.5L66 446l105.7-27.7c24.8 13.5 53.2 21.2 83.5 21.2 99.4 0 180-80.6 180-180S355.4 76 256 76z" fill="#FFFFFF" />
        {/* Handset inside filled with green gradient representing transparent cutout */}
        <path d="M344.2 301c-5.4-2.7-32-15.8-37-17.6-5-1.8-8.6-2.7-12.2 2.7-3.6 5.4-14 17.6-17.2 21.2-3.2 3.6-6.4 4-11.8 1.3-5.4-2.7-22.8-8.4-43.4-26.8-16-14.3-26.8-32-30-37.4-3.2-5.4-.3-8.3 2.4-11 2.4-2.4 5.4-6.3 8.1-9.5 2.7-3.2 3.6-5.4 5.4-9 1.8-3.6.9-6.8-.5-9.5-1.4-2.7-12.2-29.4-16.7-40.2-4.4-10.6-8.9-9.2-12.2-9.3-3.1-.1-6.7-.1-10.3-.1-3.6 0-9.5 1.3-14.4 6.8-5 5.4-18.9 18.5-18.9 45s19.3 52.2 22 55.8c2.7 3.6 37.9 57.9 91.9 81.2 12.8 5.5 22.9 8.9 30.7 11.4 12.9 4.1 24.6 3.5 33.9 2.1 10.3-1.5 32-13.1 36.5-25.7 4.5-12.6 4.5-23.4 3.1-25.7-1.3-2.3-5-3.6-10.4-6.3z" fill="url(#waGrad)" />
      </g>
    </svg>
  )
}

export function FaceTimeIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#62EF7D" />
          <stop offset="100%" stopColor="#31C754" />
        </linearGradient>
        <clipPath id="ftClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#ftClip)">
        <rect width="512" height="512" fill="url(#ftGrad)" />
        <rect x="100" y="146" width="200" height="220" rx="50" fill="#FFFFFF" />
        <path d="M320 200L390 156C399 150 412 157 412 168V344C412 355 399 362 390 356L320 312V200Z" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

export function PhotosIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="phClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#phClip)">
        <rect width="512" height="512" fill="#FFFFFF" />
        <g transform="translate(256, 256)">
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#FF2D55" />
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#FF9500" transform="rotate(45)" />
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#FFCC00" transform="rotate(90)" />
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#4CD964" transform="rotate(135)" />
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#5AC8FA" transform="rotate(180)" />
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#007AFF" transform="rotate(225)" />
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#5856D6" transform="rotate(270)" />
          <ellipse cx="0" cy="-60" rx="30" ry="70" fill="#FF2D55" transform="rotate(315)" />
        </g>
      </g>
    </svg>
  )
}

export function CameraIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="camGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5E5EA" />
          <stop offset="100%" stopColor="#8E8E93" />
        </linearGradient>
        <clipPath id="camClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#camClip)">
        <rect width="512" height="512" fill="url(#camGrad)" />
        <rect x="120" y="180" width="272" height="190" rx="40" fill="#3A3A3C" />
        <path d="M210 180L230 140H282L302 180H210Z" fill="#3A3A3C" />
        <circle cx="256" cy="275" r="60" fill="#1C1C1E" stroke="#555" strokeWidth="8" />
        <circle cx="256" cy="275" r="30" fill="#0A84FF" />
        <circle cx="340" cy="220" r="10" fill="#FFCC00" />
      </g>
    </svg>
  )
}

export function NotesIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="notesClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#notesClip)">
        <rect width="512" height="512" fill="#FFFFFF" />
        <rect x="0" y="0" width="512" height="110" fill="#FFCC00" />
        <g stroke="#E5E5EA" strokeWidth="4" strokeDasharray="1 15">
          <line x1="80" y1="0" x2="80" y2="512" />
        </g>
        <g stroke="#D1D1D6" strokeWidth="4">
          <line x1="120" y1="160" x2="420" y2="160" />
          <line x1="120" y1="230" x2="420" y2="230" />
          <line x1="120" y1="300" x2="420" y2="300" />
          <line x1="120" y1="370" x2="420" y2="370" />
        </g>
      </g>
    </svg>
  )
}

export function RemindersIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="remClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#remClip)">
        <rect width="512" height="512" fill="#FFFFFF" />
        <circle cx="120" cy="150" r="22" stroke="#FF3B30" strokeWidth="10" fill="none" />
        <line x1="170" y1="150" x2="400" y2="150" stroke="#1C1C1E" strokeWidth="10" strokeLinecap="round" />
        
        <circle cx="120" cy="256" r="22" stroke="#007AFF" strokeWidth="10" fill="none" />
        <line x1="170" y1="256" x2="400" y2="256" stroke="#1C1C1E" strokeWidth="10" strokeLinecap="round" />

        <circle cx="120" cy="362" r="22" stroke="#FFCC00" strokeWidth="10" fill="none" />
        <line x1="170" y1="362" x2="400" y2="362" stroke="#1C1C1E" strokeWidth="10" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function ClockIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="clkClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#clkClip)">
        <rect width="512" height="512" fill="#FFFFFF" />
        <circle cx="256" cy="256" r="180" stroke="#000000" strokeWidth="14" fill="none" />
        <line x1="256" y1="90" x2="256" y2="110" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
        <line x1="256" y1="422" x2="256" y2="402" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
        <line x1="90" y1="256" x2="110" y2="256" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
        <line x1="422" y1="256" x2="402" y2="256" stroke="#000000" strokeWidth="10" strokeLinecap="round" />
        <line x1="256" y1="256" x2="256" y2="150" stroke="#000000" strokeWidth="16" strokeLinecap="round" />
        <line x1="256" y1="256" x2="340" y2="256" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
        <circle cx="256" cy="256" r="15" fill="#FF3B30" />
      </g>
    </svg>
  )
}

export function MessagesIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="msgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#62EF7D" />
          <stop offset="100%" stopColor="#31C754" />
        </linearGradient>
        <clipPath id="msgClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#msgClip)">
        <rect width="512" height="512" fill="url(#msgGrad)" />
        <path d="M256 120c-80 0-145 53.7-145 120 0 38.3 22 72 56.4 93.3l-14 47.9c-2 6.8 5.1 12.5 10.9 9l53.9-32.3c11.7 3.3 24 5.1 36.6 5.1 80 0 145-53.7 145-120S336 120 256 120z" fill="#FFFFFF" />
      </g>
    </svg>
  )
}
export function WalletIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="walletClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#walletClip)">
        <rect width="512" height="512" fill="#1C1C1E" />
        <rect x="60" y="140" width="392" height="240" rx="30" fill="#2C2C2E" stroke="#3A3A3C" strokeWidth="8" />
        <path d="M60 180H452" stroke="#FF9500" strokeWidth="12" />
        <path d="M60 210H452" stroke="#FF3B30" strokeWidth="12" />
        <path d="M60 240H452" stroke="#007AFF" strokeWidth="12" />
        <circle cx="380" cy="290" r="16" fill="#34C759" />
      </g>
    </svg>
  )
}

export function HealthIcon({ size = 48, className }: IconProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="healthClip"><rect width="512" height="512" rx="112" /></clipPath>
      </defs>
      <g clipPath="url(#healthClip)">
        <rect width="512" height="512" fill="#FFFFFF" />
        <path d="M256 397.6c-4.8 0-9.6-1.9-13.2-5.5L138 287.3C104.7 254 104.7 200 138 166.7c33.3-33.3 87.3-33.3 120.6 0l13.2 13.2 13.2-13.2c33.3-33.3 87.3-33.3 120.6 0 33.3 33.3 33.3 87.3 0 120.6L269.2 392.1c-3.6 3.6-8.4 5.5-13.2 5.5z" fill="#FF2D55" />
      </g>
    </svg>
  )
}

// Maps name/ID to SVG icon
export function getAppleIcon(id: string, size: number | string = 48) {
  switch (id.toLowerCase()) {
    case 'about':
    case 'finder':
    case 'files':
      return <FinderIcon size={size} />
    case 'experience':
    case 'calendar':
      return <CalendarIcon size={size} />
    case 'projects':
    case 'appstore':
      return <AppStoreIcon size={size} />
    case 'skills':
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
    case 'notes':
      return <NotesIcon size={size} />
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
    default:
      return <SafariIcon size={size} />
  }
}
