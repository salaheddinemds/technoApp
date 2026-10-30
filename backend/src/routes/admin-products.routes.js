import { Router } from 'express';
import {
  createAdminProduct,
  deleteAdminProduct,
  getAdminProduct,
  listAdminProducts,
  updateAdminProduct
} from '../controllers/admin-products.controller.js';

const adminProductsRouter = Router();

adminProductsRouter.get('/products', listAdminProducts);
adminProductsRouter.get('/products/:id', getAdminProduct);
adminProductsRouter.post('/products', createAdminProduct);
adminProductsRouter.put('/products/:id', updateAdminProduct);
adminProductsRouter.delete('/products/:id', deleteAdminProduct);

export default adminProductsRouter;
