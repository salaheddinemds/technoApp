export const mockProducts = [
  {
    id: 1,
    name: 'Casque Bluetooth Pro',
    slug: 'casque-bluetooth-pro',
    price: 12900,
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Audio', slug: 'audio' },
    brand: { name: 'TechNova', slug: 'technova' },
  },
  {
    id: 2,
    name: 'Montre Connectée X4',
    slug: 'montre-connectee-x4',
    price: 18900,
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Wearables', slug: 'wearables' },
    brand: { name: 'Nexa', slug: 'nexa' },
  },
  {
    id: 3,
    name: 'Clavier mécanique Tactile',
    slug: 'clavier-mecanique-tactile',
    price: 9800,
    inStock: false,
    image:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Périphériques', slug: 'peripheriques' },
    brand: { name: 'Astra', slug: 'astra' },
  },
  {
    id: 4,
    name: 'Webcam 4K Studio',
    slug: 'webcam-4k-studio',
    price: 21400,
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Caméra', slug: 'camera' },
    brand: { name: 'PixelLab', slug: 'pixellab' },
  },
  {
    id: 5,
    name: 'Enceinte Bluetooth Mini',
    slug: 'enceinte-bluetooth-mini',
    price: 7600,
    inStock: true,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Audio', slug: 'audio' },
    brand: { name: 'Nexa', slug: 'nexa' },
  },
  {
    id: 6,
    name: 'Souris sans fil Ergonomique',
    slug: 'souris-sans-fil-ergonomique',
    price: 5400,
    inStock: false,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    category: { name: 'Périphériques', slug: 'peripheriques' },
    brand: { name: 'Astra', slug: 'astra' },
  },
]

export const mockCategories = [
  { name: 'Audio', slug: 'audio' },
  { name: 'Wearables', slug: 'wearables' },
  { name: 'Périphériques', slug: 'peripheriques' },
  { name: 'Caméra', slug: 'camera' },
]

export const mockBrands = [
  { name: 'TechNova', slug: 'technova' },
  { name: 'Nexa', slug: 'nexa' },
  { name: 'Astra', slug: 'astra' },
  { name: 'PixelLab', slug: 'pixellab' },
]
