export const profile = {
  name: 'Tenzin Tsogney',
  initials: 'TT',
  role: 'Full-Stack Developer · Core Frontend Developer',
  location: 'Bengaluru, India',
  email: 'ttsogney99@gmail.com',
  linkedinMessage:
    'https://www.linkedin.com/messaging/compose/?recipient=tenzin-tsogney-06337a28a',
  availability: 'Open to opportunities',
  headline: 'Building practical software across web, AI, and mobile.',
  intro:
    'MCA student with a BCA from Kristu Jayanti College, Bengaluru, India. Interested in software development, web applications, artificial intelligence, mobile apps, and building practical projects.',
  bio: [
    'I hold a BCA from Kristu Jayanti College, Bengaluru, India, and am currently pursuing an MCA with a focus on full-stack development and core frontend engineering.',
    'I am interested in software development, web applications, artificial intelligence, mobile apps, and building practical projects that turn ideas into working products.',
  ],
  stats: [
    { value: 'MCA', label: 'Student' },
    { value: 'Full-Stack', label: 'Developer' },
    { value: 'Frontend', label: 'Core focus' },
    { value: 'AI', label: 'AI & mobile' },
  ],
  focus: [
    {
      icon: 'code',
      title: 'Full-stack development',
      description:
        'Building practical web applications from responsive frontend interfaces to backend logic and data.',
    },
    {
      icon: 'layers',
      title: 'Core frontend development',
      description:
        'Crafting accessible, responsive interfaces with React, modern JavaScript, and thoughtful design.',
    },
    {
      icon: 'sparkle',
      title: 'AI & mobile apps',
      description:
        'Exploring artificial intelligence and mobile application development through hands-on projects.',
    },
  ],
  socials: [
    {
      label: 'GitHub',
      icon: 'github',
      href: 'https://github.com/TenzinTsogney',
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      href: 'https://www.linkedin.com/in/tenzin-tsogney-06337a28a/',
    },
    { label: 'Email', icon: 'mail', href: 'mailto:ttsogney99@gmail.com' },
  ],
}

export const projects = [
  {
    title: 'ClothHope',
    category: 'Full Stack',
    year: '2026',
    description:
      'A clothing donation platform with secure authentication, OTP verification, donation tracking, and an admin dashboard for managing users and contributions.',
    tags: ['HTML / CSS / JS', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
    accent: 'cyan',
    preview: 'donation',
    featured: true,
    repo: 'https://github.com/TenzinTsogney/Clothhope',
  },
  {
    title: 'TibEvent',
    category: 'Full Stack',
    year: '2026',
    description:
      'A full-stack event platform with authentication, event management, user accounts, image uploads, and a responsive frontend for discovering events.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Multer'],
    accent: 'violet',
    preview: 'event',
    featured: false,
    repo: 'https://github.com/TenzinTsogney/tibevent',
  },
  {
    title: 'AI Letter App',
    category: 'Mobile',
    year: '2026',
    description:
      'An Android application that generates letters using AI, featuring authentication, OTP verification, password reset, and a clean, user-friendly interface.',
    tags: ['Kotlin', 'Android', 'Retrofit', 'AI'],
    accent: 'blue',
    preview: 'letter',
    featured: false,
    repo: 'https://github.com/TenzinTsogney/ai-letter-app',
  },
  {
    title: 'ToDo List App',
    category: 'Web App',
    year: '2025',
    description:
      'A multi-page task management web application with task lists, reminders, focus mode, and a clean, responsive interface.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    accent: 'mint',
    preview: 'tasks',
    featured: false,
    repo: 'https://github.com/TenzinTsogney/ToDoListApp',
  },
  {
    title: 'Converter Project',
    category: 'Web App',
    year: '2025',
    description:
      'A responsive unit converter web application with a clean interface and JavaScript-powered conversion logic.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    accent: 'magenta',
    preview: 'converter',
    featured: false,
    repo: 'https://github.com/TenzinTsogney/Converter-Project',
  },
]

