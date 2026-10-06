export const addressDetails = {
  streetAddress: 'Av. El Rosario 1025',
  suburb: 'El Rosario',
  addressLocality: 'Azcapotzalco',
  addressRegion: 'Ciudad de México',
  postalCode: '02100',
  addressCountry: 'MX',
};

export const location = {
  name: 'Town Center El Rosario',
  local: 'Parque · local PAR-02',
  address: `${addressDetails.streetAddress}, ${addressDetails.suburb}, ${addressDetails.addressLocality}, ${addressDetails.postalCode} ${addressDetails.addressRegion}, CDMX.`,
  reference: 'Encuéntranos en la zona del parque.',
  hours: null as string | null,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Halebrije+Town+Center+El+Rosario',
  mapEmbed:
    'https://maps.google.com/maps?q=Town%20Center%20El%20Rosario&t=&z=16&ie=UTF8&iwloc=&output=embed',
  sources: [
    'https://towncenterelrosario.com.mx/halebrije-helados-artesanales/',
    'https://towncenterelrosario.com.mx/contacto/',
  ],
};
