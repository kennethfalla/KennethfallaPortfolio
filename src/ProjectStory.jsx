import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import MockupWalkthrough, { MockupScreen } from './MockupWalkthrough.jsx';
import ProjectArtwork from './ProjectArtwork.jsx';
import sierraDesktop from './assets/sierra-desktop.jpg';
import sierraMobile from './assets/sierra-mobile.jpg';
import formesliceDesktop from './assets/formeslice-desktop.jpg';
import formesliceMobile from './assets/formeslice-mobile.jpg';
import formesliceBrandPost from '../ImageRequirement/Projects/FormeSliceGraphic/FirstEverBrandPost.jpg';
import formeslicePoster from '../ImageRequirement/Projects/FormeSliceGraphic/Promotional Poster.png';
import formeslicePrint from '../ImageRequirement/Projects/FormeSliceGraphic/Promotional Poster 2.png';
import neustLogin from './assets/neust-login.png';
import neustStart from './assets/neust-start.png';
import neustEnrollment from './assets/neust-enrollment.png';
import neustHelpDesk from './assets/neust-helpdesk.png';
import novoDesktop from './assets/novobank-desktop.png';
import novoLogin from './assets/novobank-login.png';
import novoSignup from './assets/novobank-signup.png';
import caleMenu from './assets/calebrews-menu.webp';
import caleCheckout from './assets/calebrews-checkout.webp';
import caleInventory from './assets/calebrews-inventory.webp';

