'use client'

import Image from 'next/image'
import { getAppleIcon } from '../shared/AppleIcons'

interface DesktopIconProps {
  id: string
  icon?: string
  image?: string
  label: string
  onClick: () => void
  isSelected?: boolean
}

export default function DesktopIcon({ id, icon, image, label, onClick, isSelected }: DesktopIconProps) {
  const handleDoubleClick = () => {
    onClick()
  }

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      <div className="icon-wrapper bg-transparent shadow-none after:display-none">
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
