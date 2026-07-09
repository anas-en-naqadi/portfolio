'use client'

import dynamic from 'next/dynamic'

// Dynamically import ResponsiveOS to avoid SSR issues with window/drag
const ResponsiveOS = dynamic(() => import('@/components/shared/ResponsiveOS'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <ResponsiveOS />
    </main>
  )
}