const stories = {
  sierra: {
    headline: 'A clearer view of the environment.',
    summary: 'SIERRA is an environmental reporting project. My role spans both the user-facing interface and the development behind it as a full stack developer.',
    direction: 'The homepage pairs scenes of San Isidro with green accents. Residents can learn how to report and track an issue, explore the map, and see community reporting statistics.',
    focus: ['Environmental reporting', 'Full stack development', 'Interface structure'],
    website: { url: 'https://sierrasanisidro.great-site.net/', desktop: sierraDesktop, mobile: sierraMobile },
    walkthrough: [
      { screen: 'desktop', point: [14, 75] },
      { screen: 'desktop', point: [67, 76], swipe: 25 },
      { screen: 'mobile', point: [58, 83], swipe: 37 },
    ],
    accent: '#46705e',
  },
  formeslice: {
    headline: 'A little more you in every slice.',
    summary: 'FormeSlice brings together my graphic design work and development of its portfolio website. The project connects a visual brand with a digital space to present it.',
    direction: 'Bold pink type, chocolate brown tones, and a close-up cake photograph introduce the brand. The homepage leads into the cake menu, brand identity, and creative work.',
    focus: ['Graphic design', 'Portfolio development', 'Brand presentation'],
    graphics: [
      {
        src: formesliceBrandPost,
        caption: 'First brand post',
        alt: 'FormeSlice brand launch graphic featuring cake slices and the tagline Your Flavor, Your Formation',
        width: 2048,
        height: 2048,
      },
      {
        src: formeslicePoster,
        caption: 'Sunrise Collection promotional poster',
        alt: 'Sunrise Collection promotional poster featuring three layered cakes',
        width: 1080,
        height: 1350,
      },
      {
        src: formeslicePrint,
        caption: 'Sunrise Collection in print',
        alt: 'Printed Sunrise Collection posters arranged on the ground',
        width: 1009,
        height: 1795,
      },
    ],
    website: { url: 'https://formeslice.vercel.app/', desktop: formesliceDesktop, mobile: formesliceMobile },
    walkthrough: [
      { screen: 'desktop', point: [89, 83] },
      { screen: 'desktop', point: [59, 72], swipe: 29 },
      { screen: 'mobile', point: [61, 90], swipe: 42 },
    ],
    accent: '#bd687b',
  },
  novobank: {
    headline: 'Bringing clarity to everyday banking.',
    summary: 'NovoBank is part of my UI/UX work, exploring how a banking interface can present information with a clear and approachable visual language.',
    direction: 'Cobalt blue, graphite, and white carry the card branding into the sign-in and account creation screens. The Figma prototype starts at the mobile sign-in screen.',
    focus: ['UI/UX design', 'Banking interface', 'Information hierarchy'],
    figma: 'https://www.figma.com/proto/3d80QKD0ZKkQh0XFjCcoq0/Untitled?page-id=0%3A1&node-id=25-77&t=5TwpCH9GuRNy6tyO-1',
    figmaLabel: 'Open NovoBank prototype',
    designMockup: { desktop: novoDesktop, mobile: novoLogin },
    walkthrough: [
      { screen: 'mobile', point: [45, 55] },
      { screen: 'mobile', point: [76, 96], next: 1 },
      { screen: 'mobile', point: [48, 87] },
    ],
    screens: [
      { src: novoSignup, label: 'Account creation', alt: 'NovoBank onboarding screen with a stack of cards and a Create Account button', width: 360, height: 800 },
      { src: novoLogin, label: 'Sign in', alt: 'NovoBank sign-in screen with login and fingerprint buttons', width: 360, height: 800 },
    ],
    accent: '#4974d8',
  },
  calebrews: {
    headline: 'From the counter to checkout.',
    summary: 'CaleBrews is a point-of-sale and inventory management UI/UX concept for a coffee shop. Cashiers can browse drinks, build orders, and confirm payment. The inventory interface gives staff a searchable table with editing and export controls.',
    direction: 'Coffee-brown panels connect the cashier and inventory views. The order screen uses photo-led menu cards, while checkout keeps the order summary and payment method side by side.',
    focus: ['UI/UX design', 'Cashier ordering and checkout', 'Inventory management'],
    figma: 'https://www.figma.com/design/XiIf9USXuipeQcT1Ys8sFp/Cale-Brew?node-id=200-379&t=Se9ETUBMMpWUwrcH-1',
    figmaLabel: 'Open CaleBrews POS in Figma',
    screenLayout: 'desktop',
    screenHeading: 'POS and inventory screens',
    screenDemoLabel: 'Menu, checkout, and inventory walkthrough',
    walkthrough: [
      { screen: 'primary', point: [18, 56] },
      { screen: 'primary', point: [76, 94], next: 1 },
      { screen: 'primary', point: [52, 87], next: 2 },
      { screen: 'primary', point: [28, 21] },
    ],
    screens: [
      { src: caleMenu, label: 'Cashier order menu', alt: 'CaleBrews POS menu with drink categories, product photos, prices, and buttons to add drinks to an order', width: 1280, height: 800 },
      { src: caleCheckout, label: 'Checkout confirmation', alt: 'CaleBrews checkout with a billing summary, cash and QR payment options, and a detailed order confirmation', width: 1280, height: 800 },
      { src: caleInventory, label: 'Inventory management', alt: 'CaleBrews inventory table with search, edit, print, and export controls', width: 1280, height: 800 },
    ],
    accent: '#b17d55',
  },
  cinema: {
    headline: 'From choosing a film to choosing a seat.',
    summary: 'Cinema Ticketing System is a Python project in which I serve as the developer. This presentation explores the ticketing journey through a cinema-inspired visual direction.',
    direction: 'A dark interface and warm accent colors give the seat selection concept a familiar cinema atmosphere. The mobile view illustrates how the same visual direction could adapt to a smaller screen.',
    focus: ['Python development', 'Cinema ticketing', 'Booking interface'],
    screenTitle: 'Your next movie night starts here.',
    screenAction: 'Browse movies',
    screenSections: ['Movies', 'Showtimes', 'Seats'],
    walkthrough: [
      { screen: 'desktop', point: [20, 46], next: 1 },
      { screen: 'desktop', point: [54, 60], next: 2 },
      { screen: 'mobile', point: [24, 34], next: 1 },
    ],
    accent: '#c5687e',
  },
  neust: {
    headline: 'Making student information easier to navigate.',
    summary: 'NeustPortal Redesign is part of my UI/UX work. The project looks at the student portal as an interface for organizing and accessing academic information.',
    direction: 'The mobile redesign starts with a campus photograph and university seal. The Figma case study also covers the student home screen, academic records, enrollment, and help desk flows.',
    focus: ['UI/UX design', 'Student portal', 'Mobile navigation'],
    figma: 'https://www.figma.com/design/sI1aKtuxM5agfcHfSXawQc/CaseStudyPortal?node-id=0-1&t=z5t12NRANSelR1nV-1',
    screenDemoLabel: 'Launch, sign-in, and enrollment walkthrough',
    walkthrough: [
      { screen: 'primary', point: [50, 50], next: 1 },
      { screen: 'primary', point: [49, 61], next: 2 },
      { screen: 'primary', point: [69, 40] },
    ],
    screens: [
      { src: neustStart, label: 'Launch screen', alt: 'NEUST student portal launch screen with the university seal over a campus photograph' },
      { src: neustLogin, label: 'Sign-in screen', alt: 'NEUST student portal sign-in design with username and password fields' },
      { src: neustEnrollment, label: 'Enrollment', alt: 'NEUST student portal enrollment screen with semester and program information' },
      { src: neustHelpDesk, label: 'Help Desk', alt: 'NEUST student portal Help Desk form for creating a support request' },
    ],
    accent: '#5e83b8',
  },
};

