import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function MockupScreen({ name, touch = false, children, frames = [] }) {
  return (
    <div className={`mockup-screen${touch ? ' mockup-screen-touch' : ''}`} data-mockup-screen={name}>
      <div className="mockup-frames">
        <div className="mockup-frame">{children}</div>
        {frames.map((frame, index) => <div className="mockup-frame" key={index} aria-hidden="true">{frame}</div>)}
      </div>
      <span className="mockup-pointer" aria-hidden="true" />
      <span className="mockup-ripple" aria-hidden="true" />
    </div>
  );
}

const playbackLabels = {
  idle: 'Play demo',
  paused: 'Resume demo',
  playing: 'Pause demo',
  complete: 'Replay demo',
};
const visibleThreshold = 0.28;

export default function MockupWalkthrough({ steps, children }) {
  const scope = useRef(null);
  const playback = useRef(null);
  const [status, setStatus] = useState('idle');

  useLayoutEffect(() => {
    const element = scope.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        paused: true,
        onStart: () => setStatus('playing'),
        onComplete: () => setStatus('complete'),
      });
      playback.current = timeline;
      let lastPointer;

      for (const { screen, point, swipe, next } of steps) {
        const surface = element.querySelector(`[data-mockup-screen="${screen}"]`);
        const pointer = surface.querySelector('.mockup-pointer');
        const ripple = surface.querySelector('.mockup-ripple');
        const [x, y] = point;
        if (lastPointer !== pointer) {
          if (lastPointer) timeline.to(lastPointer, { autoAlpha: 0, duration: 0.2 });
          timeline.set(pointer, { left: `${Math.min(x + 13, 96)}%`, top: `${Math.min(y + 8, 96)}%` });
        }

        timeline.to(pointer, { autoAlpha: 1, left: `${x}%`, top: `${y}%`, duration: 0.55, ease: 'power2.inOut' }, '+=0.16');
        if (swipe) {
          timeline.to(pointer, { top: `${y - swipe}%`, duration: 0.65, ease: 'power2.out' });
          timeline.to(surface.querySelector('.mockup-frames'), {
            scale: 1.17, yPercent: -13, transformOrigin: 'center top', duration: 0.7, ease: 'power2.out',
          }, '<');
        } else {
          timeline.set(ripple, { left: `${x}%`, top: `${y}%` });
          timeline.fromTo(ripple, { autoAlpha: 1, scale: 0.35 }, { autoAlpha: 0, scale: 1.75, duration: 0.38, immediateRender: false });
          timeline.to(pointer, { scale: 0.82, duration: 0.12, repeat: 1, yoyo: true }, '<');
        }

        if (next) timeline.to(surface.querySelectorAll('.mockup-frame')[next], { autoAlpha: 1, duration: 0.32 }, '-=0.06');
        lastPointer = pointer;
      }

      timeline.to(lastPointer, { autoAlpha: 0, duration: 0.28 }, '+=0.55');
    }, element);

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.intersectionRatio >= visibleThreshold) || reducedMotion.matches) return;
      observer.disconnect();
      if (playback.current.totalTime() === 0 && playback.current.paused()) playback.current.play();
    }, { threshold: visibleThreshold });
    observer.observe(element);

    const respectPreference = (event) => {
      if (event.matches && playback.current.isActive()) {
        playback.current.pause(0);
        setStatus('idle');
      }
    };
    reducedMotion.addEventListener('change', respectPreference);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener('change', respectPreference);
      context.revert();
      playback.current = null;
    };
  }, [steps]);

  const togglePlayback = () => {
    const timeline = playback.current;
    if (status === 'playing') {
      timeline.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      timeline.resume();
      setStatus('playing');
    } else {
      timeline.restart();
    }
  };

  return (
    <div className="mockup-walkthrough" ref={scope}>
      {children}
      <button className="mockup-playback" type="button" onClick={togglePlayback}>
        <span aria-hidden="true">{status === 'playing' ? 'Ⅱ' : '▶'}</span> {playbackLabels[status]}
      </button>
    </div>
  );
}
