import prisma from '../lib/prisma.js';
import { deleteCloudinaryImages, uploadCloudinaryImage } from '../lib/cloudinary.js';
import { MAX_PRODUCT_IMAGES, validateImageBuffer } from '../lib/image-validation.js';

function apiError(statusCode, code, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

function parseId(value, label) {
  const id = Number(value);
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(id) || id > 2_147_483_647) {
    throw apiError(400, 'VALIDATION_ERROR', `L’identifiant ${label} est invalide.`);
  }

  return id;
}

function sendNotFound(response, message) {
  response.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message
    }
  });
}

async function lockProduct(transaction, productId) {
  const rows = await transaction.$queryRaw`
    SELECT id FROM products WHERE id = ${productId} FOR UPDATE
  `;
  return rows.length > 0;
}

export async function uploadAdminProductImages(request, response) {
  const productId = parseId(request.params.id, 'du produit');
  const files = request.files ?? [];

  if (files.length === 0) {
    throw apiError(400, 'VALIDATION_ERROR', 'Au moins une photo est obligatoire.');
  }

  for (const file of files) {
    await validateImageBuffer(file.buffer);
  }

  const [product, currentImageCount] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId }, select: { id: true } }),
    prisma.productImage.count({ where: { productId } })
  ]);

  if (!product) {
    sendNotFound(response, 'Produit introuvable.');
    return;
  }

  if (currentImageCount + files.length > MAX_PRODUCT_IMAGES) {
    throw apiError(400, 'VALIDATION_ERROR', 'Un produit peut contenir 8 photos au maximum.');
  }

  const uploadedImages = [];
  let createdImages;

  try {
    for (const file of files) {
      uploadedImages.push(await uploadCloudinaryImage(file.buffer, `technoapp/products/${productId}`));
    }

    createdImages = await prisma.$transaction(async (transaction) => {
      if (!await lockProduct(transaction, productId)) {
        throw apiError(404, 'NOT_FOUND', 'Produit introuvable.');
      }

      const existingImages = await transaction.productImage.findMany({
        where: { productId },
        orderBy: [{ position: 'asc' }, { id: 'asc' }],
        select: { id: true }
      });

      if (existingImages.length + uploadedImages.length > MAX_PRODUCT_IMAGES) {
        throw apiError(400, 'VALIDATION_ERROR', 'Un produit peut contenir 8 photos au maximum.');
      }

      const created = [];
      for (const [index, image] of uploadedImages.entries()) {
        created.push(await transaction.productImage.create({
          data: {
            url: image.url,
            cloudinaryPublicId: image.publicId,
            position: existingImages.length + index,
            productId
          },
          select: {
            id: true,
            url: true,
            position: true
          }
        }));
      }

      return created;
    });
  } catch (error) {
    if (uploadedImages.length > 0) {
      try {
        await deleteCloudinaryImages(uploadedImages.map((image) => image.publicId));
      } catch (cleanupError) {
        throw new AggregateError(
          [error, cleanupError],
          'L’enregistrement a échoué et certaines photos Cloudinary n’ont pas pu être nettoyées.'
        );
      }
    }

    throw error;
  }

  response.status(201).json({ data: createdImages });
}

export async function deleteAdminImage(request, response) {
  const imageId = parseId(request.params.id, 'de la photo');
  const image = await prisma.productImage.findUnique({
    where: { id: imageId },
    select: { productId: true }
  });

  if (!image) {
    sendNotFound(response, 'Photo introuvable.');
    return;
  }

  const deleted = await prisma.$transaction(async (transaction) => {
    if (!await lockProduct(transaction, image.productId)) {
      return false;
    }

    const currentImage = await transaction.productImage.findUnique({
      where: { id: imageId },
      select: { id: true, cloudinaryPublicId: true }
    });

    if (!currentImage) {
      return false;
    }

    await deleteCloudinaryImages([currentImage.cloudinaryPublicId]);
    await transaction.productImage.delete({ where: { id: imageId } });

    const remainingImages = await transaction.productImage.findMany({
      where: { productId: image.productId },
      orderBy: [{ position: 'asc' }, { id: 'asc' }],
      select: { id: true }
    });

    for (const [position, remainingImage] of remainingImages.entries()) {
      await transaction.productImage.update({
        where: { id: remainingImage.id },
        data: { position }
      });
    }

    return true;
  });

  if (!deleted) {
    sendNotFound(response, 'Photo introuvable.');
    return;
  }

  response.status(204).end();
}
