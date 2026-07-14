// Real data extracted from CV-PRO.pdf - ANAS EN-NAQADI

export const personalInfo = {
  name: 'ANAS EN-NAQADI',
  title: 'Développeur Full-Stack & AI Engineer',
  subtitle: 'React • Next.js • Vue.js • FastAPI • Laravel Specialist',
  location: 'Marrakech, Maroc',
  email: 'anas.ennaqadi0@gmail.com',
  phone: '+212 628540272',
  timezone: 'GMT+1',
  profileImage: '/images/me.png',
  cvPath: '/CV-PRO.pdf',
}

export const socialLinks = {
  github: 'https://github.com/anas-en-naqadi',
  linkedin: 'https://www.linkedin.com/in/anas-en-naqadi/',
}

export const education = [
  {
    degree: 'Master en Intelligence Artificielle et Ingénierie Informatique',
    period: '2025 - 2027',
    institution: 'Faculté des Sciences et Techniques (FSTG)',
    city: 'Marrakech'
  },
  {
    degree: 'Licence Professionnelle Informatique et Mathématiques Appliquées',
    period: '2024 - 2025',
    institution: 'Faculté Polydisciplinaire (FPSB)',
    city: 'El Jadida'
  },
  {
    degree: 'Diplôme Universitaire de Technologie Génie Informatique',
    period: '2022 - 2024',
    institution: 'École Supérieure de Technologie (ESTSB)',
    city: 'Sidi Bennour'
  },
  {
    degree: 'Baccalauréat en Sciences Physiques',
    period: '2022',
    institution: 'Lycée El Qods',
    city: 'El Jadida'
  },
]

export const experiences = [
  {
    title: 'FullStack Developer | Freelance',
    company: 'Melodia',
    location: 'Canada (Remote)',
    period: 'Janvier 2026 - Mars 2026',
    description: [
      'Audit & QA end-to-end multi-rôles (Artist, Agent, Station, Admin) : correction de bugs critiques, APIs défaillantes et comportements illogiques.',
      'Implémentation UX production-ready : spinners contextuels, toasts de statut, Optimistic UI avec rollback et gestion d\'erreurs normalisée sur l\'ensemble de l\'application.',
      'Optimisation full-stack : résolution N+1, pagination serveur, internationalisation complète EN/FR et sécurisation JWT/RBAC.',
      'Déploiement CI/CD sur Microsoft Azure via GitHub Actions (frontend & backend) avec monitoring Application Insights.'
    ],
    technologies: ['React.js', '.NET / C#', 'Microsoft Azure', 'MySQL', 'GitHub Actions', 'Testing and Debugging', 'JavaScript'],
  },
  {
    title: 'FullStack Developer | Freelance',
    company: '3ommy',
    location: 'Rabat, Maroc (Remote)',
    period: 'Septembre 2025 - Janvier 2026',
    description: [
      'Mise en production d\'une app cross-platform (Web, iOS, Android) avec tests QA end-to-end et validation des workflows métier.',
      'Développement frontend : nouvelles interfaces, intégration APIs REST, responsive mobile-first et optimisation des performances.',
      'Conception et correction d\'APIs RESTful avec Supabase (PostgreSQL) : endpoints, refactor métier, sécurisation JWT/RLS et Edge Functions.',
      'Refactorisation architecture (maintenabilité, scalabilité), résolution de bugs critiques en production et travail en méthodologie Agile/Scrum.'
    ],
    technologies: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'TypeScript', 'Testing and Debugging', 'Agile'],
  },
  {
    title: 'FullStack Developer | Stage PFE',
    company: 'GRANDE CHARTE Inc',
    location: 'El Jadida, Maroc',
    period: 'Avril 2025 - Juin 2025',
    description: [
      'Conception et développement d’une plateforme e‑learning interne : système d’authentification sécurisé (JWT), gestion fine des rôles et permissions, suivi des logs, notifications et envoi d’emails, renforcement de la sécurité backend et intégration des pages frontend.',
      'Qualification et stabilité : rédaction de tests unitaires et d’intégration, identification et correction des anomalies jusqu’à la mise en production et déploiement sur un VPS à zéro.'
    ],
    technologies: ['Node.js', 'Express.js', 'Next.js', 'React.js', 'PostgreSQL', 'TypeScript', 'TailwindCss', 'VPS', 'Testing and Debugging'],
  },
  {
    title: 'FullStack Developer | Stage PFE',
    company: 'OCP MAINTENANCE SOLUTIONS',
    location: 'Jorf Lasfar, Maroc',
    period: 'Avril 2024 - Mai 2024',
    description: [
      'Conception, Développement et intégration de nouvelles fonctionnalités dans une application web de gestion des accès (suivi des logs d\'accès et d\'activité, gestion des tableaux de bord, support, badges, etc.).',
      'Test de l\'application pour garantir son bon fonctionnement. Identification et correction des bugs.'
    ],
    technologies: ['Laravel', 'Vue.js', 'SQL', 'Jira', 'GitLab', 'Bootstrap', 'Git', 'Testing and Debugging', 'Clean Code'],
  },
  {
    title: 'Junior Developer | Stage Initiation',
    company: 'OCP/DSI',
    location: 'Jorf Lasfar, Maroc',
    period: 'Juillet 2023 - Août 2023',
    description: [
      'Conception et développement d\'applications web.',
      'Création d’une solution pour la génération automatisée des factures.',
      'Optimisation des fonctionnalités pour améliorer l\'expérience utilisateur.'
    ],
    technologies: ['HTML', 'CSS', 'JS', 'PHP', 'SQL', 'MYSQL'],
  },
]

