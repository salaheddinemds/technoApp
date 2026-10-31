import { Router } from 'express';
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProduct,
  listAdminProducts,
  updateAdminProduct
} from '../controllers/admin-products.controller.js';
import {
  deleteAdminImage,
  uploadAdminProductImages
} from '../controllers/admin-images.controller.js';
import { receiveProductImages } from '../middleware/upload-images.middleware.js';

const adminProductsRouter = Router();

adminProductsRouter.get('/products', listAdminProducts);
adminProductsRouter.get('/products/:id', getAdminProduct);
adminProductsRouter.post('/products', createAdminProduct);
adminProductsRouter.post('/products/:id/images', receiveProductImages, uploadAdminProductImages);
adminProductsRouter.put('/products/:id', updateAdminProduct);
adminProductsRouter.delete('/products/:id', deleteAdminProduct);
adminProductsRouter.delete('/images/:id', deleteAdminImage);

export default adminProductsRouter;
