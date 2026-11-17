import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates, photos, projectExperience, projects, resume, sections, skills, workExperience } from './portfolio.js';
import ProjectArtwork from './ProjectArtwork.jsx';
import ProjectCover, { featuredCovers } from './ProjectCover.jsx';
import ProjectStory from './ProjectStory.jsx';
import HoverCursor, { CursorLens } from './HoverCursor.jsx';
import ContactForm from './ContactForm.jsx';
import SkillLogo from './SkillLogo.jsx';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

function LoadingIntro({ onReveal, onComplete }) {
  const overlay = useRef(null);

  useLayoutEffect(() => {
    document.documentElement.classList.add('intro-playing');
    const motion = gsap.matchMedia(overlay);
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ onComplete, defaults: { ease: 'power3.out' } })
        .from('.intro-orbit', { scale: 1.65, rotation: -30, opacity: 0, duration: 1.7 }, 0)
        .from('.intro-caption', { y: 12, opacity: 0, duration: 0.55 }, 0.16)
        .from('.intro-letter', { yPercent: 120, rotate: 12, opacity: 0, stagger: 0.055, duration: 0.78 }, 0.25)
        .fromTo('.intro-line', { scaleX: 0 }, { scaleX: 1, duration: 1.05 }, 0.48)
        .to('.intro-name, .intro-caption, .intro-line, .intro-orbit', { y: -28, opacity: 0, duration: 0.38 }, 1.78)
        .call(onReveal, [], 2.06)
        .to('.intro-pane', {
          yPercent: (index) => (index % 2 ? 101 : -101),
          duration: 0.72, stagger: { each: 0.09, from: 'center' }, ease: 'power4.inOut',
        }, 2.06);
    });
    motion.add('(prefers-reduced-motion: reduce)', onComplete);
    return () => {
      motion.revert();
      document.documentElement.classList.remove('intro-playing');
    };
  }, [onReveal, onComplete]);

  return (
    <div ref={overlay} className="loading-intro">
      <div className="intro-curtain" aria-hidden="true"><span className="intro-pane" /><span className="intro-pane" /><span className="intro-pane" /><span className="intro-pane" /></div>
      <div className="intro-orbit" aria-hidden="true" />
      <div className="intro-caption" role="status" aria-label="Opening Kenneth Falla's portfolio">Portfolio</div>
      <div className="intro-name" aria-hidden="true">
        {['Kenneth', 'Falla'].map((word) => (
          <span className="intro-word" key={word}>
            {Array.from(word, (letter, index) => <span className="intro-letter" key={index}>{letter}</span>)}
          </span>
        ))}
      </div>
      <div className="intro-line" aria-hidden="true" />
      <button className="intro-skip" type="button" onClick={onComplete}>Skip intro</button>
    </div>
  );
}

function Arrow({ direction = 'diagonal' }) {
  const paths = {
    diagonal: 'M4 12 12 4M5 4h7v7',
    down: 'M8 3v10M4 9l4 4 4-4',
    up: 'M8 13V3M4 7l4-4 4 4',
  };

  return (
    <svg className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d={paths[direction]} />
    </svg>
  );
}

