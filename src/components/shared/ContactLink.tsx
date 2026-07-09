'use client'

import Link from 'next/link'

interface ContactLinkProps {
  href: string
  icon: string
  title: string
  subtitle: string
  external?: boolean
}

export default function ContactLink({ href, icon, title, subtitle, external = false }: ContactLinkProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  const LinkComponent = external ? 'a' : Link
  const linkHref = external ? { href } : { href }

  return (
    <LinkComponent
      {...linkHref}
      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-3 no-underline text-gray-800 transition-all hover:bg-gray-100 hover:translate-x-1"
      {...linkProps}
    >
      <div className="text-2xl">{icon}</div>
      <div>
        <strong className="block">{title}</strong>
        <span className="text-primary text-sm">{subtitle}</span>
      </div>
    </LinkComponent>
  )
}

