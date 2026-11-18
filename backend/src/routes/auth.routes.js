import { Router } from 'express';
import { getCurrentAdmin, login, signup, updateCurrentAdmin } from '../controllers/auth.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { loginRateLimiter } from '../middleware/login-rate-limit.middleware.js';

const authRouter = Router();

authRouter.post('/login', loginRateLimiter, login);
authRouter.post('/signup', signup);
authRouter.get('/me', requireAdmin, getCurrentAdmin);
authRouter.patch('/me', requireAdmin, updateCurrentAdmin);

export default authRouter;
