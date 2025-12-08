export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  githubUrl?: string;
  sheetsUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: 'web' | 'mobile' | 'qa' | 'other';
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Sistem Rekomendasi Menu Warmindo',
    shortDescription: 'Aplikasi web sistem rekomendasi menu menggunakan machine learning.',
    description: 'Aplikasi web sistem rekomendasi menu warmindo menggunakan machine learning untuk memberikan rekomendasi menu berdasarkan data penjualan. Dibangun dengan Flask dan algoritma rekomendasi untuk meningkatkan pengalaman pengguna dalam memilih menu.',
    technologies: ['Python', 'Flask', 'Machine Learning', 'Pandas', 'Scikit-learn'],
    githubUrl: 'https://github.com/pengsuii/Sistem-Rekomendasi-Menu-Warmindo',
    liveUrl: 'https://isrun0n5000.zeabur.app/',
    category: 'web'
  },
  {
    id: 2,
    title: 'Nidejia Rent Home Website',
    shortDescription: 'Website rental rumah dengan UI enhancements dan fitur modern untuk pengalaman pengguna yang lebih baik.',
    description: '',
    technologies: ['TypeScript', 'PHP', 'React', 'UI/UX', 'Responsive Design'],
    githubUrl: 'https://github.com/pengsuii/nidejia-enhanced',
    liveUrl: 'https://nidejia-enhanced.vercel.app/',
    category: 'web'
  },
  {
    id: 3,
    title: 'Ruang Bermain Asik Website',
    shortDescription: 'Saya mengembangkan website profil sederhana untuk Rubik (Ruang Bermain Asik), sebuah kolektif yang berdiri sejak 2023 dan berfokus pada isu penggunaan gadget berlebih pada anak-anak.',
    description: 'Rubik dibentuk dari keresahan terhadap dampak negatif layar digital—seperti potensi masalah kesehatan mental dan perubahan perilaku—yang semakin sering dialami oleh anak-anak di perkotaan.',
    technologies: ['Node.JS', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/pengsuii/rubik-page',
    liveUrl: 'https://pengsuii.github.io/rubik-page/',
    category: 'web'
  },
  {
    id: 4,
    title: 'Test Case KliknClean Cleaner App',
    shortDescription: 'Desain dan implementasi UI/UX untuk aplikasi mobile dengan fokus pada aksesibilitas.',
    description: 'Desain dan implementasi UI/UX untuk aplikasi mobile dengan fokus pada aksesibilitas dan user experience. Mencakup design system yang konsisten dan reusable components.',
    technologies: ['React Native', 'TypeScript', 'Figma', 'Design System'],
    sheetsUrl: 'https://docs.google.com/spreadsheets/d/1Z78Xdx7Wqlbk5Qs_oUBfZh-aZbeTp4ENNQp53QJmqqw/edit?usp=sharing',
    category: 'qa'
  },
  {
    id: 5,
    title: 'API Testing Framework',
    shortDescription: 'Framework testing untuk REST API dengan validasi response dan performance testing.',
    description: 'Framework testing untuk REST API dengan validasi response, error handling, dan performance testing. Terintegrasi dengan reporting tools untuk tracking kualitas API.',
    technologies: ['Postman', 'Newman', 'JavaScript', 'API Testing', 'Reporting'],
    githubUrl: 'https://github.com',
    category: 'qa'
  },
  {
    id: 6,
    title: 'Dashboard Analytics',
    shortDescription: 'Dashboard analytics real-time dengan visualisasi data interaktif.',
    description: 'Dashboard analytics real-time dengan visualisasi data interaktif. Menampilkan metrik penting dengan chart yang responsif dan filter data yang powerful.',
    technologies: ['React', 'D3.js', 'TypeScript', 'Chart.js', 'WebSocket'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    category: 'web'
  }
];

