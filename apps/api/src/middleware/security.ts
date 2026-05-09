import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const helmetMiddleware = helmet();

export const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
