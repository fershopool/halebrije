import { Fragment, type CSSProperties } from 'react';
import { sitePath } from '../utilities/paths';
import { Icon } from '../components/Icon';
import { Mandala, Flower, Feather, Eye, PapelPicado, PatternStrip } from '../components/Ornaments';
import { brand } from '../config/brand';
import { content } from '../data/content';
import { socialPosts } from '../data/social';

const craftDecor = [Flower, Feather, Eye, Mandala];

export function FlavorRibbon() {
  const items = content.seasonal.ribbon.map((item, index) => (
    <span key={`${item}-${index}`} className="flavor-ribbon__item">
      {item}
    </span>
  ));
  return (
    <div className="flavor-ribbon" aria-hidden="true">
      <div className="flavor-ribbon__track">
        <div className="flavor-ribbon__group">{items}</div>
        <div className="flavor-ribbon__group">{items}</div>
      </div>
    </div>
  );
}

export function SeasonalFlavor() {
  return (
    <section className="seasonal-section section-shell" aria-labelledby="season-title">
      <span className="season-star s1 spin-slow" aria-hidden="true">
        ✳
      </span>
      <span className="season-star s2 spin-rev" aria-hidden="true">
        ✦
      </span>
      <span className="season-star s3 spin-slow" aria-hidden="true">
        ✸
      </span>
      <div className="seasonal-copy" data-reveal="left">
        <span className="pill pill-light">{content.seasonal.label}</span>
        <h2 id="season-title" className="font-fun season-title rainbow-text">
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
      <figure className="seasonal-art" data-reveal="zoom">
        <Mandala className="season-mandala spin-slow" />
        <Mandala className="season-mandala season-mandala-2 spin-rev" />
        <div className="season-frame pat-rays">
          <img
            src={sitePath('/images/social-temporada.webp')}
            width="360"
            height="640"
            alt={content.seasonal.imageAlt}
            loading="lazy"
          />
        </div>
        <Feather className="season-feather season-feather-1" />
        <Feather className="season-feather season-feather-2" />
        <Eye className="season-eye" />
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
        <figure className="craft-photo" data-reveal="left">
          <Flower className="craft-flower craft-flower-1" />
          <Flower className="craft-flower craft-flower-2" />
          <div className="craft-frame">
            <img
              src={sitePath('/images/hero-small.webp')}
              width="540"
              height="675"
              loading="lazy"
              alt={content.craft.imageAlt}
            />
          </div>
          <figcaption>{content.craft.caption}</figcaption>
        </figure>
        <div className="craft-steps">
          {content.craft.steps.map(([number, title, copy], index) => {
            const Deco = craftDecor[index % craftDecor.length];
            return (
              <Fragment key={number}>
                {index > 0 && <PatternStrip kind="dots" className="craft-connector" />}
                <div
                  className={`craft-step tone-${index % 4}`}
                  data-reveal="up"
                  style={{ '--d': `${index * 120}ms` } as CSSProperties}
                >
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <Deco className="craft-deco" />
                </div>
              </Fragment>
            );
          })}
          <p className="fine-print">{content.craft.notice}</p>
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section className="story-section section-shell" aria-labelledby="story-title">
      <div className="story-intro" data-reveal="left">
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
      <div className="story-panel" data-reveal="right">
        <div className="story-papel" aria-hidden="true">
          <PapelPicado count={14} />
        </div>
        <div className="story-mark" aria-hidden="true">
          <Mandala className="story-mandala spin-slow" />
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
        {socialPosts.map((post, index) => (
          <a
            className={`social-post tone-${index % 6}`}
            key={sitePath(post.image)}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${post.title}. Ver publicación en Instagram (abre otra pestaña)`}
            data-reveal="zoom"
            style={{ '--d': `${(index % 6) * 90}ms` } as CSSProperties}
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
      <PatternStrip kind="diamonds" className="social-separator" />
      <div className="social-bottom" data-reveal="up">
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
