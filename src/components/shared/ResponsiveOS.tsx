'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const DesktopOS = dynamic(() => import('../desktop/DesktopOS'), { ssr: false })
const MobileOS = dynamic(() => import('../mobile/MobileOS'), { ssr: false })
const TabletOS = dynamic(() => import('../tablet/TabletOS'), { ssr: false })

export default function ResponsiveOS() {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      if (width <= 440) {
        setDeviceType('mobile')
      } else if (width <= 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  if (deviceType === 'mobile') {
    return <MobileOS />
  }

  if (deviceType === 'tablet') {
    return <TabletOS />
  }

  // Desktop uses DesktopOS
  return <DesktopOS />
}

