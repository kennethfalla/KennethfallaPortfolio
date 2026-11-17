import React, { useEffect, useRef } from 'react';

const hoverTargets = 'a[href], button:not(:disabled), [data-mockup-screen]';

export function CursorLens({ lensRef }) {
  return <span ref={lensRef} className="cursor-lens" aria-hidden="true" hidden />;
}

export default function HoverCursor({ enabled, preview }) {
  const pageLens = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    let activeTarget;
    let activeLens;
    const clear = () => {
      activeTarget?.removeAttribute('data-cursor-active');
      if (activeLens) activeLens.hidden = true;
      activeTarget = null;
      activeLens = null;
    };

    const move = (event) => {
      const target = event.pointerType === 'mouse' && event.target instanceof Element
        ? event.target.closest(hoverTargets)
        : null;
      if (!target) {
        clear();
        return;
      }

      const dialog = target.closest('dialog[open]');
      const lens = dialog ? dialog.querySelector('.cursor-lens') : pageLens.current;
      if (!lens) return;
      if (activeTarget !== target) {
        clear();
        activeTarget = target;
        activeLens = lens;
        target.setAttribute('data-cursor-active', '');
      }
      lens.style.translate = `${event.clientX}px ${event.clientY}px`;
      lens.hidden = false;
    };

    const leave = (event) => {
      if (!event.relatedTarget) clear();
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', clear);
    window.addEventListener('scroll', clear, true);
    window.addEventListener('keydown', clear);

    return () => {
      clear();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', clear);
      window.removeEventListener('scroll', clear, true);
      window.removeEventListener('keydown', clear);
    };
  }, [enabled, preview]);

  return <CursorLens lensRef={pageLens} />;
}
