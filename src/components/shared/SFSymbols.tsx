'use client'

import React from 'react'

export interface SFSymbolProps {
  className?: string
  size?: number | string
}

/** Authentic monochrome Apple logo silhouette (SF style). */
export function AppleLogoSymbol({ className = 'w-3.5 h-3.5', size }: SFSymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.68-.83 1.14-1.98 1.01-3.13-.98.04-2.17.65-2.87 1.48-.62.72-1.17 1.89-1.02 3.01 1.1.08 2.2-.54 2.88-1.36z" />
    </svg>
  )
}

/** macOS/iOS style Wi-Fi symbol. */
export function WifiSymbol({ className = 'w-4 h-3.5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 18.5a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm-4.95-2.9a.9.9 0 001.27 1.27 5.2 5.2 0 017.36 0 .9.9 0 001.27-1.27 7 7 0 00-9.9 0zm-3.54-3.54a.9.9 0 001.28 1.27 10.2 10.2 0 0114.42 0 .9.9 0 001.28-1.27 12 12 0 00-16.98 0zM1.1 8.52a.9.9 0 001.28 1.27 15.2 15.2 0 0119.24 0 .9.9 0 101.28-1.27 17 17 0 00-21.8 0z" />
    </svg>
  )
}

/** macOS/iOS style Battery symbol. */
export function BatterySymbol({ className = 'w-5 h-2.5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="19.5" height="10.5" rx="3" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
      <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.6" fill="currentColor" />
      <path d="M21.5 4v4a1.5 1.5 0 001.25-1.48V5.48A1.5 1.5 0 0021.5 4z" fill="currentColor" fillOpacity="0.5" />
    </svg>
  )
}

/** Spotlight / Magnifying Glass SF symbol. */
export function SearchSymbol({ className = 'w-3.5 h-3.5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.8-3.8" />
    </svg>
  )
}

/** Control Center dual-sliders SF symbol. */
export function ControlCenterSymbol({ className = 'w-3.5 h-3.5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="6" rx="3" />
      <circle cx="15.5" cy="7.5" r="1.6" fill="currentColor" stroke="none" />
      <rect x="3" y="13.5" width="18" height="6" rx="3" />
      <circle cx="8.5" cy="16.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function GlobeSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <ellipse cx="12" cy="12" rx="4.2" ry="9.5" />
      <path d="M3 9h18M3 15h18" />
    </svg>
  )
}

export function MoonSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  )
}

export function SunSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12 2.5v2M12 19.5v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2.5 12h2M19.5 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

export function DownloadSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
      <path d="M4 16.5v1.5A2.5 2.5 0 006.5 20.5h11a2.5 2.5 0 002.5-2.5v-1.5" />
    </svg>
  )
}

export function ShareSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 15V3m0 0l-4 4m4-4l4 4" />
      <path d="M4 11v7a2.5 2.5 0 002.5 2.5h11A2.5 2.5 0 0020 18v-7" />
    </svg>
  )
}

export function PersonSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 11a4 4 0 100-8 4 4 0 000 8zm0 2c-4.42 0-8 2.24-8 5v1.5a1.5 1.5 0 001.5 1.5h13a1.5 1.5 0 001.5-1.5V18c0-2.76-3.58-5-8-5z" />
    </svg>
  )
}

export function LaptopCodeSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="2" />
      <path d="M2 19h20" />
      <path d="M9.5 8.5L7.5 10.25 9.5 12M14.5 8.5l2 1.75-2 1.75M12.5 8l-1 4.5" />
    </svg>
  )
}

export function SparklesAISymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10.5 2.5L12 7.5 17 9l-5 1.5-1.5 5L9 10.5 4 9l5-1.5 1.5-5zM18.5 13l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" />
    </svg>
  )
}

export function DesignSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5c5.25 0 9.5 3.85 9.5 8.6 0 2.38-1.7 3.9-3.9 3.9h-1.7c-1.15 0-1.95.88-1.95 1.95 0 .48.18.92.48 1.28.42.5.12 1.27-.54 1.27H12c-5.25 0-9.5-4.25-9.5-9.5S6.75 2.5 12 2.5z" />
      <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.8" cy="7.2" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17.2" cy="11" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function GraduationCapSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3L2 8.5l10 5.5 10-5.5L12 3z" />
      <path d="M6 11v5.2c0 1.6 2.69 3.3 6 3.3s6-1.7 6-3.3V11" />
      <path d="M21 9.5v6" />
    </svg>
  )
}

export function PaperPlaneSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.8 2.2a1 1 0 00-1.05-.16L2.6 10.1a1 1 0 00.06 1.85l6.85 2.54 2.54 6.85a1 1 0 001.85.06l8.06-18.15a1 1 0 00-.16-1.05zM10.4 13.6l7.5-7.5-5.6 11.45-1.9-3.95z" />
    </svg>
  )
}

export function AppCubeSymbol({ className = 'w-8 h-8', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5L20 7v10l-8 4.5L4 17V7l8-4.5z" />
      <path d="M12 22V12m0 0l8-5m-8 5L4 7" />
    </svg>
  )
}

export function ArrowUpRightSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
}

/** Apple Weather / Maps location arrow glyph (SF location.fill). */
export function LocationArrowSymbol({ className = 'w-3 h-3', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
    </svg>
  )
}

export function CheckmarkSymbol({ className = 'w-3.5 h-3.5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4.2 4.2L19 7" />
    </svg>
  )
}

