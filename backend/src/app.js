import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import catalogRouter from './routes/catalog.routes.js';
import healthRouter from './routes/health.routes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api', catalogRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
