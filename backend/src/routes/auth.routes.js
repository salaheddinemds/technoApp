import { Router } from 'express';
import { getCurrentAdmin, login } from '../controllers/auth.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/me', requireAdmin, getCurrentAdmin);

export default authRouter;
