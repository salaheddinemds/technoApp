import prisma from '../lib/prisma.js';
import { deleteCloudinaryImages } from '../lib/cloudinary.js';
import { buildProductWhere, parseProductsQuery } from '../lib/product-filters.js';

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
    select: { url: true },
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

const productFields = new Set([
  'name',
  'price',
  'stock',
  'categoryId',
  'brandId',
  'description',
  'specs'
]);
const maxInteger = 2_147_483_647;

function apiError(statusCode, code, message, details) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  if (details) {
    error.details = details;
  }
  return error;
}

function invalidFields(issues) {
  const details = issues.map(({ field, message }) => ({ field, message }));
  const message = details.length === 1 ? details[0].message : 'Certains champs sont invalides.';
  throw apiError(400, 'VALIDATION_ERROR', message, details.length > 1 ? details : undefined);
}

function validateProductBody(body) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw apiError(400, 'VALIDATION_ERROR', 'Le corps doit être un objet JSON.');
  }

  const issues = [];
  for (const field of Object.keys(body)) {
    if (!productFields.has(field)) {
      issues.push({ field, message: 'Ce champ n’est pas accepté.' });
    }
  }

  const requiredFields = ['name', 'price', 'stock', 'categoryId', 'brandId'];
  for (const field of requiredFields) {
    if (!Object.hasOwn(body, field)) {
      issues.push({ field, message: 'Ce champ est obligatoire.' });
    }
  }

  if (Object.hasOwn(body, 'name') && (typeof body.name !== 'string' || body.name.trim().length < 1 || body.name.trim().length > 120)) {
    issues.push({ field: 'name', message: 'Le nom doit contenir de 1 à 120 caractères.' });
  }

  for (const field of ['price', 'stock']) {
    if (Object.hasOwn(body, field) && (!Number.isSafeInteger(body[field]) || body[field] < 0 || body[field] > maxInteger)) {
      issues.push({ field, message: 'La valeur doit être un entier entre 0 et 2 147 483 647.' });
    }
  }

  for (const field of ['categoryId', 'brandId']) {
    if (Object.hasOwn(body, field) && (!Number.isSafeInteger(body[field]) || body[field] < 1 || body[field] > maxInteger)) {
      issues.push({ field, message: 'La valeur doit être un identifiant entier valide.' });
    }
  }

  if (body.description !== undefined && (typeof body.description !== 'string' || body.description.length > 5000)) {
    issues.push({ field: 'description', message: 'La description doit être un texte de 5 000 caractères au maximum.' });
  }

  if (body.specs !== undefined) {
    const isPlainObject = body.specs !== null
      && typeof body.specs === 'object'
      && !Array.isArray(body.specs)
      && (Object.getPrototypeOf(body.specs) === Object.prototype || Object.getPrototypeOf(body.specs) === null);

    if (!isPlainObject || Object.values(body.specs).some((value) => typeof value !== 'string')) {
      issues.push({ field: 'specs', message: 'Les caractéristiques doivent être un objet de textes.' });
    }
  }

  if (issues.length > 0) {
    invalidFields(issues);
  }

  return {
    name: body.name.trim(),
    price: body.price,
    stock: body.stock,
    categoryId: body.categoryId,
    brandId: body.brandId,
    description: body.description === undefined ? null : body.description.trim() || null,
    specs: body.specs ?? {}
  };
}

function parseProductId(value) {
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) > maxInteger) {
    throw apiError(400, 'VALIDATION_ERROR', 'L’identifiant du produit est invalide.');
  }

  return Number(value);
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'produit';
}

async function findAvailableSlug(name) {
  const base = slugify(name);
  let slug = base;
  let suffix = 2;

  while (await prisma.product.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

async function validateProductRelations(data) {
  const [category, brand] = await Promise.all([
    prisma.category.findUnique({ where: { id: data.categoryId }, select: { id: true } }),
    prisma.brand.findUnique({ where: { id: data.brandId }, select: { id: true } })
  ]);
  const issues = [];

  if (!category) {
    issues.push({ field: 'categoryId', message: 'Cette catégorie n’existe pas.' });
  }
  if (!brand) {
    issues.push({ field: 'brandId', message: 'Cette marque n’existe pas.' });
  }

  if (issues.length > 0) {
    invalidFields(issues);
  }
}

function toProductCard(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    stock: product.stock,
    inStock: product.stock > 0,
    image: product.images[0]?.url ?? null,
    category: product.category,
    brand: product.brand
  };
}

function toProductDetail(product) {
  return {
    ...product,
    inStock: product.stock > 0
  };
}

function sendNotFound(response) {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Produit introuvable.'
    }
  });
}

export async function listAdminProducts(request, response) {
  const filters = parseProductsQuery(request.query);
  const where = buildProductWhere(filters);
  const orderBy = {
    newest: [{ createdAt: 'desc' }, { id: 'desc' }],
    price_asc: [{ price: 'asc' }, { id: 'asc' }],
    price_desc: [{ price: 'desc' }, { id: 'desc' }],
    name: [{ name: 'asc' }, { id: 'asc' }]
  }[filters.sort];
  const [total, products] = await prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      select: productCardSelect,
      orderBy,
      skip: (filters.page - 1) * filters.limit,
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

export async function getAdminProduct(request, response) {
  const id = parseProductId(request.params.id);
  const product = await prisma.product.findUnique({
    where: { id },
    select: productDetailSelect
  });

  if (!product) {
    sendNotFound(response);
    return;
  }

  response.json({ data: toProductDetail(product) });
}

export async function createAdminProduct(request, response) {
  const data = validateProductBody(request.body);
  await validateProductRelations(data);

  let product;
  let slug = await findAvailableSlug(data.name);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      product = await prisma.product.create({
        data: { ...data, slug },
        select: productDetailSelect
      });
      break;
    } catch (error) {
      if (error.code !== 'P2002') {
        throw error;
      }

      if (attempt === 9) {
        throw apiError(409, 'CONFLICT', 'Impossible de générer un identifiant unique pour ce produit.');
      }

      slug = await findAvailableSlug(data.name);
    }
  }

  response.status(201).json({ data: toProductDetail(product) });
}

export async function updateAdminProduct(request, response) {
  const id = parseProductId(request.params.id);
  const data = validateProductBody(request.body);
  await validateProductRelations(data);

  try {
    const product = await prisma.product.update({
      where: { id },
      data,
      select: productDetailSelect
    });

    response.json({ data: toProductDetail(product) });
  } catch (error) {
    if (error.code === 'P2025') {
      sendNotFound(response);
      return;
    }

    throw error;
  }
}

export async function deleteAdminProduct(request, response) {
  const id = parseProductId(request.params.id);

  try {
    const deleted = await prisma.$transaction(async (transaction) => {
      const lockedProducts = await transaction.$queryRaw`
        SELECT id FROM products WHERE id = ${id} FOR UPDATE
      `;

      if (lockedProducts.length === 0) {
        return false;
      }

      const images = await transaction.productImage.findMany({
        where: { productId: id },
        select: { cloudinaryPublicId: true }
      });
      await deleteCloudinaryImages(images.map((image) => image.cloudinaryPublicId));
      await transaction.product.delete({ where: { id } });
      return true;
    });

    if (!deleted) {
      sendNotFound(response);
      return;
    }

    response.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') {
      sendNotFound(response);
      return;
    }

    throw error;
  }
}
