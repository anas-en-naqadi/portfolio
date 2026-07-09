// TypeScript type definitions

export interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  impact?: string
  link?: string
  github?: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
}


