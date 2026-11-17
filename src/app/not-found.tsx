import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppleNotFound } from '@/components/shared/AppleNotFound'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '404 — Not Found | ANAS EN-NAQADI',
  robots: { index: false, follow: false },
}

export default function RootNotFoundPage() {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');var theme=t==='light'?'light':'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(theme);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AppleNotFound defaultLocale="en" />
      </body>
    </html>
  )
}
