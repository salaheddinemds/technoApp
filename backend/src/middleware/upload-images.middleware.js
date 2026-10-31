import multer from 'multer';
import { MAX_IMAGE_SIZE_BYTES, MAX_PRODUCT_IMAGES } from '../lib/image-validation.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: MAX_PRODUCT_IMAGES,
    fileSize: MAX_IMAGE_SIZE_BYTES,
    fields: 0,
    parts: MAX_PRODUCT_IMAGES
  }
});

export const receiveProductImages = upload.array('images', MAX_PRODUCT_IMAGES);
