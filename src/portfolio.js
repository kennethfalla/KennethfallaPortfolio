import hero from './assets/kenneth-hero.webp';
import portrait from './assets/kenneth-portrait.webp';
import certiport from '../ImageRequirement/Certifications and Seminars/Certiport.jpg';
import wadhwani from '../ImageRequirement/Certifications and Seminars/Wadhwani.png';
import resumePdf from '../ImageRequirement/Kenneth_Falla_resume.pdf';
import geminiPdf from '../ImageRequirement/Certifications and Seminars/UpskillTechPH_Verified_Record.pdf';
import databasePdf from '../ImageRequirement/Certifications and Seminars/UpskillTechPH_Verified_Record (1).pdf';
import emergingItPdf from '../ImageRequirement/Certifications and Seminars/UpskillTechPH_Verified_Record (3).pdf';
import geminiCertificate from './assets/gemini-101.webp';
import databaseCertificate from './assets/database-101.webp';
import emergingItCertificate from './assets/emerging-it-innovations.webp';

export const photos = { hero, portrait };
export const email = 'kennnethfalla@gmail.com';
export const resume = resumePdf;

export const sections = [
  { id: 'projects', label: 'Projects', shortLabel: 'Work' },
  { id: 'about', label: 'About Me', shortLabel: 'About' },
  { id: 'skills', label: 'Technical Skills', shortLabel: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const skills = [
  { title: 'Front End', tools: ['HTML5', 'JavaScript', 'CSS3', 'Tailwind CSS'] },
  { title: 'Design Tools', tools: ['Figma', 'Canva', 'Stitch', 'Framer'] },
  { title: 'Back End & Databases', tools: ['PHP', 'Python', 'MySQL', 'Supabase', 'Aiven'] },
  { title: 'Version Control & Deployment', tools: ['Vercel', 'Git', 'GitHub', 'Render', 'InfinityFree'] },
  { title: 'Multimedia Tools', tools: ['CapCut', 'Adobe Lightroom', 'Photoshop', 'Alight Motion'] },
];

export const projects = [
  { id: 'sierra', title: 'SIERRA', category: 'Environmental reporting', wide: true, role: 'Primary Full-Stack Developer' },
  { id: 'formeslice', title: 'FormeSlice', category: 'Brand website', role: 'Graphic Designer and Portfolio Developer' },
  { id: 'novobank', title: 'NovoBank', category: 'Banking interface', role: 'UI/UX Designer' },
  { id: 'calebrews', title: 'CaleBrews', category: 'Point-of-sale system', wide: true, role: 'UI/UX Designer' },
  { id: 'cinema', title: 'Cinema Ticketing System', category: 'Ticketing interface', role: 'Python Developer' },
  { id: 'neust', title: 'NEUST Portal Redesign', category: 'Student portal', role: 'UI/UX Designer' },
];

export const projectExperience = [
  { year: 2026, ids: ['sierra', 'formeslice'] },
  { year: 2025, ids: ['neust', 'novobank', 'calebrews', 'cinema'] },
];

export const workExperience = {
  title: 'IT Support and Administrative Assistant',
  organization: 'Granary Co-Educational Institutions',
  location: 'Rizal, Nueva Ecija',
  start: { label: 'Mar 2023', dateTime: '2023-03' },
  end: { label: 'Apr 2023', dateTime: '2023-04' },
  responsibilities: [
    'Troubleshot printer connectivity and hardware issues to support daily office operations.',
    'Installed and configured antivirus software on multiple computers.',
    'Assisted with basic network setup and connectivity.',
    'Digitized and organized paper records in Microsoft Excel.',
  ],
};

export const certificates = [
  {
    id: 'certiport',
    title: 'IT Specialist: HTML and CSS',
    issuer: 'Certiport',
    date: 'Oct 29, 2026',
    dateTime: '2026-10-29',
    image: certiport,
  },
  {
    id: 'wadhwani',
    title: 'Employability Skills: JobReady (With AI) v1',
    issuer: 'Wadhwani Foundation · Advanced Level',
    date: 'Nov 5, 2026',
    dateTime: '2026-11-05',
    image: wadhwani,
  },
  {
    id: 'emerging-it-innovations',
    title: 'Learning Advocate 2026 Series: Emerging IT Innovations',
    issuer: 'UpskillTechPH Training Services',
    date: 'Aug 22, 2026',
    dateTime: '2026-08-22',
    image: emergingItCertificate,
    pdf: emergingItPdf,
  },
  {
    id: 'gemini-101',
    title: 'AI Tools 101: How to Use Google Gemini Like a Pro',
    issuer: 'UpskillTechPH Training Services',
    date: 'Aug 22, 2026',
    dateTime: '2026-08-22',
    image: geminiCertificate,
    pdf: geminiPdf,
  },
  {
    id: 'database-101',
    title: 'Database 101: Data Storage, SQL and Query Optimization',
    issuer: 'UpskillTechPH Training Services',
    date: 'Aug 21, 2026',
    dateTime: '2026-08-21',
    image: databaseCertificate,
    pdf: databasePdf,
  },
];

