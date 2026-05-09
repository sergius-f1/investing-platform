import { Position, getPositions } from '../data/portfolio';

export type Signal = 'BUY' | 'HOLD' | 'REDUCE';

export interface PositionSignal {
  symbol: string;
  price: number;
  change24h: number;
  weight: number;
  signal: Signal;
  confidence: number;
  rationale: string;
}

function computeSignal(p: Position): { signal: Signal; confidence: number; rationale: string } {
  if (p.momentum === 'positive' && p.volatility === 'low') {
    return { signal: 'BUY',    confidence: 0.82, rationale: 'Positive momentum with controlled volatility.' };
  }
  if (p.volatility === 'high') {
    return { signal: 'REDUCE', confidence: 0.74, rationale: 'Elevated volatility warrants position reduction.' };
  }
  return { signal: 'HOLD', confidence: 0.61, rationale: 'No strong directional signal. Maintain current exposure.' };
}

export function getSignals(): PositionSignal[] {
  return getPositions().map((p) => ({
    symbol: p.symbol,
    price: p.price,
    change24h: p.change24h,
    weight: p.weight,
    ...computeSignal(p),
  }));
}

export function getSignalsPaginated(
  after: string | undefined,
  limit: number,
): { signals: PositionSignal[]; nextCursor: string | null; prevCursor: string | null } {
  // Mock of DB cursor pagination: in production this would be a single query,
  // e.g. SELECT * FROM positions WHERE symbol > $after ORDER BY symbol LIMIT $limit
  const all = getSignals();
  const startIndex = after ? all.findIndex((s) => s.symbol === after) + 1 : 0;
  const page = all.slice(startIndex, startIndex + limit);

  const nextCursor = startIndex + limit < all.length ? (page[page.length - 1]?.symbol ?? null) : null;
  const prevCursor = startIndex <= limit ? null : (all[startIndex - limit - 1]?.symbol ?? null);

  return { signals: page, nextCursor, prevCursor };
}
