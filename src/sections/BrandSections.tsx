import { sitePath } from '../utilities/paths';
import { Icon } from '../components/Icon';
import { brand } from '../config/brand';
import { content } from '../data/content';
import { socialPosts } from '../data/social';

export function FlavorRibbon() {
  return (
    <div className="flavor-ribbon" aria-hidden="true">
      <div>
        {content.seasonal.ribbon.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function SeasonalFlavor() {
  return (
    <section className="seasonal-section section-shell" aria-labelledby="season-title">
      <div className="seasonal-copy">
        <span className="pill pill-light">{content.seasonal.label}</span>
        <h2 id="season-title">
          {content.seasonal.titleLines.map((line, index) => (
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
          <span>.</span>
        </h2>
        <p className="seasonal-subtitle">
          {content.seasonal.subtitleLines.map((line, index) => (
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
        <p>{content.seasonal.copy}</p>
        <a className="button button-lime" href={brand.instagram} target="_blank" rel="noreferrer">
          {content.seasonal.cta}
          <Icon name="diagonal" />
        </a>
        <small>
          {content.seasonal.noticeLines.map((line, index) => (
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
        </small>
      </div>
      <figure className="seasonal-art">
        <img
          src={sitePath('/images/social-temporada.webp')}
          width="360"
          height="640"
          alt={content.seasonal.imageAlt}
          loading="lazy"
        />
        <figcaption>
          {content.seasonal.caption} <Icon name="instagram" />
        </figcaption>
        <span className="seasonal-burst" aria-hidden="true">
          ✳
        </span>
      </figure>
    </section>
  );
}

export function CraftSection() {
  return (
    <section className="craft-section section-shell" aria-labelledby="craft-title">
      <div className="section-heading">
        <div>
          <span className="small-label">{content.craft.label}</span>
          <h2 id="craft-title">
            {content.craft.titleLines.map((line, index) => (
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
          </h2>
        </div>
        <p>{content.craft.intro}</p>
      </div>
      <div className="craft-layout">
        <figure className="craft-photo">
          <img
            src={sitePath('/images/hero-small.webp')}
            width="540"
            height="675"
            loading="lazy"
            alt={content.craft.imageAlt}
          />
          <figcaption>{content.craft.caption}</figcaption>
        </figure>
        <div className="craft-steps">
          {content.craft.steps.map(([number, title, copy]) => (
            <div className="craft-step" key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <Icon name="spark" />
            </div>
          ))}
          <p className="fine-print">{content.craft.notice}</p>
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section className="story-section section-shell" aria-labelledby="story-title">
      <div className="story-intro">
        <span className="small-label">{content.story.label}</span>
        <h2 id="story-title">
          {content.story.titleLines.map((line, index) => (
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
        </h2>
        <p>{content.story.copy}</p>
        <a className="text-link" href={brand.instagram} target="_blank" rel="noreferrer">
          {content.story.cta}
          <Icon name="diagonal" />
        </a>
      </div>
      <div className="story-panel">
        <div className="story-mark" aria-hidden="true">
          <img src={sitePath('/images/logo.webp')} width="150" height="150" alt="" />
          <span>
            HALE
            <br />
            BRIJE
          </span>
        </div>
        <div className="story-chapters">
          {content.story.chapters.map((chapter) => (
            <details key={chapter}>
              <summary>
                {chapter}
                <span>+</span>
              </summary>
              <p>{content.story.chapterCopy}</p>
            </details>
          ))}
        </div>
        <p className="fine-print">{content.story.notice}</p>
      </div>
    </section>
  );
}

export function SocialGrid() {
  return (
    <section className="social-section section-shell" aria-labelledby="social-title">
      <div className="section-heading">
        <div>
          <span className="small-label">{content.social.label}</span>
          <h2 id="social-title">{content.social.title}</h2>
        </div>
        <a className="text-link" href={brand.instagram} target="_blank" rel="noreferrer">
          <Icon name="instagram" />
          {brand.handle}
          <Icon name="diagonal" />
        </a>
      </div>
      <div className="social-grid">
        {socialPosts.map((post) => (
          <a
            className="social-post"
            key={sitePath(post.image)}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${post.title}. Ver publicación en Instagram (abre otra pestaña)`}
          >
            <img
              src={sitePath(post.image)}
              alt={post.alt}
              loading="lazy"
              width="360"
              height="450"
            />
            <span className="social-overlay">
              <span>{post.title}</span>
              <Icon name="instagram" />
            </span>
          </a>
        ))}
      </div>
      <div className="social-bottom">
        <p>{content.social.caption}</p>
        <a
          href={brand.instagram}
          target="_blank"
          rel="noreferrer"
          className="button button-outline"
        >
          {content.social.cta}
          <Icon name="diagonal" />
        </a>
      </div>
    </section>
  );
}
