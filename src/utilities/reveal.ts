import { useEffect } from 'react';

/**
 * Revela con animación todo elemento `[data-reveal]` al entrar en pantalla.
 * Sin JS (o con prefers-reduced-motion) el contenido queda visible: el CSS solo
 * oculta cuando <html> tiene la clase `reveal-on`, que se pone aquí.
 * Uso: <div data-reveal> | data-reveal="left|right|zoom|up" | style={{'--d': '120ms'}} para retraso.
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    const scan = () =>
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    root.classList.add('reveal-on');
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('contenido') ?? document.body, {
      childList: true,
      subtree: true,
    });
    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove('reveal-on');
    };
  }, []);
}
