// Real data extracted from CV-PRO.pdf - ANAS EN-NAQADI

export const personalInfo = {
  name: 'ANAS EN-NAQADI',
  title: 'Full-Stack Developer',
  subtitle: 'Vue.js • React.js • Laravel Specialist',
  location: 'EL JADIDA, Morocco',
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
    degree: 'License Professionnelle Informatique et Mathématiques Appliquées',
    period: '2024 - 2025',
    institution: 'Faculté Polytechnique de Sidi Bennour, EL JADIDA',
  },
  {
    degree: 'Diplôme Universitaire de Technologie Génie Informatique',
    period: '2022 - 2024',
    institution: 'École Supérieure de Technologie, Sidi Bennour',
  },
  {
    degree: 'Baccalauréat en Sciences Physiques',
    period: '2022',
    institution: 'Lycée El Qods, EL JADIDA',
  },
]

export const experiences = [
  {
    title: 'FullStack Developer | Stage PFE',
    company: 'GRANDE CHARTE Inc',
    period: 'Avril 2025 - Juin 2025',
    description: [
      'Conception et développement d\'une plateforme e-learning interne/A: système d\'authentification sécurisé (JWT)',
      'Gestion fine des rôles et permissions, suivi des logs, notifications et envoi d\'emails',
      'Renforcement de la sécurité backend et intégration des pages frontend',
      'Qualification et stabilité: rédaction de tests unitaires et d\'intégration, identification et correction des anomalies, juste avant la mise en production et déploiement sur un VPS à zéro',
    ],
    technologies: ['Node.js', 'Express.js', 'Next.js', 'React.js', 'Git & Github', 'TailwindCss', 'Testing and Debugging', 'Best Practices', 'VPS', 'PostgreSQL', 'Typescript'],
  },
  {
    title: 'FullStack Developer | Stage PFE',
    company: 'OCP MAINTENANCE SOLUTIONS',
    period: 'Avril 2024 - Mai 2024',
    description: [
      'Conception, Développement et intégration de nouvelles fonctionnalités dans une application web de gestion des accès',
      'Suivi des logs d\'accès et d\'activité, gestion des tableaux de bord, support, badges, etc.',
      'Test de l\'application pour garantir son bon fonctionnement',
      'Identification et correction des bugs',
    ],
    technologies: ['Laravel', 'Vue.js', 'SQL', 'Jira', 'GitLab', 'Bootstrap', 'Testing and Debugging', 'Best Practices', 'Clean Code', 'Git'],
  },
  {
    title: 'Junior Developer | Stage Initiation',
    company: 'OCP/DSI',
    period: 'Juillet 2023 - Aout 2023',
    description: [
      'Conception et développement d\'applications web',
      'Création d\'une solution pour la génération automatique des factures',
      'Optimisation des fonctionnalités pour améliorer l\'expérience utilisateur',
    ],
    technologies: ['HTML', 'CSS', 'JS', 'PHP', 'SQL', 'MYSQL'],
  },
]

export const projects = [
  {
    title: 'Application Web E-Learning',
    description: 'Plateforme e-learning complète avec système d\'authentification sécurisé (JWT), gestion des rôles et permissions, suivi des logs, notifications et envoi d\'emails. Déployée sur VPS avec tests unitaires et d\'intégration.',
    technologies: ['Node.js', 'Express.js', 'Next.js', 'React.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    type: 'web',
  },
  {
    title: 'Application Web de Gestion des Accès',
    description: 'Application web complète pour la gestion des accès avec suivi des logs, tableaux de bord, gestion des badges et support utilisateur.',
    technologies: ['Laravel', 'Vue.js', 'SQL', 'Bootstrap'],
    type: 'web',
  },
  {
    title: 'Application Web E-Commerce Avancé',
    description: 'Plateforme e-commerce complète avec gestion des produits, panier, paiement et administration.',
    technologies: ['Laravel', 'Vue.js', 'MySQL'],
    type: 'web',
  },
  {
    title: 'Application Web de Gestion des Projets par Entreprise',
    description: 'Système de gestion de projets avec suivi des tâches, équipes et rapports pour entreprises.',
    technologies: ['Laravel', 'React.js', 'MySQL'],
    type: 'web',
  },
  {
    title: 'Application Web de Gestion des Ventes et du Stock',
    description: 'Système complet de gestion des ventes et inventaire pour magasins avec suivi en temps réel.',
    technologies: ['Laravel', 'React.js', 'MySQL'],
    type: 'web',
  },
  {
    title: 'Application Web pour la Gestion des Surveys',
    description: 'Plateforme de création et gestion de sondages avec analyse des résultats et rapports.',
    technologies: ['Laravel', 'Vue.js', 'MySQL'],
    type: 'web',
  },
  {
    title: 'Application Web pour la Gestion des Messages SMS',
    description: 'Système de gestion et envoi de messages SMS avec suivi et statistiques.',
    technologies: ['Laravel', 'Vue.js', 'MySQL'],
    type: 'web',
  },
  {
    title: 'Application Web pour Gérer des Factures',
    description: 'Système de génération automatique de factures avec gestion des clients et produits.',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    type: 'web',
  },
]

export const skills = {
  languages: ['HTML', 'CSS', 'PHP', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'NoSQL'],
  frameworks: ['Vue.js', 'React.js', 'Laravel', 'Express.js', 'Next.js', 'TailwindCSS', 'Bootstrap'],
  libraries: ['Vuex', 'Redux Toolkit', 'PrimeVue', 'Material UI', 'Chart.js'],
  databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
  methodologies: ['Agile Scrum', 'Modèle MVC2', 'UML'],
  tools: ['Git (GitHub, GitLab)', 'Jira', 'Figma', 'Canva', 'Reseaux Informatique'],
  languages_spoken: [
    { language: 'Arabic', level: 'Native' },
    { language: 'French', level: 'Current' },
    { language: 'English', level: 'Current' },
  ],
}


