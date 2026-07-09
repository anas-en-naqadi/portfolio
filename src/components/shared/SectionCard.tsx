'use client'

interface SectionCardProps {
  children: React.ReactNode
  className?: string
  borderColor?: string
}

export default function SectionCard({ children, className = '', borderColor }: SectionCardProps) {
  const borderStyle = borderColor ? { borderLeftColor: borderColor } : {}
  
  return (
    <div
      className={`bg-gray-50 p-5 rounded-xl mb-5 border border-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-md ${className}`}
      style={borderColor ? { borderLeft: `4px solid ${borderColor}`, ...borderStyle } : {}}
    >
      {children}
    </div>
  )
}

