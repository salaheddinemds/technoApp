import prisma from '../lib/prisma.js';

const productCardSelect = {
  id: true,
  name: true,
  slug: true,
  price: true,
  stock: true,
  category: {
    select: {
      name: true,
      slug: true
    }
  },
  brand: {
    select: {
      name: true,
      slug: true
    }
  },
  images: {
    select: {
      url: true,
      position: true
    },
    orderBy: [
      { position: 'asc' },
      { id: 'asc' }
    ],
    take: 1
  }
};

const productDetailSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  stock: true,
  specs: true,
  createdAt: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  brand: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  images: {
    select: {
      id: true,
      url: true,
      position: true
    },
    orderBy: [
      { position: 'asc' },
      { id: 'asc' }
    ]
  }
};

function validationError(message, details) {
  const error = new Error(message);
  error.statusCode = 400;
  error.code = 'VALIDATION_ERROR';
  error.details = details;
  return error;
}

function getSingleQueryValue(query, name) {
  const value = query[name];

  if (Array.isArray(value)) {
    throw validationError(`Le paramètre « ${name} » ne peut apparaître qu'une seule fois.`);
  }

  if (value !== undefined && typeof value !== 'string') {
    throw validationError(`Le paramètre « ${name} » doit être une valeur texte.`);
  }

  return value;
}

function parseIntegerQuery(query, name, { min, max } = {}) {
  const value = getSingleQueryValue(query, name);

  if (value === undefined) {
    return undefined;
  }

  if (!/^\d+$/.test(value)) {
    throw validationError(`Le paramètre « ${name} » doit être un entier valide.`);
  }

  const parsedValue = Number(value);

  if (!Number.isSafeInteger(parsedValue) || (min !== undefined && parsedValue < min) || (max !== undefined && parsedValue > max)) {
    throw validationError(`Le paramètre « ${name} » est hors limites.`);
  }

  return parsedValue;
}

function parseProductsQuery(query) {
  const q = getSingleQueryValue(query, 'q');
  const category = getSingleQueryValue(query, 'category');
  const brand = getSingleQueryValue(query, 'brand');
  const inStock = getSingleQueryValue(query, 'inStock');
  const sort = getSingleQueryValue(query, 'sort') ?? 'newest';
  const page = parseIntegerQuery(query, 'page', { min: 1 }) ?? 1;
  const limit = parseIntegerQuery(query, 'limit', { min: 1, max: 50 }) ?? 12;
  const minPrice = parseIntegerQuery(query, 'minPrice', { min: 0 });
  const maxPrice = parseIntegerQuery(query, 'maxPrice', { min: 0 });

  if (q !== undefined && q.trim() === '') {
    throw validationError('Le paramètre « q » ne peut pas être vide.');
  }

  if (inStock !== undefined && inStock !== 'true') {
    throw validationError('Le paramètre « inStock » doit être true.');
  }

  if (!['newest', 'price_asc', 'price_desc', 'name'].includes(sort)) {
    throw validationError('Le paramètre « sort » est invalide.');
  }

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw validationError('Le prix minimum ne peut pas dépasser le prix maximum.');
  }

  return {
    q: q?.trim(),
    category,
    brand,
    inStock: inStock === 'true',
    sort,
    page,
    limit,
    minPrice,
    maxPrice
  };
}

function toCategoryOrBrand(data) {
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    productCount: data._count.products
  };
}

function toProductCard(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    inStock: product.stock > 0,
    image: product.images[0]?.url ?? null,
    category: product.category,
    brand: product.brand
  };
}

function toProductDetail(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    inStock: product.stock > 0,
    specs: product.specs,
    createdAt: product.createdAt.toISOString(),
    category: product.category,
    brand: product.brand,
    images: product.images
  };
}

export async function listCategories(_request, response) {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: true } } }
  });

  response.json({ data: categories.map(toCategoryOrBrand) });
}

export async function listBrands(_request, response) {
  const brands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: true } } }
  });

  response.json({ data: brands.map(toCategoryOrBrand) });
}

export async function listProducts(request, response) {
  const filters = parseProductsQuery(request.query);
  const where = {
    ...(filters.q
      ? {
          OR: [
            { name: { contains: filters.q, mode: 'insensitive' } },
            { description: { contains: filters.q, mode: 'insensitive' } }
          ]
        }
      : {}),
    ...(filters.category ? { category: { slug: filters.category } } : {}),
    ...(filters.brand ? { brand: { slug: filters.brand } } : {}),
    ...(filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? {
          price: {
            ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
            ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {})
          }
        }
      : {}),
    ...(filters.inStock ? { stock: { gt: 0 } } : {})
  };

  const orderBy = {
    newest: [{ createdAt: 'desc' }, { id: 'desc' }],
    price_asc: [{ price: 'asc' }, { id: 'asc' }],
    price_desc: [{ price: 'desc' }, { id: 'desc' }],
    name: [{ name: 'asc' }, { id: 'asc' }]
  }[filters.sort];
  const skip = (filters.page - 1) * filters.limit;
  const [total, products] = await prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      select: productCardSelect,
      orderBy,
      skip,
      take: filters.limit
    })
  ]);

  response.json({
    data: products.map(toProductCard),
    meta: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / filters.limit)
    }
  });
}

export async function getProductBySlug(request, response) {
  const product = await prisma.product.findUnique({
    where: { slug: request.params.slug },
    select: productDetailSelect
  });

  if (!product) {
    response.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: 'Produit introuvable.'
      }
    });
    return;
  }

  response.json({ data: toProductDetail(product) });
}
