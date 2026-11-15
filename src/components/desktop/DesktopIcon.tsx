'use client'

import Image from 'next/image'
import { getAppleIcon } from '../shared/AppleIcons'

interface DesktopIconProps {
  id: string
  icon?: React.ReactNode
  image?: string
  label: string
  onClick: () => void
  isSelected?: boolean
}

export default function DesktopIcon({ id, image, label, onClick, isSelected }: DesktopIconProps) {
  const handleDoubleClick = () => {
    onClick()
  }

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-2 transition-transform duration-200">
        {image ? (
          <Image
            src={image}
            alt={label}
            width={64}
            height={64}
            className="profile-photo-small rounded-[22%] shadow-lg shadow-black/25"
          />
        ) : (
          getAppleIcon(id, 64)
        )}
      </div>
      <div className="icon-label mt-1 text-[11px] font-medium tracking-wide drop-shadow-md text-white text-center">
        {label}
      </div>
    </div>
  )
}
