'use client'

import dynamic from 'next/dynamic'

// Dynamically import DesktopOS to avoid SSR issues with window/drag
const DesktopOS = dynamic(() => import('@/components/desktop/DesktopOS'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <DesktopOS />
    </main>
  )
}