function RollingLabel({ children }) {
  return (
    <span className="rolling-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function DisplayTitle({ as: Tag = 'h2', children, className = '', id }) {
  const heading = useRef(null);
  const text = useRef(null);

  useLayoutEffect(() => {
    const element = heading.current;
    const wordmark = text.current;
    const fit = () => {
      if (wordmark.offsetWidth) {
        element.style.setProperty('--stretch', element.clientWidth / wordmark.offsetWidth);
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    observer.observe(wordmark);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={heading} id={id} className={`display-title ${className}`}>
      <span className="title-motion"><span ref={text}>{children}</span></span>
    </Tag>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    let previous = Math.max(0, window.scrollY);

    const onScroll = () => {
      const current = Math.max(0, window.scrollY);
      if (current <= 64 || Math.abs(current - previous) > 5) {
        setHidden(current > 64 && current > previous);
        previous = current;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${hidden && !open ? 'header-away' : ''}`} onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menu.current.focus();
      }
    }}>
      <div className="header-bar flex items-stretch">
        <a className="wordmark flex items-center" href="#top" onClick={() => setOpen(false)}>Kenneth Falla</a>
        <a href="#project-sierra" className="featured-link items-center gap-3">
          <span className="featured-thumb"><ProjectArtwork id="sierra" /></span>
          Latest work: SIERRA
        </a>
        <button type="button" ref={menu} className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          <RollingLabel>{open ? 'Close' : 'Menu'}</RollingLabel>
          <span className="menu-icon" aria-hidden="true"><i /><i /></span>
        </button>
        <nav className={`site-nav ${open ? 'menu-open' : ''}`} id="site-nav" aria-label="Portfolio">
          {sections.map(({ id, label, shortLabel }) => (
            <a className="nav-link" key={id} href={`#${id}`} aria-label={label} onClick={() => setOpen(false)}>
              <RollingLabel>{shortLabel || label}</RollingLabel>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ScrollCue() {
  return (
    <a href="#about" className="scroll-cue" aria-label="Scroll to About Me" data-scroll-cue>
      <svg viewBox="0 0 120 120" className="scroll-ring" aria-hidden="true">
        <defs><path id="scroll-ring-path" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs>
        <text><textPath href="#scroll-ring-path" textLength="269">SCROLL DOWN ▪ SCROLL DOWN ▪ </textPath></text>
      </svg>
      <Arrow direction="down" />
    </a>
  );
}

function ProjectTile({ project, onOpen }) {
  return (
    <article className={`project-tile ${project.wide ? 'project-wide' : ''} ${featuredCovers.has(project.id) ? 'project-featured-cover' : ''}`} id={`project-${project.id}`}>
      <h3>
        <button className="project-button" type="button" aria-haspopup="dialog" onClick={() => onOpen(project)}>
          <span className="project-media"><span className="project-media-motion"><ProjectCover id={project.id} /></span></span>
          <span className="project-glint" aria-hidden="true" />
          <span className="project-caption">
            <span className="project-name">{project.title}</span>
            <span className="project-meta">{project.category}</span>
          </span>
          <span className="project-arrow"><Arrow /></span>
        </button>
      </h3>
    </article>
  );
}

function ProjectBand({ onOpen }) {
  return (
    <button type="button" className="project-band" aria-haspopup="dialog" onClick={onOpen}>
      <span className="band-label">View all projects <Arrow /></span>
      <span className="band-media" aria-hidden="true">
        {projects.map(({ id }) => <span className="band-cover" key={id}><ProjectCover id={id} /></span>)}
      </span>
    </button>
  );
}

function PreviewDialog({ item, onClose, onOpenProject }) {
  const dialog = useRef(null);
  const projectIndex = item === 'projects';
  const [indexSelection, setIndexSelection] = useState(null);
  const isStory = !projectIndex && !item.image;

  useLayoutEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);

  useLayoutEffect(() => {
    const element = dialog.current;
    element.scrollTop = 0;
    const selectedCard = projectIndex && indexSelection && element.querySelector(`[data-index-project="${indexSelection}"]`);
    if (selectedCard) selectedCard.focus();
    else element.querySelector('.close-preview').focus({ preventScroll: true });
  }, [item, projectIndex, indexSelection]);

  return (
    <dialog ref={dialog} aria-labelledby="preview-title" className={`preview${projectIndex ? ' preview-projects' : ''}${isStory ? ' preview-story' : ''}`} data-project={isStory ? item.id : undefined} onClose={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) dialog.current.close();
    }}>
      <div className="preview-panel">
        <header className="preview-header flex items-start justify-between gap-5">
          <div>
            {isStory && indexSelection && (
              <button type="button" className="back-projects" onClick={() => onOpenProject('projects')}>
                <span aria-hidden="true">←</span> All projects
              </button>
            )}
            {!projectIndex && <p className="eyebrow">{item.issuer || item.category}</p>}
            <h2 id="preview-title">{projectIndex ? 'All projects' : item.title}</h2>
          </div>
          <button type="button" className="close-preview" aria-label="Close preview" onClick={() => dialog.current.close()}>×</button>
        </header>
        {projectIndex ? (
          <ul className="project-index">
            {projects.map((project) => (
              <li key={project.id}>
                <button type="button" className="index-card" data-index-project={project.id} onClick={() => {
                  setIndexSelection(project.id);
                  onOpenProject(project);
                }}>
                  <span className="index-cover"><ProjectCover id={project.id} /></span>
                  <span className="index-caption">
                    <span><strong>{project.title}</strong><small>{project.category}</small></span>
                    <Arrow />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : item.image ? (
          <div className="certificate-preview">
            <img className="preview-image" src={item.image} alt={`${item.title} certificate issued to Kenneth Falla`} />
            {item.pdf && <a className="outline-link" href={item.pdf} target="_blank" rel="noopener noreferrer">Open certificate PDF <Arrow /></a>}
          </div>
        ) : (
          <ProjectStory key={item.id} project={item} />
        )}
      </div>
      <CursorLens />
    </dialog>
  );
}

function usePortfolioMotion(portfolio, ready) {
  useLayoutEffect(() => {
    if (!ready) return;
    const motion = gsap.matchMedia(portfolio);

    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const reveal = (target, trigger, start = 'top 92%') => ({
        trigger: trigger || target,
        start,
        once: true,
      });

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-title .title-motion', { yPercent: 108, duration: 0.9 })
        .fromTo('.hero-photo', { clipPath: 'inset(100% 0 0)' }, { clipPath: 'inset(0% 0 0)', duration: 1 }, 0.12)
        .from('.hero-photo img', { scale: 1.13, duration: 1.4 }, 0.12);

      gsap.fromTo('.hero-photo img', { yPercent: -6 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.fromTo('.about-photo img', { yPercent: -6 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.utils.toArray('.display-title:not(.hero-title)').forEach((title) => {
        gsap.from(title.querySelector('.title-motion'), {
          yPercent: 108,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: reveal(title),
        });
      });

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 24,
          autoAlpha: 0,
          duration: 0.58,
          ease: 'power2.out',
          scrollTrigger: reveal(element),
        });
      });

      gsap.utils.toArray('.project-button').forEach((card) => {
        const media = card.querySelector('.project-media');
        const caption = card.querySelector('.project-caption');

        gsap.fromTo(media, { clipPath: 'inset(12% 0 0)' }, {
          clipPath: 'inset(0% 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: reveal(card),
        });

        gsap.fromTo(caption, { y: () => -Math.min(card.clientHeight * 0.14, 72) }, {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom 42%',
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.fromTo('.marquee-track', { xPercent: 0 }, {
        xPercent: -33.333,
        ease: 'none',
        scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 0.45 },
      });

      gsap.from('.contact-inner', {
        y: 110,
        ease: 'none',
        scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 20%', scrub: true },
      });

      const cue = portfolio.current.querySelector('[data-scroll-cue]');
      const photo = portfolio.current.querySelector('.hero-photo');
      const moveCue = (event) => {
        if (event.pointerType === 'touch') return;
        const rect = photo.getBoundingClientRect();
        if (!photo.classList.contains('cue-tracking')) {
          const start = cue.getBoundingClientRect();
          gsap.set(cue, {
            left: start.left - rect.left + start.width / 2,
            top: start.top - rect.top + start.height / 2,
            right: 'auto',
            bottom: 'auto',
            xPercent: -50,
            yPercent: -50,
          });
          photo.classList.add('cue-tracking');
        }
        const radius = cue.offsetWidth / 2;
        gsap.to(cue, {
          left: gsap.utils.clamp(radius, rect.width - radius, event.clientX - rect.left),
          top: gsap.utils.clamp(radius, rect.height - radius, event.clientY - rect.top),
          duration: 0.32,
          overwrite: 'auto',
          ease: 'power3.out',
        });
      };

      const resetCue = () => {
        photo.classList.remove('cue-tracking');
        gsap.killTweensOf(cue);
        gsap.set(cue, { clearProps: 'left,top,bottom,right,transform' });
      };

      photo.addEventListener('pointermove', moveCue);
      photo.addEventListener('pointerleave', resetCue);

      return () => {
        photo.removeEventListener('pointermove', moveCue);
        photo.removeEventListener('pointerleave', resetCue);
        resetCue();
      };
    });

    motion.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      const cleanups = gsap.utils.toArray('.project-button, .site-nav .nav-link').map((element) => {
        const media = element.querySelector('.project-media-motion');
        const layer = media || element.querySelector('.rolling-label');
        const glint = element.querySelector('.project-glint');
        const travel = media ? 18 : 5;
        const x = gsap.quickTo(layer, 'x', { duration: 0.52, ease: 'power3.out' });
        const y = gsap.quickTo(layer, 'y', { duration: 0.52, ease: 'power3.out' });
        const enter = () => {
          gsap.to(layer, { scale: media ? 1.105 : 1.06, duration: 0.52, ease: 'power3.out', overwrite: 'auto' });
          if (glint) gsap.fromTo(glint, { xPercent: -165 }, { xPercent: 165, duration: 0.85, ease: 'power2.out', overwrite: true });
        };
        const move = (event) => {
          const bounds = element.getBoundingClientRect();
          x(((event.clientX - bounds.left) / bounds.width - 0.5) * travel * 2);
          y(((event.clientY - bounds.top) / bounds.height - 0.5) * travel * 2);
        };
        const reset = () => {
          x(0);
          y(0);
          gsap.to(layer, { scale: 1, duration: 0.48, ease: 'power3.out', overwrite: 'auto' });
        };
        element.classList.add('has-hover-motion');
        element.addEventListener('pointerenter', enter);
        element.addEventListener('pointermove', move);
        element.addEventListener('pointerleave', reset);
        element.addEventListener('focus', enter);
        element.addEventListener('blur', reset);
        return () => {
          element.classList.remove('has-hover-motion');
          element.removeEventListener('pointerenter', enter);
          element.removeEventListener('pointermove', move);
          element.removeEventListener('pointerleave', reset);
          element.removeEventListener('focus', enter);
          element.removeEventListener('blur', reset);
          gsap.killTweensOf(layer);
          if (glint) gsap.killTweensOf(glint);
          layer.style.removeProperty('transform');
          glint?.style.removeProperty('transform');
        };
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });

    return () => motion.revert();
  }, [portfolio, ready]);
}

function App() {
  const portfolio = useRef(null);
  const [preview, setPreview] = useState(null);
  const previousFocus = useRef(null);
  const [ready, setReady] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(true);
  const revealLanding = useCallback(() => setReady(true), []);
  const finishIntro = useCallback(() => {
    setReady(true);
    setIntroPlaying(false);
  }, []);

  usePortfolioMotion(portfolio, ready);

  const openPreview = (item) => {
    if (!preview) previousFocus.current = document.activeElement;
    setPreview(item);
  };

  const closePreview = () => {
    setPreview(null);
    previousFocus.current?.focus({ preventScroll: true });
  };

  return (
    <>
    <HoverCursor enabled={!introPlaying} preview={preview} />
    {introPlaying && <LoadingIntro onReveal={revealLanding} onComplete={finishIntro} />}
    <div ref={portfolio} id="top" inert={introPlaying} aria-hidden={introPlaying}>
      <a href="#about" className="skip-link">Skip to content</a>
      <Header />
      <main>
        <section className="hero shell" aria-label="Kenneth Falla portfolio">
          <DisplayTitle as="h1" className="hero-title">Kenneth Falla</DisplayTitle>
          <div className="hero-photo">
            <img src={photos.hero} alt="Kenneth Falla in an orange-lit portrait" width="1920" height="1080" fetchPriority="high" />
            <ScrollCue />
          </div>
        </section>

        <section id="about" className="about shell grid" aria-labelledby="about-heading">
          <div className="about-column">
            <div className="about-intro" data-reveal>
              <h2 id="about-heading" className="eyebrow">[ About Me ]</h2>
              <p>I'm Kenneth Falla, an Information Technology student at Nueva Ecija University of Science and Technology. I'm interested in web development, interface design, and multimedia.</p>
            </div>
          </div>
          <div className="about-photo" data-reveal>
            <img src={photos.portrait} alt="Kenneth Falla standing beside a concrete wall" width="900" height="1200" loading="lazy" />
          </div>
          <div className="about-column about-detail-column">
            <div className="about-detail" data-reveal>
              <p>I work across the design and development of a site, from mapping out a layout in Figma to building the interface and refining how it moves.</p>
              <div className="about-links">
                <a className="outline-link" href="#skills">Technical Skills <Arrow /></a>
                <a className="outline-link" href={resume} target="_blank" rel="noopener noreferrer">View résumé (PDF) <Arrow /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="projects shell" aria-labelledby="projects-title">
          <DisplayTitle id="projects-title">Selected Work</DisplayTitle>
          <div className="project-grid grid">
            {projects.map((project) => <ProjectTile project={project} key={project.id} onOpen={openPreview} />)}
          </div>
          <ProjectBand onOpen={() => openPreview('projects')} />
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track flex">
            {Array.from({ length: 3 }, (_, index) => <span key={index}>Web Development <b>▪</b> Interface Design <b>▪</b> Multimedia <b>▪</b></span>)}
          </div>
        </div>

        <section id="skills" className="skills shell" aria-labelledby="skills-title">
          <h2 className="eyebrow" id="skills-title" data-reveal>[ Technical Skills ]</h2>
          <div className="skills-grid grid">
            {skills.map(({ title, tools }) => (
              <article className="skill-cell" key={title} data-reveal>
                <h3>{title}</h3>
                <ul>
                  {tools.map((tool) => <li key={tool}><SkillLogo name={tool} /><span>{tool}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience shell" aria-labelledby="experience-title">
          <DisplayTitle id="experience-title">Experience</DisplayTitle>
          <section className="experience-section" aria-labelledby="project-experience-title">
            <h3 className="eyebrow" id="project-experience-title">Project Experience</h3>
            <div className="experience-grid grid">
              {projectExperience.map(({ year, ids }) => (
                <div className="experience-group" key={year}>
                  <h4><time dateTime={String(year)}>{year}</time></h4>
                  <ul>
                    {ids.map((id) => {
                      const project = projects.find((item) => item.id === id);
                      return (
                        <li key={id}>
                          <a className="experience-link" href={`#project-${id}`}>
                            <span>
                              <span className="experience-project">{project.title}</span>
                              <span className="experience-role">{project.role}</span>
                            </span>
                            <Arrow />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <section className="experience-section" aria-labelledby="work-experience-title">
            <h3 className="eyebrow" id="work-experience-title">Work Experience</h3>
            <article className="employment">
              <header>
                <p className="employment-dates">
                  <time dateTime={workExperience.start.dateTime}>{workExperience.start.label}</time>
                  {' – '}
                  <time dateTime={workExperience.end.dateTime}>{workExperience.end.label}</time>
                </p>
                <h4 className="experience-project">{workExperience.title}</h4>
                <p className="experience-role">{workExperience.organization} · {workExperience.location}</p>
              </header>
              <ul>
                {workExperience.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
              </ul>
            </article>
            <a className="outline-link" href={resume} download="Kenneth_Falla_resume.pdf">Download résumé <Arrow /></a>
          </section>
        </section>

        <section id="certifications" className="certifications shell" aria-labelledby="certifications-title">
          <DisplayTitle id="certifications-title">Certifications</DisplayTitle>
          <div className="certificate-list">
            {certificates.map((certificate) => (
              <button className="certificate-row" type="button" key={certificate.id} aria-haspopup="dialog" onClick={() => openPreview(certificate)}>
                <span className="certificate-backdrop" aria-hidden="true"><img loading="lazy" alt="" src={certificate.image} /></span>
                <time dateTime={certificate.dateTime}>{certificate.date}</time>
                <span className="certificate-title">{certificate.title}</span>
                <span className="certificate-issuer">{certificate.issuer}</span>
                <span className="circle-arrow"><Arrow /></span>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="contact shell text-center" aria-label="Contact">
          <div className="contact-inner">
            <DisplayTitle className="contact-title">Let’s Talk</DisplayTitle>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer flex flex-wrap items-stretch">
        <span>© {new Date().getFullYear()} Kenneth Falla</span>
        <a className="nav-link" href="#contact"><RollingLabel>Contact</RollingLabel></a>
        <a className="nav-link" href="#top"><RollingLabel>Back to Top</RollingLabel><Arrow direction="up" /></a>
      </footer>

      {preview && <PreviewDialog item={preview} onClose={closePreview} onOpenProject={openPreview} />}
    </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

