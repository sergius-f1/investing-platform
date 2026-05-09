import { Request, Response } from 'express';
import { getSignals } from '../services/signals';
import { portfolioMeta } from '../data/portfolio';
import {
  CONTENT_TYPE_EVENT_STREAM,
  HEADER_CACHE_CONTROL,
  HEADER_CONNECTION,
  HEADER_CONTENT_TYPE,
} from '../constants/http';

export function getDashboard(_req: Request, res: Response) {
  const signals = getSignals();

  res.json({
    meta: portfolioMeta,
    positions: signals,
  });
}

export function streamDashboard(req: Request, res: Response) {
  res.setHeader(HEADER_CONTENT_TYPE, CONTENT_TYPE_EVENT_STREAM);
  res.setHeader(HEADER_CACHE_CONTROL, 'no-cache');
  res.setHeader(HEADER_CONNECTION, 'keep-alive');

  const send = () => res.write(`data: ${JSON.stringify(getSignals())}\n\n`);

  send();
  const interval = setInterval(send, 3000);

  req.on('close', () => clearInterval(interval));
}
