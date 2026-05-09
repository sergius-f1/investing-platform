import { Request, Response } from 'express';
import { getSignals } from '../services/signals';
import { portfolioMeta } from '../data/portfolio';

export function getDashboard(_req: Request, res: Response) {
  const signals = getSignals();

  res.json({
    meta: portfolioMeta,
    positions: signals,
  });
}
