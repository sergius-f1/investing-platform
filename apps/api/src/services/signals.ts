import type { Position } from '../data/portfolio';

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
        return { signal: 'BUY', confidence: 0.82, rationale: 'Positive momentum with controlled volatility.' };
    }
    if (p.volatility === 'high') {
        return { signal: 'REDUCE', confidence: 0.74, rationale: 'Elevated volatility warrants position reduction.' };
    }
    return { signal: 'HOLD', confidence: 0.61, rationale: 'No strong directional signal. Maintain current exposure.' };
}

export function getSignals(positions: Position[]): PositionSignal[] {
    return positions.map((p) => ({
        symbol: p.symbol,
        price: p.price,
        change24h: p.change24h,
        weight: p.weight,
        ...computeSignal(p),
    }));
}
