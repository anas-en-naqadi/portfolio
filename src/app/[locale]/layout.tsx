import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { personalInfo, socialLinks } from '@/lib/data'
import '../../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Get base URL from environment variable or use default
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

// SEO metadata translations
const metadataTranslations: Record<string, {
  title: string
  description: string
  keywords: string
}> = {
  en: {
    title: `${personalInfo.name} - Full-Stack Developer | Vue.js • React.js • Laravel Specialist`,
    description: `Portfolio of ${personalInfo.name}, Full-Stack Developer specializing in Vue.js, React.js, Laravel, Next.js, and Express.js. Expert in building modern web applications, RESTful APIs, and scalable solutions. Based in ${personalInfo.location}.`,
    keywords: 'Full-Stack Developer, Vue.js Developer, React.js Developer, Laravel Developer, Next.js Developer, Web Developer, JavaScript Developer, TypeScript Developer, Portfolio, ANAS EN-NAQADI, Morocco Developer, Frontend Developer, Backend Developer, Node.js, Express.js, PostgreSQL, MySQL, MongoDB, RESTful API, Web Development, Software Engineer',
  },
  fr: {
    title: `${personalInfo.name} - Développeur Full-Stack | Spécialiste Vue.js • React.js • Laravel`,
    description: `Portfolio de ${personalInfo.name}, Développeur Full-Stack spécialisé en Vue.js, React.js, Laravel, Next.js et Express.js. Expert en développement d'applications web modernes, API RESTful et solutions évolutives. Basé à ${personalInfo.location}.`,
    keywords: 'Développeur Full-Stack, Développeur Vue.js, Développeur React.js, Développeur Laravel, Développeur Next.js, Développeur Web, Développeur JavaScript, Développeur TypeScript, Portfolio, ANAS EN-NAQADI, Développeur Maroc, Développeur Frontend, Développeur Backend, Node.js, Express.js, PostgreSQL, MySQL, MongoDB, API RESTful, Développement Web, Ingénieur Logiciel',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = metadataTranslations[locale] || metadataTranslations.en
  const currentUrl = `${baseUrl}/${locale}`
  
  // Generate alternate language links
  const alternates = {
    canonical: currentUrl,
    languages: {
      'en': `${baseUrl}/en`,
      'fr': `${baseUrl}/fr`,
    },
  }

  return {
    title: {
      default: meta.title,
      template: `%s | ${personalInfo.name}`,
    },
    description: meta.description,
    keywords: meta.keywords.split(', '),
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
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_FR' : 'en_US',
      url: currentUrl,
      title: meta.title,
      description: meta.description,
      siteName: `${personalInfo.name} - Portfolio`,
      images: [
        {
          url: `${baseUrl}${personalInfo.profileImage}`,
          width: 1200,
          height: 630,
          alt: `${personalInfo.name} - ${personalInfo.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}${personalInfo.profileImage}`],
      creator: socialLinks.github,
    },
    alternates,
    metadataBase: new URL(baseUrl),
    category: 'technology',
    classification: 'Portfolio',
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: personalInfo.profileImage, sizes: '192x192', type: 'image/png' },
        { url: personalInfo.profileImage, sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: personalInfo.profileImage, sizes: '180x180', type: 'image/png' },
      ],
    },
    other: {
      'geo.region': 'MA',
      'geo.placename': personalInfo.location,
      'contact': personalInfo.email,
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'theme-color': '#7877c6',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()
  const currentUrl = `${baseUrl}/${locale}`

  // JSON-LD Structured Data for Person/Portfolio
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: metadataTranslations[locale]?.description || metadataTranslations.en.description,
    url: currentUrl,
    image: `${baseUrl}${personalInfo.profileImage}`,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location,
      addressCountry: 'MA',
    },
    sameAs: [
      socialLinks.linkedin,
      socialLinks.github,
    ],
    knowsAbout: [
      'Full-Stack Development',
      'Vue.js',
      'React.js',
      'Laravel',
      'Next.js',
      'Express.js',
      'TypeScript',
      'JavaScript',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'RESTful API',
      'Web Development',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Faculté Polytechnique de Sidi Bennour',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');var theme=t==='light'?'light':'dark';var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(theme);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

