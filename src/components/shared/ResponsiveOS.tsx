'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const DesktopOS = dynamic(() => import('../desktop/DesktopOS'), { ssr: false })
const MobileOS = dynamic(() => import('../mobile/MobileOS'), { ssr: false })

export default function ResponsiveOS() {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType('mobile')
      } else if (width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  // Mobile and tablet both use MobileOS interface
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return <MobileOS />
  }

  // Desktop uses DesktopOS
  return <DesktopOS />
}

