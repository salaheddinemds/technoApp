import { Router } from 'express';
import { getCurrentAdmin, login } from '../controllers/auth.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { loginRateLimiter } from '../middleware/login-rate-limit.middleware.js';

const authRouter = Router();

authRouter.post('/login', loginRateLimiter, login);
authRouter.get('/me', requireAdmin, getCurrentAdmin);

export default authRouter;
