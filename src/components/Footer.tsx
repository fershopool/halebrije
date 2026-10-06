import { sitePath } from '../utilities/paths';
import { Icon } from './Icon';
import { brand, navigation } from '../config/brand';
export function Footer({ onOrder }: { onOrder: () => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-top section-shell">
        <div>
          <span className="small-label">Tu antojo tiene personalidad</span>
          <h2>
            Encuentra
            <br />
            tu Halebrije.
          </h2>
        </div>
        <button className="button button-lime" onClick={onOrder}>
          Vamos por un helado
          <Icon />
        </button>
      </div>
      <div className="footer-main section-shell">
        <a className="footer-brand" href={sitePath('/')}>
          HALEBRIJE<span>Helados artesanales</span>
        </a>
        <nav aria-label="Navegación de pie de página">
          {navigation.slice(1).map((link) => (
            <a key={sitePath(link.href)} href={sitePath(link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="footer-instagram" href={brand.instagram} target="_blank" rel="noreferrer">
          <Icon name="instagram" />
          {brand.handle}
        </a>
      </div>
      <div className="footer-bottom section-shell">
        <span>© {brand.copyrightYear} Halebrije</span>
        <span>Propuesta digital · contenido DEMO identificado</span>
        <a href="#contenido">
          Volver arriba
          <Icon name="diagonal" />
        </a>
      </div>
    </footer>
  );
}
