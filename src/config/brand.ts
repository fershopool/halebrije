export const brand = {
  name: 'Halebrije',
  copyrightYear: 2026,
  tagline: 'Helados fuera de este mundo.',
  instagram: 'https://www.instagram.com/halebrije_helados/',
  handle: '@halebrije_helados',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  whatsappMessage:
    import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE ||
    'Hola, quiero conocer los sabores disponibles en Halebrije.',
  eventsEndpoint: import.meta.env.VITE_EVENTS_ENDPOINT || '',
  siteUrl: import.meta.env.VITE_SITE_URL || '',
  isProposal: import.meta.env.VITE_IS_PROPOSAL !== 'false',
};

export const navigation = [
  { label: 'Inicio', href: '/' },
  { label: 'Sabores', href: '/sabores/' },
  { label: 'Nuestra historia', href: '/nuestra-historia/' },
  { label: 'Eventos', href: '/eventos/' },
  { label: 'Visítanos', href: '/visitanos/' },
];
