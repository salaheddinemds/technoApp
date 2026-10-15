import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const categories = [
  { name: 'Scolaire', slug: 'scolaire' },
  { name: 'Loisirs créatifs', slug: 'loisirs-creatifs' },
  { name: 'Beaux arts', slug: 'beaux-arts' },
  { name: 'Bureautique & informatique', slug: 'bureautique-informatique' },
  { name: 'Bricolage', slug: 'bricolage' },
  { name: 'Écriture & coloriage', slug: 'ecriture-coloriage' },
  { name: 'Technique', slug: 'technique' },
  { name: 'Équipement hôtel & magasin', slug: 'equipement-hotel-magasin' }
];

const brands = [
  { name: 'Techno', slug: 'techno' },
  { name: 'Maped', slug: 'maped' }
];

const products = [
  {
    name: 'Cartable scolaire Explorer 2 compartiments',
    slug: 'cartable-scolaire-explorer-2-compartiments',
    description: 'Cartable léger et résistant avec deux compartiments pour organiser les affaires scolaires.',
    price: 4200,
    stock: 12,
    category: 'scolaire',
    brand: 'maped',
    specs: { Couleur: 'Bleu marine', Compartiments: 2, Matière: 'Polyester', Fermeture: 'Glissière' }
  },
  {
    name: 'Trousse double compartiment',
    slug: 'trousse-double-compartiment',
    description: 'Trousse pratique pour ranger séparément stylos, crayons et petits accessoires.',
    price: 850,
    stock: 18,
    category: 'scolaire',
    brand: 'techno',
    specs: { Couleur: 'Rouge', Compartiments: 2, Matière: 'Tissu', Longueur: '21 cm' }
  },
  {
    name: 'Cahier grands carreaux 96 pages',
    slug: 'cahier-grands-carreaux-96-pages',
    description: 'Cahier scolaire à couverture résistante, adapté aux cours et aux exercices.',
    price: 180,
    stock: 45,
    category: 'scolaire',
    brand: 'techno',
    specs: { Pages: 96, Format: '21 × 29,7 cm', Réglure: 'Grands carreaux', Couverture: 'Souple' }
  },
  {
    name: 'Ardoise blanche effaçable avec feutre',
    slug: 'ardoise-blanche-effacable-avec-feutre',
    description: 'Ardoise réutilisable pour les exercices, les révisions et les petits dessins.',
    price: 650,
    stock: 0,
    category: 'scolaire',
    brand: 'maped',
    specs: { Surface: 'Blanche effaçable', Format: 'A4', Accessoires: 'Feutre et effacette' }
  },
  {
    name: 'Kit de pâte à modeler 12 couleurs',
    slug: 'kit-pate-a-modeler-12-couleurs',
    description: 'Pâte à modeler souple en douze couleurs pour les activités créatives des enfants.',
    price: 1100,
    stock: 9,
    category: 'loisirs-creatifs',
    brand: 'maped',
    specs: { Couleurs: 12, 'Âge conseillé': 'Dès 3 ans', Contenu: '12 pots', Nettoyage: 'À l’eau' }
  },
  {
    name: 'Papier origami assortiment 100 feuilles',
    slug: 'papier-origami-assortiment-100-feuilles',
    description: 'Feuilles colorées pour réaliser pliages, décorations et projets créatifs.',
    price: 550,
    stock: 21,
    category: 'loisirs-creatifs',
    brand: 'techno',
    specs: { Feuilles: 100, Format: '15 × 15 cm', Couleurs: 10, Grammage: '70 g/m²' }
  },
  {
    name: 'Ciseaux de loisirs créatifs à motifs',
    slug: 'ciseaux-loisirs-creatifs-motifs',
    description: 'Ciseaux à lames décoratives pour découper le papier avec différentes bordures.',
    price: 720,
    stock: 7,
    category: 'loisirs-creatifs',
    brand: 'maped',
    specs: { Motifs: 3, Matière: 'Acier inoxydable', Poignées: 'Plastique', Usage: 'Papier et carton fin' }
  },
  {
    name: 'Coffret de peinture aquarelle 24 couleurs',
    slug: 'coffret-peinture-aquarelle-24-couleurs',
    description: 'Coffret compact de peinture aquarelle pour les premiers travaux de couleur.',
    price: 1350,
    stock: 6,
    category: 'beaux-arts',
    brand: 'maped',
    specs: { Couleurs: 24, Type: 'Aquarelle', Accessoires: 'Pinceau inclus', Boîtier: 'Plastique' }
  },
  {
    name: 'Bloc de dessin blanc 30 feuilles',
    slug: 'bloc-dessin-blanc-30-feuilles',
    description: 'Bloc de papier blanc pour croquis, dessin au crayon et activités scolaires.',
    price: 480,
    stock: 24,
    category: 'beaux-arts',
    brand: 'techno',
    specs: { Feuilles: 30, Format: 'A4', Grammage: '120 g/m²', Couleur: 'Blanc' }
  },
  {
    name: 'Pinceaux de peinture lot de 6',
    slug: 'pinceaux-peinture-lot-6',
    description: 'Assortiment de pinceaux de plusieurs tailles pour peinture et travaux manuels.',
    price: 990,
    stock: 0,
    category: 'beaux-arts',
    brand: 'maped',
    specs: { Quantité: 6, Tailles: 'Assorties', Manche: 'Bois', Poils: 'Synthétiques' }
  },
  {
    name: 'Souris optique USB filaire',
    slug: 'souris-optique-usb-filaire',
    description: 'Souris filaire simple pour les postes de travail et l’utilisation quotidienne.',
    price: 1250,
    stock: 15,
    category: 'bureautique-informatique',
    brand: 'techno',
    specs: { Connexion: 'USB-A', Capteur: 'Optique', Boutons: 3, 'Longueur câble': '1,5 m' }
  },
  {
    name: 'Clavier compact USB AZERTY',
    slug: 'clavier-compact-usb-azerty',
    description: 'Clavier compact AZERTY pour ordinateur de bureau ou poste d’accueil.',
    price: 2800,
    stock: 8,
    category: 'bureautique-informatique',
    brand: 'techno',
    specs: { Connexion: 'USB-A', Disposition: 'AZERTY', Touches: '104', Couleur: 'Noir' }
  },
  {
    name: 'Calculatrice de bureau 12 chiffres',
    slug: 'calculatrice-bureau-12-chiffres',
    description: 'Calculatrice avec grand écran pour les calculs courants au bureau ou en magasin.',
    price: 1600,
    stock: 11,
    category: 'bureautique-informatique',
    brand: 'techno',
    specs: { Chiffres: 12, Alimentation: 'Solaire et pile', Fonctions: 'Mémoire et pourcentage', Écran: 'LCD' }
  },
  {
    name: 'Jeu de tournevis de précision 6 pièces',
    slug: 'jeu-tournevis-precision-6-pieces',
    description: 'Jeu de tournevis fins pour les petites réparations et les travaux de précision.',
    price: 1450,
    stock: 5,
    category: 'bricolage',
    brand: 'techno',
    specs: { Pièces: 6, Embouts: 'Fente et cruciforme', Manche: 'Antidérapant', Rangement: 'Étui' }
  },
  {
    name: 'Ruban adhésif de bricolage 48 mm',
    slug: 'ruban-adhesif-bricolage-48-mm',
    description: 'Ruban adhésif multiusage pour emballage, protection et petites réparations.',
    price: 320,
    stock: 30,
    category: 'bricolage',
    brand: 'techno',
    specs: { Largeur: '48 mm', Longueur: '50 m', Couleur: 'Transparent', Support: 'Polypropylène' }
  },
  {
    name: 'Pistolet à colle chaude avec 10 bâtons',
    slug: 'pistolet-colle-chaude-10-batons',
    description: 'Pistolet compact pour les assemblages et décorations, livré avec dix bâtons de colle.',
    price: 2100,
    stock: 0,
    category: 'bricolage',
    brand: 'techno',
    specs: { Puissance: '20 W', 'Bâtons inclus': 10, 'Diamètre bâton': '7 mm', Alimentation: 'Électrique' }
  },
  {
    name: 'Stylo à bille bleu pointe moyenne',
    slug: 'stylo-bille-bleu-pointe-moyenne',
    description: 'Stylo à bille à écriture régulière pour l’école, le bureau et la prise de notes.',
    price: 60,
    stock: 100,
    category: 'ecriture-coloriage',
    brand: 'maped',
    specs: { Encre: 'Bleue', Pointe: '1 mm', Corps: 'Plastique', Capuchon: 'Oui' }
  },
  {
    name: 'Feutres de coloriage 18 couleurs',
    slug: 'feutres-coloriage-18-couleurs',
    description: 'Feutres lavables aux couleurs variées pour dessins et coloriages.',
    price: 780,
    stock: 17,
    category: 'ecriture-coloriage',
    brand: 'maped',
    specs: { Couleurs: 18, Encre: 'Lavable', Pointe: 'Moyenne', 'Capuchon ventilé': true }
  },
  {
    name: 'Crayons de couleur triangulaires 24 pièces',
    slug: 'crayons-couleur-triangulaires-24-pieces',
    description: 'Crayons de couleur à forme triangulaire pour une bonne prise en main.',
    price: 1250,
    stock: 14,
    category: 'ecriture-coloriage',
    brand: 'maped',
    specs: { Quantité: 24, Forme: 'Triangulaire', Mine: 'Résistante', Étui: 'Carton' }
  },
  {
    name: 'Marqueurs permanents pointe fine lot de 4',
    slug: 'marqueurs-permanents-pointe-fine-lot-4',
    description: 'Marqueurs permanents pour écrire et repérer sur plusieurs surfaces lisses.',
    price: 460,
    stock: 22,
    category: 'ecriture-coloriage',
    brand: 'techno',
    specs: { Quantité: 4, Couleurs: 'Noir, bleu, rouge, vert', Pointe: 'Fine', Encre: 'Permanente' }
  },
  {
    name: 'Ensemble complet de géométrie scolaire Maped avec compas métal, règle graduée, équerre et rapporteur dans une grande boîte rigide transparente',
    slug: 'ensemble-geometrie-scolaire-complet-boite-transparente',
    description: 'Ensemble complet de traçage pour les cours de mathématiques et les exercices de géométrie.',
    price: 1750,
    stock: 4,
    category: 'technique',
    brand: 'maped',
    specs: { Contenu: 'Compas, règle, équerre et rapporteur', Matière: 'Métal et plastique', Rangement: 'Boîte rigide' }
  },
  {
    name: 'Pied à coulisse numérique 150 mm',
    slug: 'pied-a-coulisse-numerique-150-mm',
    description: 'Outil de mesure numérique pour relever des dimensions avec précision.',
    price: 3900,
    stock: 3,
    category: 'technique',
    brand: 'techno',
    specs: { Longueur: '150 mm', Affichage: 'LCD', Précision: '0,01 mm', Matière: 'Acier inoxydable' }
  },
  {
    name: 'Mètre ruban professionnel 5 mètres',
    slug: 'metre-ruban-professionnel-5-metres',
    description: 'Mètre ruban compact avec boîtier renforcé pour les mesures courantes.',
    price: 950,
    stock: 10,
    category: 'technique',
    brand: 'techno',
    specs: { Longueur: '5 m', 'Largeur ruban': '19 mm', Verrouillage: 'Oui', Boîtier: 'Renforcé' }
  },
  {
    name: 'Étiqueteuse manuelle pour prix avec rouleau',
    slug: 'etiqueteuse-manuelle-prix-avec-rouleau',
    description: 'Étiqueteuse manuelle pour afficher rapidement les prix sur les produits en rayon.',
    price: 3200,
    stock: 6,
    category: 'equipement-hotel-magasin',
    brand: 'techno',
    specs: { Lignes: 1, Caractères: 'Chiffres et symboles', 'Étiquettes incluses': true, Usage: 'Prix' }
  },
  {
    name: 'Porte-étiquette transparent pour rayon lot de 10',
    slug: 'porte-etiquette-transparent-rayon-lot-10',
    description: 'Supports transparents pour présenter les prix et informations en rayon.',
    price: 1150,
    stock: 13,
    category: 'equipement-hotel-magasin',
    brand: 'techno',
    specs: { Quantité: 10, Longueur: '8 cm', Matière: 'PVC transparent', Fixation: 'Adhésive' }
  },
  {
    name: 'Plateau de service antidérapant rond',
    slug: 'plateau-service-antiderapant-rond',
    description: 'Plateau rond avec surface antidérapante pour le service en café ou en hôtel.',
    price: 1850,
    stock: 0,
    category: 'equipement-hotel-magasin',
    brand: 'techno',
    specs: { Diamètre: '35 cm', Forme: 'Ronde', Surface: 'Antidérapante', Matière: 'Plastique' }
  },
  {
    name: 'Distributeur de tickets numérotés pour comptoir',
    slug: 'distributeur-tickets-numerotes-comptoir',
    description: 'Distributeur de tickets pour organiser l’accueil et l’attente au comptoir.',
    price: 2700,
    stock: 2,
    category: 'equipement-hotel-magasin',
    brand: 'techno',
    specs: { Installation: 'Murale ou comptoir', Compteur: 'Numérique', Couleur: 'Rouge', Usage: 'Gestion de file' }
  },
  {
    name: 'Règle plate incassable 30 cm',
    slug: 'regle-plate-incassable-30-cm',
    description: 'Règle graduée transparente pour tracer des lignes et mesurer en classe.',
    price: 90,
    stock: 35,
    category: 'scolaire',
    brand: 'maped',
    specs: { Longueur: '30 cm', Matière: 'Plastique incassable', Graduation: 'Centimètres et millimètres' }
  },
  {
    name: 'Agrafeuse de bureau compacte avec agrafes',
    slug: 'agrafeuse-bureau-compacte-avec-agrafes',
    description: 'Agrafeuse compacte pour assembler des documents au bureau ou à la maison.',
    price: 890,
    stock: 8,
    category: 'bureautique-informatique',
    brand: 'techno',
    specs: { Capacité: '15 feuilles', 'Agrafes incluses': 500, 'Type agrafes': '24/6', Base: 'Antidérapante' }
  },
  {
    name: 'Équerre de dessin technique 30 cm graduée',
    slug: 'equerre-dessin-technique-30-cm-graduee',
    description: 'Équerre graduée pour les tracés géométriques et les dessins techniques.',
    price: 390,
    stock: 16,
    category: 'technique',
    brand: 'maped',
    specs: { Longueur: '30 cm', Angle: '45°', Matière: 'Plastique transparent', Graduation: 'Millimètres' }
  }
];