export const skillGroups = [
  {
    title: 'Frontend Development',
    icon: 'code',
    accent: 'cyan',
    description:
      'Building responsive, interactive, and user-friendly web experiences.',
    skills: [
      { name: 'HTML & CSS', level: 90 },
      { name: 'JavaScript', level: 86 },
      { name: 'React', level: 82 },
      { name: 'Tailwind CSS', level: 82 },
      { name: 'Bootstrap', level: 80 },
      { name: 'Responsive UI & Animations', level: 85 },
    ],
  },
  {
    title: 'Backend Development',
    icon: 'server',
    accent: 'violet',
    description:
      'Turning ideas into functional applications with APIs, business logic, and authentication.',
    skills: [
      { name: 'Python', level: 82 },
      { name: 'Java', level: 80 },
      { name: 'Node.js & Express.js', level: 82 },
      { name: 'Spring Boot', level: 74 },
      { name: 'REST APIs', level: 80 },
      { name: 'JWT Authentication', level: 78 },
    ],
  },
  {
    title: 'Databases & Data',
    icon: 'grid',
    accent: 'blue',
    description:
      'Designing and working with data storage, queries, and application connectivity.',
    skills: [
      { name: 'MySQL', level: 84 },
      { name: 'Microsoft SQL Server', level: 76 },
      { name: 'MongoDB', level: 78 },
      { name: 'SQL & Database Design', level: 80 },
      { name: 'Database Integration', level: 78 },
    ],
  },
  {
    title: 'AI & Application Development',
    icon: 'sparkle',
    accent: 'magenta',
    description:
      'Exploring AI-powered features and building applications across different platforms.',
    skills: [
      { name: 'Flutter & Dart', level: 74 },
      { name: 'Groq API Integration', level: 78 },
      { name: 'AI-Assisted Text Correction', level: 76 },
      { name: 'Voice Assistant Concepts', level: 72 },
      { name: 'API Integration', level: 80 },
    ],
  },
]

export const toolbelt = [
  'Python',
  'Java',
  'JavaScript',
  'React',
  'HTML & CSS',
  'Node.js',
  'Express.js',
  'Spring Boot',
  'MySQL',
  'MongoDB',
  'Git & GitHub',
  'VS Code',
  'IntelliJ IDEA',
  'Flutter',
  'Postman',
  'PowerShell',
]

export const experience = [
  {
    period: '2026',
    role: 'Web Development Intern',
    company: 'InAmigos Foundation',
    description:
      'Worked on an NGO awareness website focused on presenting social initiatives, projects, and organizational information through a clean, accessible, and responsive interface.',
    tags: ['HTML / CSS', 'Frontend Development', 'Responsive UI'],
  },
  {
    period: 'Jun 2025 — Aug 2025',
    role: 'Web Development Intern',
    company: 'Labmentix Pvt. Ltd.',
    description:
      'Developed responsive web interfaces and worked on practical web application projects. Gained hands-on experience with frontend development, UI/UX principles, and building user-focused features while collaborating on project implementation.',
    tags: ['HTML / CSS / JavaScript', 'Responsive Design', 'UI/UX Development'],
  },
]

export const education = [
  {
    period: '2026 — Present',
    role: 'Master of Computer Applications (MCA)',
    company: 'Currently Pursuing',
    description:
      'Pursuing postgraduate studies in computer applications, focusing on software development, programming, database management, and advanced computing concepts.',
    tags: ['Software Development', 'Programming', 'Database Management'],
  },
  {
    period: '2022 — 2026',
    role: 'Bachelor of Computer Applications (BCA)',
    company: 'Kristu Jayanti College, Bengaluru',
    description:
      'Completed undergraduate studies in computer applications, building a foundation in programming, web development, databases, and software engineering.',
    tags: ['Programming', 'Web Development', 'Databases'],
  },
]

export const navItems = [
  { label: 'Overview', href: '#home' },
  { label: 'Profile', href: '#profile' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
]
