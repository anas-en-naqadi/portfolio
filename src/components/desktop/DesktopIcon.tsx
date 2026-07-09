'use client'

import Image from 'next/image'

interface DesktopIconProps {
  icon?: string
  image?: string
  label: string
  onClick: () => void
  isSelected?: boolean
}

export default function DesktopIcon({ icon, image, label, onClick, isSelected }: DesktopIconProps) {
  const handleDoubleClick = () => {
    onClick()
  }

  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      <div className="icon-wrapper">
        {image ? (
          <Image
            src={image}
            alt={label}
            width={64}
            height={64}
            className="profile-photo-small"
          />
        ) : (
          <span>{icon}</span>
        )}
      </div>
      <div className="icon-label">{label}</div>
    </div>
  )
}