function assertSeedDataIsValid() {
  if (categories.length !== 8 || brands.length !== 2) {
    throw new Error(`Le jeu de données doit contenir 8 catégories et 2 marques ; ${categories.length} catégories et ${brands.length} marques trouvées.`);
  }

  if (products.length !== 30) {
    throw new Error(`Le jeu de données doit contenir 30 produits ; ${products.length} trouvés.`);
  }

  const categorySlugs = new Set(categories.map(({ slug }) => slug));
  const brandSlugs = new Set(brands.map(({ slug }) => slug));
  const productSlugs = new Set();

  for (const product of products) {
    if (!categorySlugs.has(product.category) || !brandSlugs.has(product.brand)) {
      throw new Error(`Catégorie ou marque inconnue pour le produit « ${product.name} ».`);
    }
    if (productSlugs.has(product.slug)) {
      throw new Error(`Slug de produit dupliqué : ${product.slug}.`);
    }
    if (!Number.isInteger(product.price) || product.price < 0 || !Number.isInteger(product.stock) || product.stock < 0) {
      throw new Error(`Prix ou stock invalide pour le produit « ${product.name} ».`);
    }

    productSlugs.add(product.slug);
  }
}

function getDatabaseHost(databaseUrl) {
  let parsedUrl;

  try {
    parsedUrl = new URL(databaseUrl);
  } catch {
    throw new Error('DATABASE_URL doit être une URL PostgreSQL valide.');
  }

  if (parsedUrl.protocol !== 'postgresql:' && parsedUrl.protocol !== 'postgres:') {
    throw new Error('DATABASE_URL doit utiliser le protocole PostgreSQL.');
  }

  return parsedUrl.hostname.toLowerCase();
}

