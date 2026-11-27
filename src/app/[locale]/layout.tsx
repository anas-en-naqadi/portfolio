import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { routing } from '@/i18n/routing'
import { personalInfo, socialLinks } from '@/lib/data'
import {
  buildPortfolioJsonLd,
  getLocaleAlternates,
  getPortfolioSeoCopy,
  getSiteUrl,
  resolveSeoLocale,
  type SupportedSeoLocale,
} from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0f1d' },
  ],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  const safeLocale = resolveSeoLocale(locale)
  const siteUrl = getSiteUrl()
  const copy = getPortfolioSeoCopy(safeLocale)
  const currentUrl = `${siteUrl}/${safeLocale}`
  const ogImageUrl = `${siteUrl}/api/og?locale=${safeLocale}`

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: copy.title,
      template: `%s | ${personalInfo.name}`,
    },
    description: copy.description,
    keywords: copy.keywords,
    authors: [{ name: personalInfo.name, url: socialLinks.linkedin }],
    creator: personalInfo.name,
    publisher: personalInfo.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: getLocaleAlternates(siteUrl),
    },
    openGraph: {
      type: 'website',
      locale: safeLocale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: safeLocale === 'fr' ? ['en_US'] : ['fr_FR'],
      url: currentUrl,
      title: copy.title,
      description: copy.description,
      siteName: copy.siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${personalInfo.name} — ${copy.jobTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: [
        {
          url: ogImageUrl,
          alt: `${personalInfo.name} — ${copy.jobTitle}`,
        },
      ],
    },
    category: 'technology',
    classification: 'Portfolio',
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/images/favicon.webp', sizes: '64x64', type: 'image/webp' },
        { url: '/images/me.webp', sizes: '512x512', type: 'image/webp' },
      ],
      apple: [{ url: '/images/me.webp', sizes: '180x180', type: 'image/webp' }],
    },
    other: {
      'geo.region': 'MA',
      'geo.placename': personalInfo.location,
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  if (!routing.locales.includes(locale as SupportedSeoLocale)) {
    notFound()
  }

  const messages = await getMessages()
  const jsonLd = buildPortfolioJsonLd(locale)

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');var theme=t==='light'?'light':'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(theme);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-[#0c0f1d] text-gray-900 dark:text-white`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
