import { Router } from 'express';
import {
  getProductBySlug,
  listBrands,
  listCategories,
  listProducts
} from '../controllers/catalog.controller.js';

const catalogRouter = Router();

catalogRouter.get('/categories', listCategories);
catalogRouter.get('/brands', listBrands);
catalogRouter.get('/products', listProducts);
catalogRouter.get('/products/:slug', getProductBySlug);

export default catalogRouter;
