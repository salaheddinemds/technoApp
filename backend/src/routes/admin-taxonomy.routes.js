import { Router } from 'express';
import {
  createAdminBrand,
  createAdminCategory,
  deleteAdminBrand,
  deleteAdminCategory,
  updateAdminBrand,
  updateAdminCategory
} from '../controllers/admin-taxonomy.controller.js';

const adminTaxonomyRouter = Router();

adminTaxonomyRouter.post('/categories', createAdminCategory);
adminTaxonomyRouter.put('/categories/:id', updateAdminCategory);
adminTaxonomyRouter.delete('/categories/:id', deleteAdminCategory);
adminTaxonomyRouter.post('/brands', createAdminBrand);
adminTaxonomyRouter.put('/brands/:id', updateAdminBrand);
adminTaxonomyRouter.delete('/brands/:id', deleteAdminBrand);

export default adminTaxonomyRouter;
