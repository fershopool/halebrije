import { sitePath } from '../utilities/paths';
import { useState } from 'react';
import { flavors, moodOptions, type Mood } from '../data/flavors';
import { recommendFlavor } from '../utilities/flavor-rules.mjs';
import { Icon } from './Icon';
import { Feather, Flower, Mandala, PatternStrip, PapelPicado } from './Ornaments';

export function PersonalityQuiz() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [shareMessage, setShareMessage] = useState('');
  const result = mood ? recommendFlavor(flavors, mood) : null;

  const reset = () => {
    setMood(null);
    setShareMessage('');
  };
  const share = async () => {
    if (!result) return;
    const text = `Resultado DEMO de la propuesta Halebrije. Mi Halebrije es ${result.name}: ${result.personality}.`;
    try {
      if (navigator.share) await navigator.share({ title: 'Mi Halebrije', text });
      else {
        await navigator.clipboard.writeText(text);
        setShareMessage('Resultado copiado.');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(text);
        setShareMessage('Resultado copiado.');
      } catch {
        setShareMessage('No pudimos compartirlo; puedes copiarlo manualmente.');
      }
    }
  };

  return (
    <section id="quiz" className="quiz-section section-shell" aria-labelledby="quiz-title">
      <PatternStrip kind="zigzag" className="quiz-strip" />
      <p className="eyebrow">Un minuto, una personalidad</p>
      <h2 id="quiz-title">¿Qué Halebrije eres?</h2>
      <p className="section-copy">Responde con tu antojo de hoy y encuentra tu match.</p>
      <fieldset className="quiz-options">
        <legend>Hoy quieres algo…</legend>
        {moodOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className="quiz-option"
            aria-pressed={mood === option.id}
            onClick={() => {
              setMood(option.id);
              setShareMessage('');
            }}
          >
            <Flower className="quiz-option__flower" />
            <Icon name={option.symbol} />
            <span>{option.title}</span>
            <small>{option.subtitle}</small>
          </button>
        ))}
      </fieldset>
      {result && (
        <div className="quiz-result" aria-live="polite">
          <Mandala className="quiz-result__mandala spin-slow" />
          <PapelPicado count={10} />
          <Feather className="quiz-result__confetti quiz-result__confetti--a" />
          <Flower className="quiz-result__confetti quiz-result__confetti--b" />
          <img
            src={sitePath(result.image)}
            alt={`Imagen DEMO de ${result.name}`}
            loading="lazy"
            width="600"
            height="600"
          />
          <div>
            <p className="demo-badge">Resultado demo</p>
            <h3>{result.name}</h3>
            <p>{result.personality}</p>
            <div className="quiz-result__actions">
              <a className="button" href="#sabores">
                Ver sabores
              </a>
              <button type="button" className="text-button" onClick={share}>
                Compartir resultado
              </button>
              <button type="button" className="text-button" onClick={reset}>
                Intentarlo de nuevo
              </button>
            </div>
            {shareMessage && (
              <p className="share-message" role="status">
                {shareMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default PersonalityQuiz;
