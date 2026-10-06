import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { brand } from '../config/brand';
import {
  buildEventSummary,
  getLocalToday,
  submitEvent,
  type EventFormData,
} from '../utilities/events';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const initialData: EventFormData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  eventType: '',
  guests: '',
  location: '',
  message: '',
};

const eventTypes = [
  'Boda',
  'Cumpleaños',
  'Evento corporativo',
  'Celebración privada',
  'Escuelas',
  'Activaciones',
  'Otro',
];
const subscribeToDate = () => () => {};
const getServerDate = () => '';

export const EventForm = () => {
  const [data, setData] = useState<EventFormData>(initialData);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [summary, setSummary] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const today = useSyncExternalStore(subscribeToDate, getLocalToday, getServerDate);
  const isDemo = !brand.eventsEndpoint;

  const update = (field: keyof EventFormData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const phone = form.elements.namedItem('phone') as HTMLInputElement;
    phone.setCustomValidity('');
    const phoneValue = data.phone.trim();
    const phoneDigits = phoneValue.replace(/\D/g, '').length;
    if (!/^[+\d\s().-]+$/.test(phoneValue) || phoneDigits < 8 || phoneDigits > 15) {
      phone.setCustomValidity('Escribe un teléfono válido.');
    }
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const location = form.elements.namedItem('location') as HTMLInputElement;
    name.setCustomValidity(data.name.trim() ? '' : 'Escribe tu nombre completo.');
    location.setCustomValidity(data.location.trim() ? '' : 'Escribe la ubicación del evento.');
    if (!form.reportValidity()) return;

    setStatus('loading');
    setErrorMessage('');
    setCopied(false);
    if (isDemo) {
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
      setSummary(buildEventSummary(data));
      setStatus('success');
      return;
    }

    try {
      await submitEvent(data, brand.eventsEndpoint);
      setStatus('success');
      setSummary('Recibimos tu solicitud. Te contactaremos pronto para revisar los detalles.');
      setData(initialData);
    } catch {
      setStatus('error');
      setErrorMessage('No pudimos enviar la solicitud. Revisa tu conexión e inténtalo de nuevo.');
    }
  };

  const reset = () => {
    setData(initialData);
    setStatus('idle');
    setSummary('');
    setErrorMessage('');
    setCopied(false);
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  const downloadSummary = () => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    link.download = 'resumen-evento-halebrije.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit} noValidate={false}>
      {isDemo && (
        <p className="form-status">Vista de presentación: prepara un resumen, sin enviar datos.</p>
      )}
      <div className="form-grid">
        <label className="form-field">
          <span>Nombre completo *</span>
          <input
            required
            name="name"
            type="text"
            maxLength={100}
            autoComplete="name"
            value={data.name}
            onChange={(e) => {
              e.currentTarget.setCustomValidity('');
              update('name', e.target.value);
            }}
          />
        </label>
        <label className="form-field">
          <span>Teléfono *</span>
          <input
            required
            name="phone"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            inputMode="tel"
            value={data.phone}
            onChange={(e) => {
              e.currentTarget.setCustomValidity('');
              update('phone', e.target.value);
            }}
          />
        </label>
        <label className="form-field">
          <span>Correo electrónico</span>
          <input
            name="email"
            type="email"
            maxLength={160}
            autoComplete="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </label>
        <label className="form-field">
          <span>Fecha del evento *</span>
          <input
            required
            name="date"
            type="date"
            min={today}
            value={data.date}
            onInput={(e) => update('date', e.currentTarget.value)}
            onChange={(e) => update('date', e.target.value)}
          />
        </label>
        <label className="form-field">
          <span>Tipo de evento *</span>
          <select
            required
            name="eventType"
            value={data.eventType}
            onChange={(e) => update('eventType', e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="form-field">
          <span>Número de personas *</span>
          <input
            required
            name="guests"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={data.guests}
            onChange={(e) => update('guests', e.target.value)}
          />
        </label>
        <label className="form-field field-wide">
          <span>Ubicación del evento *</span>
          <input
            required
            name="location"
            type="text"
            maxLength={160}
            autoComplete="street-address"
            value={data.location}
            onChange={(e) => {
              e.currentTarget.setCustomValidity('');
              update('location', e.target.value);
            }}
          />
        </label>
        <label className="form-field field-wide">
          <span>Cuéntanos más sobre tu evento</span>
          <textarea
            name="message"
            rows={4}
            maxLength={1000}
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
          />
        </label>
      </div>
      {status === 'loading' && (
        <p className="form-status" role="status">
          {isDemo ? 'Preparando tu resumen…' : 'Enviando tu solicitud…'}
        </p>
      )}
      {status === 'error' && (
        <p className="form-status error" role="alert">
          {errorMessage}
        </p>
      )}
      {status === 'success' && (
        <div className="form-summary" role="status">
          <p>{isDemo ? 'Resumen preparado. Esta propuesta no envía solicitudes.' : summary}</p>
          {isDemo && <pre>{summary}</pre>}
          {isDemo && (
            <div className="form-actions">
              <button className="button button-dark" type="button" onClick={copySummary}>
                {copied ? 'Copiado' : 'Copiar resumen'}
              </button>
              <button className="button" type="button" onClick={downloadSummary}>
                Descargar resumen
              </button>
            </div>
          )}
        </div>
      )}
      <div className="form-actions">
        <button className="button button-dark" type="submit" disabled={status === 'loading'}>
          {status === 'loading'
            ? isDemo
              ? 'Preparando…'
              : 'Enviando…'
            : isDemo
              ? 'Preparar cotización'
              : 'Solicitar cotización'}
        </button>
        {(status === 'error' || status === 'success') && (
          <button className="button" type="button" onClick={reset}>
            {status === 'error' ? 'Reintentar' : 'Nueva solicitud'}
          </button>
        )}
      </div>
    </form>
  );
};
