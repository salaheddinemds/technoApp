import prisma from '../lib/prisma.js';
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
  const where = buildProductWhere(filters);

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
