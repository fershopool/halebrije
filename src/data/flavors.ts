export const categories = [
  'Todos',
  'Cremosos',
  'Frutales',
  'Intensos',
  'Especiales',
  'Temporada',
] as const;
export type Category = (typeof categories)[number];
export type Mood = 'intenso' | 'refrescante' | 'dulce' | 'atrevido';
export type Flavor = {
  id: string;
  name: string;
  description: string;
  personality: string;
  tags: string[];
  categories: Category[];
  mood: Mood;
  color: string;
  image: string;
  demo: boolean;
};

// Conceptos de sabor para presentar el diseño. NO es el menú confirmado de Halebrije.
export const flavors: Flavor[] = [
  {
    id: 'pistache',
    name: 'Pistache',
    description: 'Una personalidad suave, con un lado intenso.',
    personality: 'El alma creativa',
    tags: ['Cremoso', 'Intenso'],
    categories: ['Cremosos', 'Intensos'],
    mood: 'dulce',
    color: 'pistachio',
    image: '/images/pistache.webp',
    demo: true,
  },
  {
    id: 'mango',
    name: 'Mango',
    description: 'Espíritu tropical. Siempre en modo verano.',
    personality: 'El espíritu libre',
    tags: ['Tropical', 'Fresco'],
    categories: ['Frutales'],
    mood: 'refrescante',
    color: 'mango',
    image: '/images/mango.webp',
    demo: true,
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    description: 'Carácter profundo para antojos intensos.',
    personality: 'El lado intenso',
    tags: ['Profundo', 'Cremoso'],
    categories: ['Cremosos', 'Intensos'],
    mood: 'intenso',
    color: 'chocolate',
    image: '/images/chocolate.webp',
    demo: true,
  },
  {
    id: 'frutos',
    name: 'Frutos del bosque',
    description: 'Un giro inesperado, con mucha personalidad.',
    personality: 'La criatura inquieta',
    tags: ['Frutal', 'Atrevido'],
    categories: ['Frutales', 'Especiales', 'Temporada'],
    mood: 'atrevido',
    color: 'berry',
    image: '/images/frutos.webp',
    demo: true,
  },
];

export const moodOptions: { id: Mood; title: string; subtitle: string; symbol: string }[] = [
  { id: 'intenso', title: 'Intenso', subtitle: 'Sin medias tintas.', symbol: 'bolt' },
  { id: 'refrescante', title: 'Refrescante', subtitle: 'Un respiro tropical.', symbol: 'sun' },
  { id: 'dulce', title: 'Dulce', subtitle: 'Mi momento de calma.', symbol: 'heart' },
  { id: 'atrevido', title: 'Atrevido', subtitle: 'Hoy pruebo algo nuevo.', symbol: 'spark' },
];
