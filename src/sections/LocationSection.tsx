import { useState } from 'react';
import { Icon } from '../components/Icon';
import { location } from '../data/locations';
import { brand } from '../config/brand';
export function LocationSection() {
  const [showMap, setShowMap] = useState(false);
  return (
    <section
      className="location-section section-shell"
      id="visitanos"
      aria-labelledby="location-title"
    >
      <div className="location-info">
        <span className="small-label">El antojo ya tiene destino</span>
        <h2 id="location-title">
          Visita
          <br />
          Halebrije<span className="tiny-spark">✳</span>
        </h2>
        <h3>{location.name}</h3>
        <p className="location-local">{location.local}</p>
        <address>{location.address}</address>
        <p>{location.reference}</p>
        <p className="location-hours">
          <Icon name="clock" />
          {location.hours || 'Consulta los horarios actuales en Instagram.'}
        </p>
        <div className="location-actions">
          <a
            className="button button-dark"
            href={location.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Cómo llegar
            <Icon name="diagonal" />
          </a>
          <a className="text-link" href={brand.instagram} target="_blank" rel="noreferrer">
            Consultar horarios
            <Icon name="diagonal" />
          </a>
        </div>
      </div>
      <div className="location-map">
        {showMap ? (
          <iframe
            src={location.mapEmbed}
            title="Mapa de Town Center El Rosario"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="map-placeholder">
            <div className="map-streets" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="map-pin">
              <Icon name="pin" />
              <span>
                Tu próximo
                <br />
                Halebrije
              </span>
            </div>
            <div className="map-caption">
              <p>
                Town Center
                <br />
                <strong>El Rosario</strong>
              </p>
              <button className="button button-light" onClick={() => setShowMap(true)}>
                Cargar mapa
                <Icon name="diagonal" />
              </button>
              <small>Al cargar, se conecta con Google Maps.</small>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
