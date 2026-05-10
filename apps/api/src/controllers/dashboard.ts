import { Request, Response } from 'express';
import { getSignals } from '../services/signals';
import { getAllPositions, tickPositions } from '../services/positionsState';
import { portfolioMeta } from '../data/portfolio';
import {
    CONTENT_TYPE_EVENT_STREAM,
    HEADER_CACHE_CONTROL,
    HEADER_CONNECTION,
    HEADER_CONTENT_TYPE,
} from '../constants/http';

export function getDashboard(_req: Request, res: Response) {
    res.json({
        meta: portfolioMeta,
        positions: getSignals(getAllPositions()),
    });
}

export function streamDashboard(req: Request, res: Response) {
    res.setHeader(HEADER_CONTENT_TYPE, CONTENT_TYPE_EVENT_STREAM);
    res.setHeader(HEADER_CACHE_CONTROL, 'no-cache');
    res.setHeader(HEADER_CONNECTION, 'keep-alive');

    const send = () => res.write(`data: ${JSON.stringify(getSignals(tickPositions()))}\n\n`);

    const interval = setInterval(send, 3000);

    req.on('close', () => clearInterval(interval));
}
