import { fileTypeFromBuffer } from 'file-type';

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_PRODUCT_IMAGES = 8;

const allowedImageMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp'
]);

export async function validateImageBuffer(buffer) {
  const fileType = await fileTypeFromBuffer(buffer);

  if (!fileType || !allowedImageMimeTypes.has(fileType.mime)) {
    const error = new Error('Le format doit être JPEG, PNG ou WebP.');
    error.statusCode = 415;
    error.code = 'FILE_TYPE_NOT_ALLOWED';
    throw error;
  }
}
