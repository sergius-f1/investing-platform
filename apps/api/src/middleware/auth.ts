import { Request, Response, NextFunction } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers['authorization'] ?? '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token || token !== process.env.API_TOKEN) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
