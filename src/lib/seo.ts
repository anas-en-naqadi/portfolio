import { getLocalizedPortfolioData, personalInfo, socialLinks } from '@/lib/data'
import { routing } from '@/i18n/routing'

export type SupportedSeoLocale = 'en' | 'fr'

const PLACEHOLDER_URL = 'https://yourdomain.com'

function normalizeOrigin(rawUrl: string): string {
  const trimmed = rawUrl.trim().replace(/\/+$/, '')
  if (!trimmed) return PLACEHOLDER_URL
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

/**
 * Resolves the canonical public origin for metadata, sitemaps, and JSON-LD.
 * Prefers an explicit non-placeholder NEXT_PUBLIC_SITE_URL, then Vercel runtime URLs.
 */
export function getSiteUrl(): string {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicitUrl && normalizeOrigin(explicitUrl) !== PLACEHOLDER_URL) {
    return normalizeOrigin(explicitUrl)
  }

  const vercelProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercelProdUrl) {
    return normalizeOrigin(vercelProdUrl)
  }

  const vercelPreviewUrl = process.env.VERCEL_URL?.trim()
  if (vercelPreviewUrl) {
    return normalizeOrigin(vercelPreviewUrl)
  }

  return PLACEHOLDER_URL
}

export function resolveSeoLocale(locale: string): SupportedSeoLocale {
  return locale === 'fr' ? 'fr' : 'en'
}

export interface PortfolioSeoCopy {
  title: string
  siteName: string
  description: string
  jobTitle: string
  keywords: string[]
  ogTagline: string
  ogLocation: string
  ogBadges: string[]
}

const SEO_COPY: Record<SupportedSeoLocale, PortfolioSeoCopy> = {
  en: {
    title: 'ANAS EN-NAQADI | Full-Stack Developer & AI Engineer',
    siteName: 'ANAS EN-NAQADI — Portfolio',
    description:
      'Portfolio of Anas En-Naqadi, Full-Stack Developer & AI Engineering student building production web, mobile, and LLM/ML applications with Next.js, React, FastAPI, PyTorch, and Laravel.',
    jobTitle: 'Full-Stack Developer & AI Engineer',
    keywords: [
      'Anas En-Naqadi',
      'ANAS EN-NAQADI',
      'Full-Stack Developer',
      'AI Engineer',
      'Next.js Developer',
      'React Developer',
      'FastAPI',
      'PyTorch',
      'LLM Engineering',
      'RAG',
      'CrewAI',
      'Laravel',
      'TypeScript',
      'React Native',
      'Morocco Software Engineer',
      'Portfolio',
    ],
    ogTagline: 'Full-Stack Web, Mobile & Applied AI Engineering',
    ogLocation: 'Marrakech, Morocco • Software & AI Engineering',
    ogBadges: ['Next.js / React', 'FastAPI / PyTorch', 'LLMs / CrewAI', 'Laravel / .NET'],
  },
  fr: {
    title: 'ANAS EN-NAQADI | Développeur Full-Stack & Ingénieur IA',
    siteName: 'ANAS EN-NAQADI — Portfolio',
    description:
      "Portfolio d'Anas En-Naqadi, Développeur Full-Stack & étudiant en Ingénierie IA. Applications web, mobiles et systèmes IA/LLM en production avec Next.js, React, FastAPI, PyTorch et Laravel.",
    jobTitle: 'Développeur Full-Stack & Ingénieur IA',
    keywords: [
      'Anas En-Naqadi',
      'ANAS EN-NAQADI',
      'Développeur Full-Stack',
      'Ingénieur IA',
      'Intelligence Artificielle',
      'Next.js',
      'React.js',
      'FastAPI',
      'PyTorch',
      'LLM',
      'CrewAI',
      'Laravel',
      'TypeScript',
      'React Native',
      'Maroc',
      'Portfolio',
    ],
    ogTagline: 'Développement Full-Stack Web, Mobile & Ingénierie IA',
    ogLocation: 'Marrakech, Maroc • Génie Logiciel & Intelligence Artificielle',
    ogBadges: ['Next.js / React', 'FastAPI / PyTorch', 'LLMs / CrewAI', 'Laravel / .NET'],
  },
}

export function getPortfolioSeoCopy(locale: string): PortfolioSeoCopy {
  return SEO_COPY[resolveSeoLocale(locale)]
}

export function getLocaleAlternates(siteUrl: string): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])
  )
  languages['x-default'] = `${siteUrl}/${routing.defaultLocale}`
  return languages
}

/**
 * Generates structured Schema.org JSON-LD graph for search engines and AI assistants.
 */
export function buildPortfolioJsonLd(locale: string): Record<string, unknown> {
  const safeLocale = resolveSeoLocale(locale)
  const siteUrl = getSiteUrl()
  const canonicalUrl = `${siteUrl}/${safeLocale}`
  const copy = getPortfolioSeoCopy(safeLocale)
  const portfolio = getLocalizedPortfolioData(safeLocale)

  const websiteId = `${siteUrl}#website`
  const personId = `${siteUrl}#person`
  const profileId = `${canonicalUrl}#profile`
  const projectsListId = `${canonicalUrl}#projects`

  const knowsAbout = Array.from(
    new Set([
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'LLMs',
      'RAG',
      'FastAPI',
      'CrewAI',
      ...portfolio.skills.languages,
      ...portfolio.skills.frameworks,
      ...portfolio.skills.libraries,
      ...portfolio.skills.databases,
      ...portfolio.skills.tools,
    ])
  )

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: copy.siteName,
        inLanguage: [...routing.locales],
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': profileId,
        url: canonicalUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: safeLocale,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        hasPart: { '@id': projectsListId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: personalInfo.name,
        alternateName: 'Anas En-Naqadi',
        url: canonicalUrl,
        image: `${siteUrl}${personalInfo.profileImage}`,
        email: `mailto:${personalInfo.email}`,
        jobTitle: copy.jobTitle,
        description: copy.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Marrakech',
          addressCountry: 'MA',
        },
        nationality: {
          '@type': 'Country',
          name: 'Morocco',
        },
        alumniOf: portfolio.education.slice(0, 3).map((edu) => ({
          '@type': 'EducationalOrganization',
          name: edu.institution,
          address: {
            '@type': 'PostalAddress',
            addressLocality: edu.city,
            addressCountry: 'MA',
          },
        })),
        knowsAbout,
        sameAs: [socialLinks.github, socialLinks.linkedin].filter(Boolean),
      },
      {
        '@type': 'ItemList',
        '@id': projectsListId,
        name: safeLocale === 'fr' ? 'Projets Phares' : 'Featured Projects',
        itemListElement: portfolio.projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: project.title,
            description: project.description,
            programmingLanguage: project.technologies,
            image: `${siteUrl}${project.image}`,
            author: { '@id': personId },
          },
        })),
      },
    ],
  }
}