function DeviceScreen({ project, story, mobile = false }) {
  const captures = story.website || story.designMockup;
  if (captures) {
    return (
      <img
        className="device-screenshot"
        src={mobile ? captures.mobile : captures.desktop}
        alt={`${project.title} ${mobile ? 'mobile' : 'desktop'} ${story.website ? 'homepage' : 'design'}`}
        decoding="async"
      />
    );
  }

  return (
    <div className={`concept-screen ${mobile ? 'concept-mobile' : ''}`} aria-hidden="true">
      <div className="concept-nav"><strong>{project.title}</strong><span>{mobile ? '+' : 'Discover / About'}</span></div>
      <div className="concept-hero">
        <div className="concept-copy"><small>{project.category}</small><h4>{story.screenTitle}</h4><span className="concept-action">{story.screenAction} &#8599;</span></div>
        <div className="concept-art"><ProjectArtwork id={project.id} /></div>
      </div>
      <div className="concept-panels">
        {story.screenSections.map((title) => <div key={title}><span>{title}</span><i /><i /></div>)}
      </div>
    </div>
  );
}

function CinemaSeats({ selected = false }) {
  return (
    <div className="mockup-cinema-seats">
      <strong>Choose your seat</strong>
      <span className="mockup-cinema-screen">Screen</span>
      <div className="mockup-seat-grid">
        {Array.from({ length: 32 }, (_, index) => <i key={index} data-selected={selected && index === 20 ? '' : undefined} />)}
      </div>
      <span className="mockup-cinema-status">{selected ? 'Seat C5 selected' : 'Available seats'}</span>
    </div>
  );
}

function DeviceMockup({ project, story, mobile = false }) {
  const name = mobile ? 'mobile' : 'desktop';
  const frames = project.id === 'cinema'
    ? [<CinemaSeats />, <CinemaSeats selected />]
    : project.id === 'novobank' && mobile
      ? [<img className="device-screenshot" src={novoSignup} alt="" decoding="async" />]
      : [];
  return (
    <MockupScreen name={name} touch={mobile} frames={frames}>
      <DeviceScreen project={project} story={story} mobile={mobile} />
    </MockupScreen>
  );
}

function GalleryScreen({ story, screen, index, desktop }) {
  const { src, label, alt, width = 392, height = 850 } = screen;
  const img = <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />;
  const frameClass = desktop ? 'story-desktop-screen' : 'story-phone';
  if (!story.screenDemoLabel || index !== 0) {
    return (
      <figure>
        <div className={frameClass}>{img}</div>
        <figcaption>{label}</figcaption>
      </figure>
    );
  }

  const frames = story.screens.slice(1).map((frame) => (
    <img src={frame.src} alt="" width={frame.width ?? width} height={frame.height ?? height} loading="lazy" decoding="async" />
  ));
  return (
    <figure>
      <MockupWalkthrough steps={story.walkthrough}>
        <div className={frameClass}>
          <MockupScreen name="primary" touch={!desktop} frames={frames}>{img}</MockupScreen>
        </div>
      </MockupWalkthrough>
      <figcaption>{story.screenDemoLabel}</figcaption>
    </figure>
  );
}