async function main() {
  assertSeedDataIsValid();

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    throw new Error('DATABASE_URL est absent. Configurez une base PostgreSQL locale avant le seed.');
  }

  const host = getDatabaseHost(databaseUrl);
  if (host === 'neon.tech' || host.endsWith('.neon.tech')) {
    throw new Error('Seed refusé : DATABASE_URL pointe vers Neon. Utilisez uniquement une base PostgreSQL locale.');
  }

  const prisma = new PrismaClient();

  try {
    await prisma.$transaction(async (transaction) => {
      const categoryIds = new Map();
      for (const category of categories) {
        const savedCategory = await transaction.category.upsert({
          where: { slug: category.slug },
          update: { name: category.name },
          create: category
        });
        categoryIds.set(category.slug, savedCategory.id);
      }

      const brandIds = new Map();
      for (const brand of brands) {
        const savedBrand = await transaction.brand.upsert({
          where: { slug: brand.slug },
          update: { name: brand.name },
          create: brand
        });
        brandIds.set(brand.slug, savedBrand.id);
      }

      for (const product of products) {
        const savedProduct = await transaction.product.upsert({
          where: { slug: product.slug },
          update: {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            specs: product.specs,
            categoryId: categoryIds.get(product.category),
            brandId: brandIds.get(product.brand)
          },
          create: {
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            stock: product.stock,
            specs: product.specs,
            categoryId: categoryIds.get(product.category),
            brandId: brandIds.get(product.brand)
          }
        }, { timeout: 30_000 });

        const placeholderId = `seed-placeholder-${product.slug}`;
        await transaction.productImage.upsert({
          where: { cloudinaryPublicId: placeholderId },
          update: {
            url: `https://placehold.co/800x600?text=${encodeURIComponent(product.name)}`,
            position: 0,
            productId: savedProduct.id
          },
          create: {
            url: `https://placehold.co/800x600?text=${encodeURIComponent(product.name)}`,
            cloudinaryPublicId: placeholderId,
            position: 0,
            productId: savedProduct.id
          }
        });
      }
    });
  } finally {
    await prisma.$disconnect();
  }

  console.info(`Seed terminé : ${categories.length} catégories, ${brands.length} marques et ${products.length} produits créés ou mis à jour.`);
  console.info('Chaque produit possède une image provisoire ; remplacez-la par une image Cloudinary avant la mise en ligne.');
}

main().catch((error) => {
  console.error(`Échec du seed : ${error.message}`);
  process.exitCode = 1;
});
