import { sitePath } from '../utilities/paths';
import { Icon } from '../components/Icon';
import { content } from '../data/content';
import { location } from '../data/locations';

export function Hero() {
  return (
    <section className="hero section-shell" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">
          <span className="tiny-spark">✳</span>
          {content.hero.kicker}
        </p>
        <h1 id="hero-title">
          {content.hero.titleLines.map((line, index) => (
            <span key={line}>
              {index > 0 && (
                <>
                  {' '}
                  <br />
                </>
              )}
              {line}
            </span>
          ))}
          <span className="hero-period">.</span>
        </h1>
        <p className="hero-description">
          {content.hero.descriptionLines.map((line, index) => (
            <span key={line}>
              {index > 0 && (
                <>
                  {' '}
                  <br />
                </>
              )}
              {line}
            </span>
          ))}
        </p>
        <div className="hero-actions">
          <a href="#sabores" className="button button-dark">
            {content.hero.primaryCta}
            <Icon />
          </a>
          <a className="button button-outline" href="#visitanos">
            <Icon name="pin" />
            {content.hero.visitCta}
          </a>
        </div>
        <a href="#visitanos" className="hero-location">
          <span className="location-dot" />
          {location.name}
          <Icon name="diagonal" />
        </a>
      </div>
      <div className="hero-art">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={sitePath('/images/hero.webp')}
            srcSet={`${sitePath('/images/hero-small.webp')} 540w, ${sitePath('/images/hero.webp')} 900w`}
            sizes="(max-width: 700px) 85vw, 45vw"
            width="900"
            height="1125"
            fetchPriority="high"
            alt={content.hero.imageAlt}
          />
        </div>
        <div className="hero-sticker">
          <Icon name="spark" />
          <span>
            {content.hero.stickerLines.map((line, index) => (
              <span key={line}>
                {index > 0 && (
                  <>
                    {' '}
                    <br />
                  </>
                )}
                {line}
              </span>
            ))}
          </span>
        </div>
        <span className="floating-spark spark-orange" aria-hidden="true">
          ✳
        </span>
        <svg className="hero-doodle" viewBox="0 0 100 80" fill="none" aria-hidden="true">
          <path
            d="M8 10c15-8 29 8 19 20-10 13-26 10-20 24 5 15 47 22 71-16M64 33l20 2-5 19"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <span className="concept-caption">{content.hero.caption}</span>
      </div>
      <div className="hero-bottom">
        <span>{content.hero.bottom}</span>
        <a href="#sabores" aria-label={content.hero.discover}>
          {content.hero.discover}
          <Icon />
        </a>
      </div>
    </section>
  );
}
