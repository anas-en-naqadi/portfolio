import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import ResponsiveOSClient from '@/components/shared/ResponsiveOSClient'
import { getLocalizedPortfolioData, socialLinks } from '@/lib/data'
import { getPortfolioSeoCopy, resolveSeoLocale } from '@/lib/seo'

export default async function Home() {
  const rawLocale = await getLocale()
  const locale = resolveSeoLocale(rawLocale)
  const portfolio = getLocalizedPortfolioData(locale)
  const seoCopy = getPortfolioSeoCopy(locale)
  const isFr = locale === 'fr'

  return (
    <main className="h-screen h-[100dvh] overflow-hidden">
      <ResponsiveOSClient />

      {/* Server-rendered semantic outline so search engines and screen readers index full portfolio content */}
      <article className="sr-only">
        <header>
          <h1>
            {portfolio.personalInfo.name} — {seoCopy.jobTitle}
          </h1>
          <p>{seoCopy.description}</p>
          <p>{portfolio.personalInfo.subtitle}</p>
          <p>
            {portfolio.personalInfo.location} · {portfolio.personalInfo.email}
          </p>
          <nav aria-label={isFr ? 'Navigation et liens' : 'Navigation and links'}>
            <ul>
              <li>
                <Link href="/en">English Version</Link>
              </li>
              <li>
                <Link href="/fr">Version Française</Link>
              </li>
              <li>
                <a href={socialLinks.github} rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href={socialLinks.linkedin} rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={portfolio.personalInfo.cvPaths[locale]}>
                  {isFr ? 'Télécharger le CV (PDF)' : 'Download Resume (PDF)'}
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <section>
          <h2>{isFr ? 'Expériences Professionnelles' : 'Professional Experience'}</h2>
          <ul>
            {portfolio.experiences.map((exp, idx) => (
              <li key={`${exp.company}-${idx}`}>
                <h3>
                  {exp.title} — {exp.company}
                </h3>
                <p>
                  {exp.period} · {exp.location}
                </p>
                <ul>
                  {exp.description.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                <p>{exp.technologies.join(', ')}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{isFr ? 'Projets Phares' : 'Featured Projects'}</h2>
          <ul>
            {portfolio.projects.map((project, idx) => (
              <li key={`${project.title}-${idx}`}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>{project.technologies.join(', ')}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{isFr ? 'Compétences Techniques' : 'Technical Skills'}</h2>
          <ul>
            <li>{isFr ? 'Langages' : 'Languages'}: {portfolio.skills.languages.join(', ')}</li>
            <li>Frameworks: {portfolio.skills.frameworks.join(', ')}</li>
            <li>{isFr ? 'Bibliothèques' : 'Libraries'}: {portfolio.skills.libraries.join(', ')}</li>
            <li>{isFr ? 'Bases de données' : 'Databases'}: {portfolio.skills.databases.join(', ')}</li>
            <li>{isFr ? 'Méthodologies' : 'Methodologies'}: {portfolio.skills.methodologies.join(', ')}</li>
            <li>{isFr ? 'Outils' : 'Tools'}: {portfolio.skills.tools.join(', ')}</li>
          </ul>
        </section>

        <section>
          <h2>{isFr ? 'Formation' : 'Education'}</h2>
          <ul>
            {portfolio.education.map((edu, idx) => (
              <li key={`${edu.institution}-${idx}`}>
                <h3>{edu.degree}</h3>
                <p>
                  {edu.institution} ({edu.city}) · {edu.period}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  )
}
