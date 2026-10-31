import prisma from '../lib/prisma.js';

const maxInteger = 2_147_483_647;

const resources = {
  category: {
    model: prisma.category,
    label: 'catégorie',
    fallbackSlug: 'categorie'
  },
  brand: {
    model: prisma.brand,
    label: 'marque',
    fallbackSlug: 'marque'
  }
};

function apiError(statusCode, code, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

function sendNotFound(response, label) {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `${label[0].toUpperCase()}${label.slice(1)} introuvable.`
    }
  });
}

function validateNameBody(body) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw apiError(400, 'VALIDATION_ERROR', 'Le corps doit être un objet JSON.');
  }

  if (Object.keys(body).some((field) => field !== 'name')) {
    throw apiError(400, 'VALIDATION_ERROR', 'Seul le champ name est accepté.');
  }

  if (typeof body.name !== 'string' || body.name.trim().length < 1 || body.name.trim().length > 60) {
    throw apiError(400, 'VALIDATION_ERROR', 'Le nom doit contenir de 1 à 60 caractères.');
  }

  return body.name.trim();
}

function parseResourceId(value, label) {
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) > maxInteger) {
    throw apiError(400, 'VALIDATION_ERROR', `L’identifiant de la ${label} est invalide.`);
  }

  return Number(value);
}

function slugify(value, fallback) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || fallback;
}

async function findAvailableSlug(resource, name, excludeId) {
  const base = slugify(name, resource.fallbackSlug);
  let slug = base;
  let suffix = 2;

  while (await resource.model.findFirst({
    where: {
      slug,
      ...(excludeId === undefined ? {} : { id: { not: excludeId } })
    },
    select: { id: true }
  })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

async function findNameConflict(resource, name, excludeId) {
  return resource.model.findFirst({
    where: {
      name,
      ...(excludeId === undefined ? {} : { id: { not: excludeId } })
    },
    select: { id: true }
  });
}

function toResource(resource) {
  return (record) => ({
    id: record.id,
    name: record.name,
    slug: record.slug,
    productCount: record._count.products
  });
}

function nameTakenError(resource) {
  return apiError(409, 'NAME_TAKEN', `Ce nom de ${resource.label} est déjà utilisé.`);
}

function hasProductsError(resource) {
  return apiError(409, 'HAS_PRODUCTS', `Impossible de supprimer cette ${resource.label} tant que des produits y sont rattachés.`);
}

async function createResource(type, request, response) {
  const resource = resources[type];
  const name = validateNameBody(request.body);

  if (await findNameConflict(resource, name)) {
    throw nameTakenError(resource);
  }

  let slug = await findAvailableSlug(resource, name);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      const record = await resource.model.create({
        data: { name, slug },
        include: { _count: { select: { products: true } } }
      });

      response.status(201).json({ data: toResource(resource)(record) });
      return;
    } catch (error) {
      if (error.code !== 'P2002') {
        throw error;
      }

      if (await findNameConflict(resource, name)) {
        throw nameTakenError(resource);
      }

      if (attempt === 9) {
        throw apiError(409, 'CONFLICT', `Impossible de générer un slug unique pour cette ${resource.label}.`);
      }

      slug = await findAvailableSlug(resource, name);
    }
  }
}

async function updateResource(type, request, response) {
  const resource = resources[type];
  const id = parseResourceId(request.params.id, resource.label);
  const name = validateNameBody(request.body);
  const current = await resource.model.findUnique({
    where: { id },
    select: { id: true }
  });

  if (!current) {
    sendNotFound(response, resource.label);
    return;
  }

  if (await findNameConflict(resource, name, id)) {
    throw nameTakenError(resource);
  }

  let slug = await findAvailableSlug(resource, name, id);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      const record = await resource.model.update({
        where: { id },
        data: { name, slug },
        include: { _count: { select: { products: true } } }
      });

      response.json({ data: toResource(resource)(record) });
      return;
    } catch (error) {
      if (error.code === 'P2025') {
        sendNotFound(response, resource.label);
        return;
      }
      if (error.code !== 'P2002') {
        throw error;
      }

      if (await findNameConflict(resource, name, id)) {
        throw nameTakenError(resource);
      }

      if (attempt === 9) {
        throw apiError(409, 'CONFLICT', `Impossible de générer un slug unique pour cette ${resource.label}.`);
      }

      slug = await findAvailableSlug(resource, name, id);
    }
  }
}

async function deleteResource(type, request, response) {
  const resource = resources[type];
  const id = parseResourceId(request.params.id, resource.label);

  try {
    const record = await resource.model.findUnique({
      where: { id },
      select: { id: true, _count: { select: { products: true } } }
    });

    if (!record) {
      sendNotFound(response, resource.label);
      return;
    }

    if (record._count.products > 0) {
      throw hasProductsError(resource);
    }

    await resource.model.delete({ where: { id } });
    response.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') {
      sendNotFound(response, resource.label);
      return;
    }
    if (error.code === 'P2003') {
      throw hasProductsError(resource);
    }
    throw error;
  }
}

export function createAdminCategory(request, response) {
  return createResource('category', request, response);
}

export function updateAdminCategory(request, response) {
  return updateResource('category', request, response);
}

export function deleteAdminCategory(request, response) {
  return deleteResource('category', request, response);
}

export function createAdminBrand(request, response) {
  return createResource('brand', request, response);
}

export function updateAdminBrand(request, response) {
  return updateResource('brand', request, response);
}

export function deleteAdminBrand(request, response) {
  return deleteResource('brand', request, response);
}
