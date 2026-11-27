// Real data extracted from CV-PRO.pdf - ANAS EN-NAQADI

export const personalInfo = {
  name: 'ANAS EN-NAQADI',
  title: 'Développeur Full-Stack & Ingénieur IA',
  subtitle: 'Spécialiste React • Next.js • Vue.js • FastAPI • Laravel',
  location: 'Marrakech, Maroc',
  email: 'anas.ennaqadi0@gmail.com',
  phone: '+212 628540272',
  timezone: 'GMT+0',
  profileImage: '/images/me.webp',
  cvPath: '/Anas-En-Naqadi-CV-FR.pdf',
  cvPaths: {
    en: '/ANAS-EN-NAQADI-CV-EN.pdf',
    fr: '/Anas-En-Naqadi-CV-FR.pdf',
  },
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
    title: 'Ingénieur IA | Freelance',
    company: 'Melodia AI',
    location: 'Canada (À distance)',
    period: 'Juin 2026 - Septembre 2026',
    description: [
      'Conception et construction de l\'IA de matching : architecture conçue de A à Z du moteur central de recommandation multi-critères (scoring audio, métadonnées, popularité) évaluant l\'affinité Titre/Station avec génération dynamique de justifications.',
      'Pipeline automatisé d\'extraction audio et profilage : analyse asynchrone de plus de 35 features acoustiques, spectrales et émotionnelles (MFCCs, valence, instruments) via l\'intégration de Librosa et Essentia-TensorFlow.',
      'Scores et Batch : génération de centroïdes audio et calcul de distributions statistiques sur l\'historique de diffusion, incluant une gestion algorithmique des démarrages à froid.',
    ],
    technologies: ['Microsoft Azure', 'Python', 'Matching IA', 'Tests & Débogage', 'Docker', 'Microservices', 'GitHub Actions (CI/CD)'],
  },
  {
    title: 'Développeur Full-Stack | Freelance',
    company: 'Melodia',
    location: 'Canada (À distance)',
    period: 'Janvier 2026 - Mars 2026',
    description: [
      'Audit & QA end-to-end multi-rôles (Artist, Agent, Station, Admin) : correction de bugs critiques, APIs défaillantes et comportements illogiques.',
      'Implémentation UX production-ready : spinners contextuels, toasts de statut, Optimistic UI avec rollback et gestion d\'erreurs normalisée sur l\'ensemble de l\'application.',
      'Optimisation full-stack : résolution N+1, pagination serveur, internationalisation complète EN/FR et sécurisation JWT/RBAC.',
      'Déploiement CI/CD sur Microsoft Azure via GitHub Actions (frontend & backend) avec monitoring Application Insights.'
    ],
    technologies: ['React.js', '.NET / C#', 'Microsoft Azure', 'MySQL', 'GitHub Actions', 'Tests & Débogage', 'JavaScript'],
  },
  {
    title: 'Développeur Full-Stack | Freelance',
    company: '3ommy',
    location: 'Rabat, Maroc (À distance)',
    period: 'Septembre 2025 - Janvier 2026',
    description: [
      'Mise en production d\'une app cross-platform (Web, iOS, Android) avec tests QA end-to-end et validation des workflows métier.',
      'Développement frontend : nouvelles interfaces, intégration APIs REST, responsive mobile-first et optimisation des performances.',
      'Conception et correction d\'APIs RESTful avec Supabase (PostgreSQL) : endpoints, refactor métier, sécurisation JWT/RLS et Edge Functions.',
      'Refactorisation architecture (maintenabilité, scalabilité), résolution de bugs critiques en production et travail en méthodologie Agile/Scrum.'
    ],
    technologies: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'TypeScript', 'Tests & Débogage', 'Agile'],
  },
  {
    title: 'Développeur Full-Stack | Stage PFE',
    company: 'GRANDE CHARTE Inc',
    location: 'El Jadida, Maroc',
    period: 'Avril 2025 - Juin 2025',
    description: [
      'Conception et développement d’une plateforme e‑learning interne : système d’authentification sécurisé (JWT), gestion fine des rôles et permissions, suivi des logs, notifications et envoi d’emails, renforcement de la sécurité backend et intégration des pages frontend.',
      'Qualification et stabilité : rédaction de tests unitaires et d’intégration, identification et correction des anomalies jusqu’à la mise en production et déploiement complet sur un VPS.'
    ],
    technologies: ['Node.js', 'Express.js', 'Next.js', 'React.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'VPS', 'Tests & Débogage'],
  },
  {
    title: 'Développeur Full-Stack | Stage PFE',
    company: 'OCP MAINTENANCE SOLUTIONS',
    location: 'Jorf Lasfar, Maroc',
    period: 'Avril 2024 - Mai 2024',
    description: [
      'Conception, développement et intégration de nouvelles fonctionnalités dans une application web de gestion des accès (suivi des logs d\'accès et d\'activité, gestion des tableaux de bord, support, badges, etc.).',
      'Test de l\'application pour garantir son bon fonctionnement. Identification et correction des bugs.'
    ],
    technologies: ['Laravel', 'Vue.js', 'SQL', 'Jira', 'GitLab', 'Bootstrap', 'Git', 'Tests & Débogage', 'Clean Code'],
  },
  {
    title: 'Développeur Junior | Stage d\'initiation',
    company: 'OCP/DSI',
    location: 'Jorf Lasfar, Maroc',
    period: 'Juillet 2023 - Août 2023',
    description: [
      'Conception et développement d\'applications web.',
      'Création d’une solution pour la génération automatisée des factures.',
      'Optimisation des fonctionnalités pour améliorer l\'expérience utilisateur.'
    ],
    technologies: ['HTML', 'CSS', 'JS', 'PHP', 'SQL', 'MySQL'],
  },
]

