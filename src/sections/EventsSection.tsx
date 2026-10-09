import { EventForm } from '../components/EventForm';
import { Icon } from '../components/Icon';
import { Mandala, PapelPicado } from '../components/Ornaments';
export function EventsSection() {
  return (
    <section className="events-section section-shell" id="eventos" aria-labelledby="events-title">
      <PapelPicado count={20} />
      <Mandala className="events-mandala spin-rev" layers={4} />
      <div className="events-intro" data-reveal="left">
        <span className="small-label">Que el antojo sea parte del plan</span>
        <h2 id="events-title">
          Lleva Halebrije
          <br />a tu evento.
        </h2>
        <p>
          Una celebración también puede tener su propia personalidad. Cuéntanos qué tienes en mente.
        </p>
        <div className="event-types">
          {['Cumpleaños', 'Empresas', 'Escuelas', 'Activaciones', 'Eventos privados'].map(
            (type) => (
              <span key={type}>{type}</span>
            ),
          )}
        </div>
        <div className="event-graphic" aria-hidden="true">
          <span>
            HAZLO
            <br />
            INOLVIDABLE.
          </span>
          <Icon name="spark" />
        </div>
        <p className="fine-print">
          Propuesta de servicio para eventos. Modalidades y condiciones se confirmarán con
          Halebrije.
        </p>
      </div>
      <div className="events-form-wrap" data-reveal="right">
        <h3>Tu evento empieza aquí.</h3>
        <p>Los campos con * son obligatorios.</p>
        <EventForm />
      </div>
    </section>
  );
}
