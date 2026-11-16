import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { getLocaleAlternates, getSiteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const currentDate = new Date()
  const languages = getLocaleAlternates(baseUrl)

  return routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages,
    },
  }))
}