export default function ProjectStory({ project }) {
  const story = stories[project.id];
  const article = useRef(null);
  const desktopScreens = story.screenLayout === 'desktop';

  useLayoutEffect(() => {
    const motion = gsap.matchMedia(article);
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.story-heading, .story-summary, .story-graphics, .device-spread, .story-figma', {
        y: 28, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      });
    });
    return () => motion.revert();
  }, [project.id]);

  return (
    <article ref={article} className="project-story" style={{ '--project-accent': story.accent }}>
      <div className="story-masthead"><span>Selected work / {project.category}</span><span>Kenneth Falla</span></div>
      <header className="story-lead">
        <h3 className="story-heading">{story.headline}</h3>
        <div className="story-summary">
          <p>{story.summary}</p>
          {story.website && (
            <a className="story-live-link" href={story.website.url} target="_blank" rel="noopener noreferrer">
              Visit live site <span aria-hidden="true">&#8599;</span>
            </a>
          )}
          {story.figma && (
            <a className="story-live-link" href={story.figma} target="_blank" rel="noopener noreferrer">
              {story.figmaLabel || 'Open case study in Figma'} <span aria-hidden="true">&#8599;</span>
            </a>
          )}
        </div>
      </header>
      {story.graphics && (
        <section className="story-graphics" aria-labelledby="story-graphics-title">
          <h3 id="story-graphics-title">Graphic design</h3>
          <div className="story-graphics-grid">
            {story.graphics.map(({ src, caption, alt, width, height }) => (
              <figure key={src}>
                <img src={src} alt={alt} width={width} height={height} decoding="async" />
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      {(!story.screens || story.designMockup) && (
        <figure className="device-figure">
          <MockupWalkthrough steps={story.walkthrough}>
            <div className="device-spread">
              <div className="laptop-mockup">
                <div className="laptop-lid">
                  <span className="device-camera" />
                  <div className={`laptop-screen ${story.website ? 'laptop-website' : ''}`}>
                    <DeviceMockup project={project} story={story} />
                  </div>
                </div>
                <div className="laptop-base" />
              </div>
              <div className="phone-mockup">
                <span className="phone-camera" />
                <DeviceMockup project={project} story={story} mobile />
                <span className="phone-home" />
              </div>
            </div>
          </MockupWalkthrough>
          <figcaption>{story.website ? 'Live homepage on desktop and mobile' : story.designMockup ? 'Desktop and mobile designs from Figma' : 'Laptop and mobile presentation concepts'}</figcaption>
        </figure>
      )}
      {story.screens && (
        <section className={`story-figma${desktopScreens ? ' story-figma-desktop' : ''}`} aria-labelledby="story-screens-title">
          <h3 id="story-screens-title">{story.screenHeading || 'Mobile screens'}</h3>
          <div className="story-figma-grid">
            {story.screens.map((screen, index) => (
              <GalleryScreen key={screen.src} story={story} screen={screen} index={index} desktop={desktopScreens} />
            ))}
          </div>
        </section>
      )}
      <div className="story-details">
        <aside className="story-facts">
          <dl><dt>My role</dt><dd>{project.role}</dd><dt>Focus</dt><dd><ul>{story.focus.map((focus) => <li key={focus}>{focus}</li>)}</ul></dd></dl>
        </aside>
        <section className="story-direction">
          <h3>Visual direction</h3>
          <p>{story.direction}</p>
          {!story.website && !story.screens && (
            <>
              <div className="story-art"><ProjectArtwork id={project.id} /></div>
              <p className="story-note">Illustrative mockups based on the project artwork.</p>
            </>
          )}
        </section>
      </div>
    </article>
  );
}
