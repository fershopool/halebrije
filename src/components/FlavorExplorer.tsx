import { sitePath } from '../utilities/paths';
import { useEffect, useRef, useState } from 'react';
import { categories, flavors, type Category, type Flavor } from '../data/flavors';
import { Icon } from './Icon';
import { filterFlavors } from '../utilities/flavor-rules.mjs';

const demoNotice = 'Sabores e imágenes DEMO · menú real por confirmar.';

export function FlavorExplorer() {
  const [category, setCategory] = useState<Category>('Todos');
  const [selected, setSelected] = useState<Flavor | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const visible: Flavor[] = filterFlavors(flavors, category) as Flavor[];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selected) return;
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [selected]);

  const closeDetails = () => {
    dialogRef.current?.close();
    setSelected(null);
    triggerRef.current?.focus();
  };

  return (
    <section id="sabores" className="section-shell flavor-explorer" aria-labelledby="flavor-title">
      <p className="eyebrow">Elige tu antojo</p>
      <h2 id="flavor-title">Encuentra tu Halebrije</h2>
      <p className="section-copy">
        Cada sabor tiene una personalidad. Descubre cuál se parece más a ti.
      </p>
      <p className="demo-notice" role="note">
        {demoNotice}
      </p>
      <div className="flavor-filters" role="group" aria-label="Filtrar sabores">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className="filter-button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="flavor-count" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'sabor' : 'sabores'} disponibles en esta selección
        demo.
      </p>
      <div className="flavor-grid">
        {visible.map((flavor) => (
          <article key={flavor.id} className={`flavor-card flavor-card--${flavor.color}`}>
            <img
              src={sitePath(flavor.image)}
              alt={`Imagen DEMO de ${flavor.name}`}
              loading="lazy"
              width="600"
              height="600"
            />
            <div className="flavor-card__body">
              <p className="demo-badge">DEMO</p>
              <p className="flavor-card__personality">{flavor.personality}</p>
              <h3>{flavor.name}</h3>
              <div className="flavor-tags" aria-label={`Notas de ${flavor.name}`}>
                {flavor.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button
                type="button"
                className="text-button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelected(flavor);
                }}
              >
                Conócelo <Icon name="diagonal" />
              </button>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="flavor-dialog"
        aria-labelledby="flavor-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDetails();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
      >
        {selected && (
          <div className="flavor-dialog__content">
            <button
              type="button"
              className="dialog-close"
              aria-label="Cerrar detalle"
              onClick={closeDetails}
            >
              ×
            </button>
            <img
              src={sitePath(selected.image)}
              alt={`Imagen DEMO de ${selected.name}`}
              width="600"
              height="600"
            />
            <p className="eyebrow">Sabor demo</p>
            <h2 id="flavor-dialog-title">{selected.name}</h2>
            <p className="flavor-dialog__personality">{selected.personality}</p>
            <p>{selected.description}</p>
            <p className="demo-badge">Disponibilidad por confirmar.</p>
            <a className="button" href={sitePath('/visitanos/')} onClick={closeDetails}>
              Pregunta por disponibilidad
            </a>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default FlavorExplorer;
