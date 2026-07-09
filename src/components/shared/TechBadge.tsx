'use client'

interface TechBadgeProps {
  children: React.ReactNode
  className?: string
}

export default function TechBadge({ children, className = '' }: TechBadgeProps) {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-primary to-primary-dark text-white px-3.5 py-1.5 rounded-full text-xs font-semibold mr-2 mb-2 ${className}`}
    >
      {children}
    </span>
  )
}

