'use client'

import dynamic from 'next/dynamic'

const ResponsiveOS = dynamic(() => import('@/components/shared/ResponsiveOS'), {
  ssr: false,
})

export default function ResponsiveOSClient() {
  return <ResponsiveOS />
}