export const projects = [
  {
    title: "Diagnostic Radiographique IA",
    description: "Système de diagnostic et d'analyse automatique d'images radiographiques thoraciques utilisant l'architecture EfficientNet et PyTorch.",
    technologies: ["Python", "FastAPI", "PyTorch", "EfficientNet", "Deep Learning"],
    type: "web",
    image: "/images/projects/radiography_ai.png"
  },
  {
    title: "Prédiction du Cancer du Côlon",
    description: "Modèle de prédiction médicale basé sur l'apprentissage automatique (Scikit-Learn) pour la détection précoce du cancer du côlon.",
    technologies: ["Python", "FastAPI", "React", "Scikit-Learn", "Machine Learning"],
    type: "web",
    image: "/images/projects/colon_cancer_prediction.png"
  },
  {
    title: "Code Review Automatisé par IA",
    description: "Application d'audit et de révision de code automatique s'appuyant sur des LLMs via Groq pour détecter des vulnérabilités de sécurité.",
    technologies: ["Next.js", "TypeScript", "Groq", "LlamaIndex", "AI"],
    type: "web",
    image: "/images/projects/code_review_ai.png"
  },
  {
    title: "Assistant de Recherche Doctorale",
    description: "Outil d'intelligence artificielle pour la recherche bibliographique automatisée et la synthèse documentaire structurée.",
    technologies: ["Python", "Streamlit", "CrewAI", "Groq", "LLMs"],
    type: "web",
    image: "/images/projects/phd_research_assistant.png"
  },
  {
    title: "Orchestrateur d'Agents IA",
    description: "Plateforme complète d'orchestration d'agents autonomes à rôles multiples avec CrewAI pour l'automatisation de tâches complexes.",
    technologies: ["Next.js", "FastAPI", "CrewAI", "Groq", "Python"],
    type: "web",
    image: "/images/projects/agents_orchestrator.png"
  },
  {
    title: "Générateur d'APIs REST par IA",
    description: "Générateur d'interfaces d'API documentées et sécurisées à la volée à l'aide de modèles d'IA générative.",
    technologies: ["React", "Fastify", "TypeScript", "Groq", "FastAPI"],
    type: "web",
    image: "/images/projects/rest_api_generator.png"
  },
  {
    title: "Application Mobile pour les Animes",
    description: "Application mobile de streaming et d'informations animées cross-platform avec gestion hors ligne et favoris.",
    technologies: ["React Native", "Expo", "Firebase", "Mobile"],
    type: "mobile",
    image: "/images/projects/anime_mobile_app.png"
  },
  {
    title: "Flux Optique: LK vs HS",
    description: "Comparateur de flux optique de vision par ordinateur comparant les approches de Lucas-Kanade et Horn-Schunck.",
    technologies: ["Python", "OpenCV", "Streamlit", "Computer Vision"],
    type: "web",
    image: "/images/projects/optical_flow_comparison.png"
  },
  {
    title: "Plateforme E-Learning",
    description: "Solution complète d'e-learning sécurisée par JWT, avec gestion robuste de rôles/permissions et suivi des logs.",
    technologies: ["Node.js", "Express.js", "Next.js", "React.js", "PostgreSQL"],
    type: "web",
    image: "/images/projects/elearning_platform.png"
  },
  {
    title: "Application de Gestion des Accès",
    description: "Système de contrôle et de suivi d'accès physique et numérique intégrant des logs et des tableaux de bord.",
    technologies: ["Laravel", "Vue.js", "SQL", "Bootstrap", "Git"],
    type: "web",
    image: "/images/projects/access_management.png"
  }
]

export const skills = {
  languages: ['HTML', 'CSS', 'PHP', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Python'],
  frameworks: ['Vue.js', 'React.js', 'Laravel', 'Express.js', 'Next.js', 'React-Native', 'TensorFlow', 'PyTorch'],
  libraries: ['Vuex', 'Redux Toolkit', 'PrimeVue', 'Material UI', 'Chart.js'],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
  methodologies: ['Agile Scrum', 'Modèle MVC2', 'UML'],
  tools: ['Git (GitHub, GitLab)', 'Expo', 'Jira', 'Figma', 'Docker', 'Networking', 'Azure Cloud', 'Github Actions'],
  languages_spoken: [
    { language: 'Arabic', level: 'Native' },
    { language: 'French', level: 'Current' },
    { language: 'English', level: 'Current' },
  ],
}