export interface PortfolioProject {
  title: string
  description: string
  technologies: string[]
  type: 'ai' | 'web' | 'mobile'
  image: string
  isFreelance?: boolean
  liveUrl?: string
}

export const projects: PortfolioProject[] = [
  {
    title: "GAP-TECH — Aides Gouvernementales & Financement",
    description: "Site vitrine haute conversion pour une firme canadienne (Laval, Québec) spécialisée en aides gouvernementales, subventions, financement adapté et innovation technologique : 5 piliers thématiques, navigation sticky avec barre de progression dynamique, pré-sélection intelligente du formulaire Web3Forms et SEO structuré JSON-LD.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Web3Forms", "SEO"],
    type: "web",
    isFreelance: true,
    liveUrl: "https://gap-tech.ca/",
    image: "/images/projects/gap_tech.webp"
  },
  {
    title: "Melodia AI — Moteur de Matching Audio",
    description: "Moteur de recommandation IA multi-critères évaluant l'affinité Titre/Station avec pipeline d'extraction de 35+ features acoustiques (Librosa, Essentia-TensorFlow), gestion des démarrages à froid et justifications dynamiques.",
    technologies: ["Python", "Microsoft Azure", "Librosa", "Essentia-TensorFlow", "Docker", "Microservices"],
    type: "ai",
    isFreelance: true,
    image: "/images/projects/melodia_ai.webp"
  },
  {
    title: "Melodia — Plateforme Musicale & Radio",
    description: "Plateforme web multi-rôles (Artiste, Agent, Station, Admin) optimisée en production : UX réactive avec Optimistic UI, pagination serveur, sécurisation JWT/RBAC, internationalisation EN/FR et déploiement CI/CD sur Azure.",
    technologies: ["React.js", ".NET / C#", "Microsoft Azure", "MySQL", "GitHub Actions"],
    type: "web",
    isFreelance: true,
    image: "/images/projects/melodia_platform.webp"
  },
  {
    title: "3ommy — Location de Piscines",
    description: "Application cross-platform (Web, iOS, Android) de réservation et location de piscines privées, développée avec React Native, Expo et Supabase (PostgreSQL, Edge Functions, sécurité JWT/RLS).",
    technologies: ["React Native", "Expo", "Supabase", "PostgreSQL", "TypeScript"],
    type: "mobile",
    isFreelance: true,
    image: "/images/projects/3ommy_pool_rental.webp"
  },
  {
    title: "Diagnostic Radiographique IA",
    description: "Système de diagnostic et d'analyse automatique d'images radiographiques thoraciques utilisant l'architecture EfficientNet et PyTorch.",
    technologies: ["Python", "FastAPI", "PyTorch", "EfficientNet", "Deep Learning"],
    type: "ai",
    image: "/images/projects/radiography_ai.webp"
  },
  {
    title: "Prédiction du Cancer du Côlon",
    description: "Modèle de prédiction médicale basé sur l'apprentissage automatique (Scikit-learn) pour la détection précoce du cancer du côlon.",
    technologies: ["Python", "FastAPI", "React", "Scikit-learn", "Machine Learning"],
    type: "ai",
    image: "/images/projects/colon_cancer_prediction.webp"
  },
  {
    title: "Revue de Code Automatisée par IA",
    description: "Application d'audit et de révision de code automatique s'appuyant sur des LLMs via Groq pour détecter des vulnérabilités de sécurité.",
    technologies: ["Next.js", "TypeScript", "Groq", "LlamaIndex", "IA"],
    type: "ai",
    image: "/images/projects/code_review_ai.webp"
  },
  {
    title: "Assistant de Recherche Doctorale",
    description: "Outil d'intelligence artificielle pour la recherche bibliographique automatisée et la synthèse documentaire structurée.",
    technologies: ["Python", "Streamlit", "CrewAI", "Groq", "LLMs"],
    type: "ai",
    image: "/images/projects/phd_research_assistant.webp"
  },
  {
    title: "Orchestrateur d'Agents IA",
    description: "Plateforme complète d'orchestration d'agents autonomes à rôles multiples avec CrewAI pour l'automatisation de tâches complexes.",
    technologies: ["Next.js", "FastAPI", "CrewAI", "Groq", "Python"],
    type: "ai",
    image: "/images/projects/agents_orchestrator.webp"
  },
  {
    title: "Générateur d'APIs REST par IA",
    description: "Générateur d'interfaces d'API documentées et sécurisées à la volée à l'aide de modèles d'IA générative.",
    technologies: ["React", "Fastify", "TypeScript", "Groq", "FastAPI"],
    type: "ai",
    image: "/images/projects/rest_api_generator.webp"
  },
  {
    title: "Application Mobile pour les Animes",
    description: "Application mobile cross-platform de streaming et de catalogue d'animes, avec gestion hors ligne et favoris.",
    technologies: ["React Native", "Expo", "Firebase", "Mobile"],
    type: "mobile",
    image: "/images/projects/anime_mobile_app.webp"
  },
  {
    title: "Flux Optique: LK vs HS",
    description: "Comparateur de flux optique de vision par ordinateur comparant les approches de Lucas-Kanade et Horn-Schunck.",
    technologies: ["Python", "OpenCV", "Streamlit", "Computer Vision"],
    type: "ai",
    image: "/images/projects/optical_flow_comparison.webp"
  },
  {
    title: "Plateforme E-Learning",
    description: "Solution complète d'e-learning sécurisée par JWT, avec gestion fine des rôles et permissions et suivi des logs.",
    technologies: ["Node.js", "Express.js", "Next.js", "React.js", "PostgreSQL"],
    type: "web",
    image: "/images/projects/elearning_platform.webp"
  },
  {
    title: "Application de Gestion des Accès",
    description: "Système de contrôle et de suivi d'accès physique et numérique intégrant des logs et des tableaux de bord.",
    technologies: ["Laravel", "Vue.js", "SQL", "Bootstrap", "Git"],
    type: "web",
    image: "/images/projects/access_management.webp"
  }
]