export function XMarkSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function XMarkCircleSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm-2.47 6.22a.75.75 0 011.06 0L12 9.88l1.41-1.41a.75.75 0 111.06 1.06L13.06 10.94l1.41 1.41a.75.75 0 11-1.06 1.06L12 12l-1.41 1.41a.75.75 0 11-1.06-1.06l1.41-1.41-1.41-1.41a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
  )
}

export function ChevronRightSymbol({ className = 'w-3.5 h-3.5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5.5l6.5 6.5L9 18.5" />
    </svg>
  )
}

export function CloseGlyph({ className = 'w-2 h-2', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" aria-hidden="true">
      <path d="M2.2 2.2l5.6 5.6M7.8 2.2l-5.6 5.6" />
    </svg>
  )
}

export function MinusGlyph({ className = 'w-2 h-2', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" aria-hidden="true">
      <path d="M2 5h6" />
    </svg>
  )
}

export function PlusGlyph({ className = 'w-2 h-2', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" aria-hidden="true">
      <path d="M5 2v6M2 5h6" />
    </svg>
  )
}

export function MapPinSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  )
}

export function EnvelopeSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.8" />
      <path d="M3.8 6.5L12 12.6l8.2-6.1" />
    </svg>
  )
}

export function PhoneFillSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.2 3.5h3.2a1.2 1.2 0 011.18.96l.64 3.2a1.2 1.2 0 01-.45 1.2L8.1 10.1a12.5 12.5 0 005.8 5.8l1.24-1.67a1.2 1.2 0 011.2-.45l3.2.64a1.2 1.2 0 01.96 1.18v3.2a1.5 1.5 0 01-1.64 1.5A15.8 15.8 0 013.7 5.14 1.5 1.5 0 015.2 3.5z" />
    </svg>
  )
}

export function PhoneDeviceSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.5 5.2h3" />
      <circle cx="12" cy="18.2" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function BriefcaseSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7V5.2A1.7 1.7 0 0110.2 3.5h3.6a1.7 1.7 0 011.7 1.7V7M3 12h18" />
    </svg>
  )
}

export function PrinterSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 8V3.8A.8.8 0 017.8 3h8.4a.8.8 0 01.8.8V8" />
      <rect x="3" y="8" width="18" height="9" rx="2" />
      <path d="M7 14h10v6.2a.8.8 0 01-.8.8H7.8a.8.8 0 01-.8-.8V14z" />
    </svg>
  )
}

export function ClockSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  )
}

export function DocumentTextSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3h7l5 5v12a1.8 1.8 0 01-1.8 1.8H7A1.8 1.8 0 015.2 20V4.8A1.8 1.8 0 017 3z" />
      <path d="M14 3v5h5M8.5 12.5h7M8.5 16h5" />
    </svg>
  )
}

export function GridSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
    </svg>
  )
}

export function GearSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.08a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.08a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}

export function CopySymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8.5" y="8.5" width="11.5" height="12" rx="2.2" />
      <path d="M5.5 15.5H5a2 2 0 01-2-2V5a2 2 0 012-2h8.5a2 2 0 012 2v.5" />
    </svg>
  )
}

export function VCardSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.6" />
      <circle cx="8.8" cy="10.2" r="2" />
      <path d="M5.8 15.5a3.2 3.2 0 016 0M14.5 10h4M14.5 13.5h3" />
    </svg>
  )
}

export function CpuSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
      <path d="M9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21" />
    </svg>
  )
}

export function BookSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6.5c-2.2-1.6-5.2-2-8-1.5v13.5c2.8-.5 5.8-.1 8 1.5 2.2-1.6 5.2-2 8-1.5V5c-2.8-.5-5.8-.1-8 1.5z" />
      <path d="M12 6.5V20" />
    </svg>
  )
}

export function DatabaseSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="6" rx="7.5" ry="2.8" />
      <path d="M4.5 6v6c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V6" />
      <path d="M4.5 12v6c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-6" />
    </svg>
  )
}

export function ArrowCycleSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 11.5a7.5 7.5 0 0113-4.9l1.5 1.5" />
      <path d="M19.5 4.5v3.8h-3.8" />
      <path d="M19.5 12.5a7.5 7.5 0 01-13 4.9L5 15.9" />
      <path d="M4.5 19.5v-3.8h3.8" />
    </svg>
  )
}

export function WrenchSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a4.5 4.5 0 00-5.95 5.95L4.1 16.9a1.85 1.85 0 002.62 2.62l4.65-4.65a4.5 4.5 0 005.95-5.95l-2.3 2.3-2.62-2.62 2.3-2.3z" />
    </svg>
  )
}

export function ChartBarSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 19V13M10.5 19V7M16 19V10M20 19H3.5" />
    </svg>
  )
}

export function StarSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.2l2.6 5.27 5.82.85-4.21 4.1.99 5.8L12 16.48l-5.2 2.74.99-5.8-4.21-4.1 5.82-.85L12 3.2z" />
    </svg>
  )
}

export function CalendarSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
      <path d="M8 2.8v3.4M16 2.8v3.4M3.5 9.5h17" />
    </svg>
  )
}

export function ListBulletSymbol({ className = 'w-5 h-5', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      <circle cx="4.8" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.8" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.8" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function GitHubGlyphSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function LinkedInGlyphSymbol({ className = 'w-4 h-4', size }: SFSymbolProps) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}
