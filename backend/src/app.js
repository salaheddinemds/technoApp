import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config/env.js';
import { requireAdmin } from './middleware/auth.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import adminProductsRouter from './routes/admin-products.routes.js';
import authRouter from './routes/auth.routes.js';
import catalogRouter from './routes/catalog.routes.js';
import healthRouter from './routes/health.routes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api', catalogRouter);
app.use('/api/admin', requireAdmin, adminProductsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
