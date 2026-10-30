function validationError(message) {
  const error = new Error(message);
  error.statusCode = 400;
  error.code = 'VALIDATION_ERROR';
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

export function parseProductsQuery(query) {
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

export function buildProductWhere(filters) {
  return {
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
}
