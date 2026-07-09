import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const currentDate = new Date()
  
  // Generate sitemap entries for all locales
  const locales = routing.locales
  const entries: MetadataRoute.Sitemap = []

  // Add homepage for each locale (highest priority)
  locales.forEach((locale) => {
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    })
  })

  // Note: Since this is a single-page portfolio app, we focus on locale-specific homepages
  // If you add more pages later, add them here with locale prefixes

  return entries
}


