import React from 'react';
import ProjectArtwork from './ProjectArtwork.jsx';
import sierraDesktop from './assets/sierra-desktop.jpg';
import sierraMobile from './assets/sierra-mobile.jpg';
import formeslicePoster from '../ImageRequirement/Projects/FormeSliceGraphic/Promotional Poster.png';
import formeslicePrint from '../ImageRequirement/Projects/FormeSliceGraphic/Promotional Poster 2.png';
import novoLogin from './assets/novobank-login.png';
import novoSignup from './assets/novobank-signup.png';
import caleMenu from './assets/calebrews-menu.webp';
import caleInventory from './assets/calebrews-inventory.webp';
import neustLogin from './assets/neust-login.png';
import neustEnrollment from './assets/neust-enrollment.png';

export const featuredCovers = new Set(['sierra', 'formeslice', 'novobank', 'calebrews', 'neust']);

export default function ProjectCover({ id }) {
  if (!featuredCovers.has(id)) return <ProjectArtwork id={id} />;

  if (id === 'novobank') {
    return (
      <span className="project-cover cover-novobank" aria-hidden="true">
        <span className="cover-copy"><strong>NovoBank</strong><span>Mobile banking concept</span></span>
        <span className="cover-novo-devices">
          <span className="cover-novo-phone"><img src={novoLogin} alt="" width="360" height="800" /></span>
          <span className="cover-novo-phone"><img src={novoSignup} alt="" width="360" height="800" /></span>
        </span>
      </span>
    );
  }

  if (id === 'sierra') {
    return (
      <span className="project-cover cover-sierra" aria-hidden="true">
        <span className="cover-sierra-layout">
          <span className="cover-copy"><strong>SIERRA</strong><span>San Isidro Environmental Reporting System</span></span>
          <span className="cover-sierra-devices">
            <span className="cover-sierra-laptop">
              <span className="cover-sierra-lid"><img src={sierraDesktop} alt="" width="1270" height="714" /></span>
              <span className="cover-sierra-base" />
            </span>
            <span className="cover-sierra-phone"><img src={sierraMobile} alt="" width="380" height="822" /></span>
          </span>
        </span>
      </span>
    );
  }

  if (id === 'formeslice') {
    return (
      <span className="project-cover cover-formeslice" aria-hidden="true">
        <img className="cover-formeslice-photo" src={formeslicePrint} alt="" />
        <img className="cover-formeslice-poster" src={formeslicePoster} alt="" />
        <span className="cover-copy"><strong>ForméSlice</strong><span>Your Flavor. Your Formation.</span></span>
      </span>
    );
  }

  if (id === 'calebrews') {
    return (
      <span className="project-cover cover-calebrews" aria-hidden="true">
        <span className="cover-cale-layout">
          <span className="cover-copy">
            <strong>CaleBrews</strong>
            <span>Point of sale &amp; inventory</span>
          </span>
          <span className="cover-cale-screens">
            <img className="cover-cale-inventory" src={caleInventory} alt="" width="1280" height="800" />
            <img className="cover-cale-menu" src={caleMenu} alt="" width="1280" height="800" />
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className="project-cover cover-neust" aria-hidden="true">
      <span className="cover-copy"><strong>NEUST</strong><span>Student Portal Redesign</span></span>
      <img className="cover-neust-login" src={neustLogin} alt="" />
      <img className="cover-neust-enrollment" src={neustEnrollment} alt="" />
    </span>
  );
}
