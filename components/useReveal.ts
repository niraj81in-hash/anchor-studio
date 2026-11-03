import { useEffect } from 'react';

// Scroll-triggered reveal: fades in `.reveal` elements as they enter the
// viewport. Any page that uses the `.reveal` class must call this, or those
// elements stay at opacity:0 forever (there is no observer otherwise).
export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
