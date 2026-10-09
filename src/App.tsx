import { sitePath } from './utilities/paths';
import { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OrderDialog } from './components/OrderDialog';
import { FlavorExplorer } from './components/FlavorExplorer';
import { PersonalityQuiz } from './components/PersonalityQuiz';
import { Icon } from './components/Icon';
import { Hero } from './sections/Hero';
import {
  FlavorRibbon,
  SeasonalFlavor,
  CraftSection,
  StorySection,
  SocialGrid,
} from './sections/BrandSections';
import { LocationSection } from './sections/LocationSection';
import { EventsSection } from './sections/EventsSection';
import { brand, navigation } from './config/brand';
import { pages } from './data/pages';
import { useReveal } from './utilities/reveal';

export function App({ path = '/' }: { path?: string }) {
  const pagePath = path === '/' ? path : `${path.replace(/\/$/, '')}/`;
  const page = pages.find((page) => page.path === pagePath);
  useReveal();
  const orderDialog = useRef<HTMLDialogElement>(null);
  function order() {
    const number = brand.whatsappNumber.replace(/\D/g, '');
    if (/^[1-9]\d{7,14}$/.test(number)) {
      window.open(
        `https://wa.me/${number}?text=${encodeURIComponent(brand.whatsappMessage)}`,
        '_blank',
        'noopener,noreferrer',
      );
    } else orderDialog.current?.showModal();
  }
  return (
    <>
      <Navbar onOrder={order} path={pagePath} />
      <main id="contenido" tabIndex={-1}>
        {pagePath === '/' ? (
          <>
            <Hero />
            <FlavorRibbon />
            <FlavorExplorer />
            <PersonalityQuiz />
            <SeasonalFlavor />
            <CraftSection />
            <StorySection />
            <SocialGrid />
            <LocationSection />
            <EventsSection />
          </>
        ) : (
          <>
            <div className="page-intro section-shell">
              <a className="text-link" href={sitePath('/')}>
                Inicio <span>/ {navigationLabel(pagePath)}</span>
              </a>
              <h1>{page?.headline || 'Esta criatura aún no existe.'}</h1>
              {!page && (
                <a className="button button-dark" href={sitePath('/')}>
                  Volver al inicio
                  <Icon />
                </a>
              )}
            </div>
            {pagePath === '/sabores/' && (
              <>
                <FlavorExplorer />
                <PersonalityQuiz />
                <SeasonalFlavor />
              </>
            )}
            {pagePath === '/nuestra-historia/' && (
              <>
                <StorySection />
                <CraftSection />
              </>
            )}
            {pagePath === '/eventos/' && <EventsSection />}
            {pagePath === '/visitanos/' && (
              <>
                <LocationSection />
                <SocialGrid />
              </>
            )}
          </>
        )}
      </main>
      <Footer onOrder={order} />
      <button className="floating-order" onClick={order} aria-label="Pedir Halebrije">
        <Icon name="bag" />
        <span>Pedir</span>
        <Icon name="diagonal" />
      </button>
      <OrderDialog dialogRef={orderDialog} />
    </>
  );
}

function navigationLabel(path: string) {
  return navigation.find((link) => link.href === path)?.label || 'Página no encontrada';
}
