import { brand } from '../config/brand';

export type EventFormData = {
  name: string;
  phone: string;
  email: string;
  date: string;
  eventType: string;
  guests: string;
  location: string;
  message: string;
};

export const getLocalToday = (): string => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const local = new Date(today.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
};

export const buildEventSummary = (data: EventFormData): string => {
  const lines = [
    `Solicitud de cotización para evento — ${brand.name}`,
    `Nombre: ${data.name}`,
    `Teléfono: ${data.phone}`,
    data.email ? `Correo: ${data.email}` : '',
    `Fecha: ${data.date}`,
    `Tipo de evento: ${data.eventType}`,
    `Personas: ${data.guests}`,
    `Ubicación: ${data.location}`,
    data.message ? `Mensaje: ${data.message}` : '',
  ];
  return lines.filter(Boolean).join('\n');
};

export const submitEvent = async (data: EventFormData, endpoint: string): Promise<void> => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  } finally {
    window.clearTimeout(timeout);
  }
};
