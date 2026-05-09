import { Request, Response } from 'express';
import { getSignalsPaginated } from '../services/signals';
import { portfolioMeta } from '../data/portfolio';
import {
  CONTENT_TYPE_EVENT_STREAM,
  HEADER_CACHE_CONTROL,
  HEADER_CONNECTION,
  HEADER_CONTENT_TYPE,
} from '../constants/http';

const PAGE_SIZE = 10;

export function getDashboard(req: Request, res: Response) {
  const after = req.query.after as string | undefined;
  const { signals, nextCursor, prevCursor } = getSignalsPaginated(after, PAGE_SIZE);

  res.json({
    meta: portfolioMeta,
    positions: signals,
    nextCursor,
    prevCursor,
  });
}

export function streamDashboard(req: Request, res: Response) {
  const after = req.query.after as string | undefined;

  res.setHeader(HEADER_CONTENT_TYPE, CONTENT_TYPE_EVENT_STREAM);
  res.setHeader(HEADER_CACHE_CONTROL, 'no-cache');
  res.setHeader(HEADER_CONNECTION, 'keep-alive');

  const send = () => {
    const { signals } = getSignalsPaginated(after, PAGE_SIZE);
    res.write(`data: ${JSON.stringify(signals)}\n\n`);
  };

  send();
  const interval = setInterval(send, 3000);

  req.on('close', () => clearInterval(interval));
}
