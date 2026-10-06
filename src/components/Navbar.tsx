import { sitePath } from '../utilities/paths';
import { useRef, useState } from 'react';
import { brand, navigation } from '../config/brand';
import { Icon } from './Icon';
type Props = { onOrder: () => void; path?: string };

export function Navbar({ onOrder, path = '/' }: Props) {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  function closeMenu() {
    setOpen(false);
    toggle.current?.focus();
  }
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (open && event.key === 'Escape') closeMenu();
        }}
      >
        <a className="brand-lockup" href={sitePath('/')} aria-label="Halebrije, inicio">
          <img src={sitePath('/images/logo.webp')} width="48" height="48" alt="" />
          <span>
            <strong>
              HALEBRIJE<span className="wordmark-star">✳</span>
            </strong>
            <small>Helados artesanales</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((link) => (
            <a
              key={sitePath(link.href)}
              href={sitePath(link.href)}
              aria-current={path === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="instagram-nav"
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Halebrije en Instagram (abre otra pestaña)"
          >
            <Icon name="instagram" />
          </a>
          <button className="button button-dark nav-order" onClick={onOrder}>
            <Icon name="bag" />
            Pedir
          </button>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </header>
      {open && (
        <div
          className="mobile-menu"
          id="mobile-menu"
          ref={menu}
          onKeyDown={(event) => {
            if (event.key === 'Escape') closeMenu();
            if (event.key === 'Tab') {
              const links = menu.current?.querySelectorAll<HTMLAnchorElement>('a');
              if (!event.shiftKey && document.activeElement === links?.[links.length - 1])
                closeMenu();
            }
          }}
        >
          <nav aria-label="Navegación móvil">
            {navigation.map((link) => (
              <a
                key={sitePath(link.href)}
                href={sitePath(link.href)}
                aria-current={path === link.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <Icon name="diagonal" />
              </a>
            ))}
          </nav>
          <p>Un antojo. Muchas personalidades.</p>
        </div>
      )}
    </>
  );
}
