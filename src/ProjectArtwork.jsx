import React from 'react';

const layouts = {
  sierra: (
    <>
      <span className="ridge ridge-back" />
      <span className="ridge ridge-front" />
      <span className="art-display">SIERRA</span>
    </>
  ),
  formeslice: (
    <>
      <span className="cake"><i /><i /><i /></span>
      <span className="art-display">FormeSlice</span>
    </>
  ),
  novobank: (
    <>
      <span className="bank-card bank-card-back" />
      <span className="bank-card">
        <span>NovoBank</span>
        <i />
        <span className="bank-mark">●●</span>
      </span>
    </>
  ),
  calebrews: (
    <>
      <span className="coffee-cup"><i /></span>
      <span className="art-display">CaleBrews</span>
    </>
  ),
  cinema: (
    <>
      <span className="cinema-screen" />
      <span className="cinema-seats">
        {Array.from({ length: 28 }, (_, index) => <i key={index} />)}
      </span>
    </>
  ),
  neust: (
    <span className="portal-screen">
      <span className="portal-top"><span>NEUST</span><i /><i /><i /></span>
      <span className="portal-body">
        <span className="portal-menu"><i /><i /><i /><i /></span>
        <span className="portal-content"><i /><i /><i /><i /></span>
      </span>
    </span>
  ),
};

export default function ProjectArtwork({ id }) {
  return <span className={`project-art art-${id}`} aria-hidden="true">{layouts[id]}</span>;
}