export const skills = {
  languages: ['HTML', 'CSS', 'PHP', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Python'],
  frameworks: ['Vue.js', 'React.js', 'Next.js', 'React Native', 'Laravel', 'Node.js', 'Express.js', 'FastAPI', '.NET', 'TensorFlow', 'PyTorch'],
  libraries: ['Vuex', 'Redux Toolkit', 'PrimeVue', 'Material UI', 'Chart.js', 'Scikit-learn', 'OpenCV', 'CrewAI', 'Librosa', 'Essentia-TensorFlow'],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
  methodologies: ['Agile Scrum', 'Modèle MVC2', 'UML'],
  tools: ['Git (GitHub, GitLab)', 'GitHub Actions (CI/CD)', 'Docker', 'Microsoft Azure', 'Expo', 'Jira', 'Figma', 'Réseaux'],
  languages_spoken: [
    { language: 'Arabe', level: 'Langue maternelle' },
    { language: 'Français', level: 'Courant' },
    { language: 'Anglais', level: 'Courant' },
  ],
}

const englishData = {
  personalInfo: {
    ...personalInfo,
    title: 'Full-Stack Developer & AI Engineer',
    subtitle: 'React • Next.js • Vue.js • FastAPI • Laravel Specialist',
    location: 'Marrakech, Morocco',
  },
  education: [
    {
      degree: "Master's in Artificial Intelligence and Computer Engineering",
      period: '2025 - 2027',
      institution: 'Faculty of Sciences and Techniques (FSTG)',
      city: 'Marrakech',
    },
    {
      degree: 'Professional Bachelor in Computer Science and Applied Mathematics',
      period: '2024 - 2025',
      institution: 'Polydisciplinary Faculty (FPSB)',
      city: 'El Jadida',
    },
    {
      degree: 'University Diploma of Technology in Computer Engineering',
      period: '2022 - 2024',
      institution: 'Higher School of Technology (ESTSB)',
      city: 'Sidi Bennour',
    },
    {
      degree: 'Baccalaureate in Physical Sciences',
      period: '2022',
      institution: 'El Qods High School',
      city: 'El Jadida',
    },
  ],
  experiences: [
    {
      title: 'AI Engineer | Freelance',
      company: 'Melodia AI',
      location: 'Canada (Remote)',
      period: 'June 2026 - September 2026',
      description: [
        'Designed and built the matching AI: architected from scratch the core multi-criteria recommendation engine (audio scoring, metadata, popularity) evaluating Track/Station affinity with dynamic justification generation.',
        'Automated audio extraction & profiling pipeline: asynchronous analysis of 35+ acoustic, spectral, and emotional features (MFCCs, valence, instruments) via Librosa and Essentia-TensorFlow integration.',
        'Scoring & Batch processing: generated audio centroids and statistical distributions over broadcast history, including algorithmic cold-start handling.',
      ],
      technologies: ['Microsoft Azure', 'Python', 'AI Matching', 'Testing & Debugging', 'Docker', 'Microservices', 'GitHub Actions (CI/CD)'],
    },
    {
      title: 'Full-Stack Developer | Freelance',
      company: 'Melodia',
      location: 'Canada (Remote)',
      period: 'January 2026 - March 2026',
      description: [
        'End-to-end multi-role QA & audit (Artist, Agent, Station, Admin): resolved critical bugs, failing APIs, and inconsistent flows.',
        'Production-ready UX implementation: contextual spinners, status toasts, Optimistic UI with rollback, and standardized error handling across the app.',
        'Full-stack optimization: N+1 query resolution, server-side pagination, full EN/FR internationalization, and JWT/RBAC security.',
        'CI/CD deployment on Microsoft Azure via GitHub Actions (frontend & backend) with Application Insights monitoring.',
      ],
      technologies: ['React.js', '.NET / C#', 'Microsoft Azure', 'MySQL', 'GitHub Actions', 'Testing & Debugging', 'JavaScript'],
    },
    {
      title: 'Full-Stack Developer | Freelance',
      company: '3ommy',
      location: 'Rabat, Morocco (Remote)',
      period: 'September 2025 - January 2026',
      description: [
        'Production release of a cross-platform app (Web, iOS, Android) with end-to-end QA testing and business workflow validation.',
        'Frontend development: new UI screens, REST API integration, mobile-first responsiveness, and performance optimization.',
        'RESTful API design and fixes with Supabase (PostgreSQL): endpoints, business logic refactoring, JWT/RLS security, and Edge Functions.',
        'Architecture refactoring (maintainability, scalability), critical production bug fixes, and Agile/Scrum collaboration.',
      ],
      technologies: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'TypeScript', 'Testing & Debugging', 'Agile'],
    },
    {
      title: 'Full-Stack Developer | Final Year Internship',
      company: 'GRANDE CHARTE Inc',
      location: 'El Jadida, Morocco',
      period: 'April 2025 - June 2025',
      description: [
        'Designed and built an internal e-learning platform: secure JWT authentication, fine-grained roles and permissions, activity logs, notifications and email delivery, backend hardening, and frontend integration.',
        'Quality & stability: wrote unit and integration tests, identified and fixed defects through production release, and deployed from scratch on a VPS.',
      ],
      technologies: ['Node.js', 'Express.js', 'Next.js', 'React.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'VPS', 'Testing & Debugging'],
    },
    {
      title: 'Full-Stack Developer | Final Year Internship',
      company: 'OCP MAINTENANCE SOLUTIONS',
      location: 'Jorf Lasfar, Morocco',
      period: 'April 2024 - May 2024',
      description: [
        'Designed, developed, and integrated new features in an access-management web application (access & activity logs, dashboards, support, badges, etc.).',
        'Tested the application to ensure reliability, and identified and resolved bugs.',
      ],
      technologies: ['Laravel', 'Vue.js', 'SQL', 'Jira', 'GitLab', 'Bootstrap', 'Git', 'Testing & Debugging', 'Clean Code'],
    },
    {
      title: 'Junior Developer | Introductory Internship',
      company: 'OCP/DSI',
      location: 'Jorf Lasfar, Morocco',
      period: 'July 2023 - August 2023',
      description: [
        'Designed and developed web applications.',
        'Built an automated invoice generation solution.',
        'Optimized features to improve user experience.',
      ],
      technologies: ['HTML', 'CSS', 'JS', 'PHP', 'SQL', 'MySQL'],
    },
  ],
  projects: [
    {
      title: 'GAP-TECH — Government Grants & Tech Financing',
      description: 'High-conversion corporate landing page for a Canadian consulting firm (Laval, Québec) specializing in government grants, tailored financing, and tech innovation — featuring 5 color-coded service pillars, sticky scroll-spy progress navigation, smart CTA form pre-selection, serverless Web3Forms lead capture, and Schema.org JSON-LD SEO.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Web3Forms', 'SEO'],
      type: 'web',
      isFreelance: true,
      liveUrl: 'https://gap-tech.ca/',
      image: '/images/projects/gap_tech.webp',
    },
    {
      title: 'Melodia AI — Audio Matching Engine',
      description: 'Multi-criteria AI recommendation engine evaluating Track/Station affinity with an automated 35+ acoustic feature extraction pipeline (Librosa, Essentia-TensorFlow), cold-start handling, and dynamic justifications.',
      technologies: ['Python', 'Microsoft Azure', 'Librosa', 'Essentia-TensorFlow', 'Docker', 'Microservices'],
      type: 'ai',
      isFreelance: true,
      image: '/images/projects/melodia_ai.webp',
    },
    {
      title: 'Melodia — Music & Radio Platform',
      description: 'Production multi-role web platform (Artist, Agent, Station, Admin) featuring Optimistic UI, server-side pagination, JWT/RBAC security, full EN/FR internationalization, and Azure CI/CD deployment.',
      technologies: ['React.js', '.NET / C#', 'Microsoft Azure', 'MySQL', 'GitHub Actions'],
      type: 'web',
      isFreelance: true,
      image: '/images/projects/melodia_platform.webp',
    },
    {
      title: '3ommy — Private Pool Rental App',
      description: 'Cross-platform (Web, iOS, Android) private swimming pool booking and rental marketplace built with React Native, Expo, and Supabase (PostgreSQL, Edge Functions, JWT/RLS security).',
      technologies: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'TypeScript'],
      type: 'mobile',
      isFreelance: true,
      image: '/images/projects/3ommy_pool_rental.webp',
    },
    {
      title: 'AI Radiographic Diagnosis',
      description: 'Automated chest X-ray diagnostic and analysis system powered by EfficientNet and PyTorch.',
      technologies: ['Python', 'FastAPI', 'PyTorch', 'EfficientNet', 'Deep Learning'],
      type: 'ai',
      image: '/images/projects/radiography_ai.webp',
    },
    {
      title: 'Colon Cancer Prediction',
      description: 'Medical prediction model built with machine learning (Scikit-learn) for early colon cancer detection.',
      technologies: ['Python', 'FastAPI', 'React', 'Scikit-learn', 'Machine Learning'],
      type: 'ai',
      image: '/images/projects/colon_cancer_prediction.webp',
    },
    {
      title: 'AI Automated Code Review',
      description: 'Automated code audit and review application leveraging LLMs via Groq to detect security vulnerabilities.',
      technologies: ['Next.js', 'TypeScript', 'Groq', 'LlamaIndex', 'AI'],
      type: 'ai',
      image: '/images/projects/code_review_ai.webp',
    },
    {
      title: 'PhD Research Assistant',
      description: 'AI tool for automated bibliographic search and structured literature synthesis.',
      technologies: ['Python', 'Streamlit', 'CrewAI', 'Groq', 'LLMs'],
      type: 'ai',
      image: '/images/projects/phd_research_assistant.webp',
    },
    {
      title: 'AI Agents Orchestrator',
      description: 'Complete multi-role autonomous agent orchestration platform using CrewAI to automate complex workflows.',
      technologies: ['Next.js', 'FastAPI', 'CrewAI', 'Groq', 'Python'],
      type: 'ai',
      image: '/images/projects/agents_orchestrator.webp',
    },
    {
      title: 'AI REST API Generator',
      description: 'On-the-fly generator for documented and secured REST API interfaces powered by generative AI models.',
      technologies: ['React', 'Fastify', 'TypeScript', 'Groq', 'FastAPI'],
      type: 'ai',
      image: '/images/projects/rest_api_generator.webp',
    },
    {
      title: 'Anime Mobile App',
      description: 'Cross-platform mobile application for anime streaming and discovery, featuring offline support and favorites.',
      technologies: ['React Native', 'Expo', 'Firebase', 'Mobile'],
      type: 'mobile',
      image: '/images/projects/anime_mobile_app.webp',
    },
    {
      title: 'Optical Flow: LK vs HS',
      description: 'Computer vision optical flow comparator contrasting Lucas-Kanade and Horn-Schunck methods.',
      technologies: ['Python', 'OpenCV', 'Streamlit', 'Computer Vision'],
      type: 'ai',
      image: '/images/projects/optical_flow_comparison.webp',
    },
    {
      title: 'E-Learning Platform',
      description: 'Full-featured JWT-secured e-learning platform with granular role/permission management and activity logging.',
      technologies: ['Node.js', 'Express.js', 'Next.js', 'React.js', 'PostgreSQL'],
      type: 'web',
      image: '/images/projects/elearning_platform.webp',
    },
    {
      title: 'Access Management App',
      description: 'Physical and digital access control and tracking system featuring activity logs and dashboards.',
      technologies: ['Laravel', 'Vue.js', 'SQL', 'Bootstrap', 'Git'],
      type: 'web',
      image: '/images/projects/access_management.webp',
    },
  ] as PortfolioProject[],
  skills: {
    ...skills,
    methodologies: ['Agile Scrum', 'MVC2 Pattern', 'UML'],
    tools: ['Git (GitHub, GitLab)', 'GitHub Actions (CI/CD)', 'Docker', 'Microsoft Azure', 'Expo', 'Jira', 'Figma', 'Networking'],
    languages_spoken: [
      { language: 'Arabic', level: 'Native' },
      { language: 'French', level: 'Fluent' },
      { language: 'English', level: 'Fluent' },
    ],
  },
}

/** Returns portfolio data localized for the active locale ('en' or 'fr'). */
export function getLocalizedPortfolioData(locale: string) {
  if (locale === 'en') {
    return englishData
  }
  return {
    personalInfo,
    education,
    experiences,
    projects,
    skills,
  }
}


