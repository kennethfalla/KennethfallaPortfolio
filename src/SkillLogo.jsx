import React from 'react';

const localLogos = import.meta.glob('./assets/skills/*.svg', { eager: true, import: 'default', query: '?url' });

const logoNames = {
  HTML5: 'html-5',
  JavaScript: 'javascript',
  CSS3: 'css-3',
  'Tailwind CSS': 'tailwindcss-icon',
  Figma: 'figma',
  Canva: 'canva',
  Framer: 'framer',
  PHP: 'php',
  Python: 'python',
  MySQL: 'mysql',
  Supabase: 'supabase',
  Vercel: 'vercel',
  Git: 'git',
  GitHub: 'github',
  Render: 'render',
  InfinityFree: 'infinityfree',
  // CapCut and Alight Motion are from Arcticons by Donnnno and contributors.
  // https://arcticons.com/ — CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).
  CapCut: 'capcut',
  'Adobe Lightroom': 'adobe-lightroom',
  Photoshop: 'adobe-photoshop',
  'Alight Motion': 'alight-motion',
};

const hostedLogos = {
  Stitch: 'https://www.gstatic.com/labs-code/stitch/favicon-192x192.png',
  Aiven: 'https://aiven.io/favicons/favicon-64x64.png',
};

export default function SkillLogo({ name }) {
  const src = hostedLogos[name] || localLogos[`./assets/skills/${logoNames[name]}.svg`];

  return (
    <span className="skill-logo" aria-hidden="true">
      <img src={src} alt="" width={29} height={29} loading="lazy" decoding="async" />
    </span>
  );
}
