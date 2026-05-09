import express from 'express';
import { helmetMiddleware, rateLimitMiddleware } from './middleware/security';
import { requireAuth } from './middleware/auth';

const app = express();

app.use(helmetMiddleware);

/**
 * Add rate limiting middleware. No more than N requests per N minute
 */
app.use(rateLimitMiddleware);
app.use(express.json({ limit: '10kb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

/**
 * Add a middleware to check if the user is authenticated before
 */
app.use('/api', requireAuth);

import dashboardRouter from './routes/dashboard';
app.use('/api/dashboard', dashboardRouter);

export default app;
