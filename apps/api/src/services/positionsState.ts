import { loadPositions } from './positionsFile';
import type { Position } from '../data/portfolio';

const TICK_COUNT = 20;

const spread: Record<Position['volatility'], number> = { low: 0.01, med: 0.025, high: 0.05 };

function jitter(value: number, volatility: Position['volatility']): number {
    const range = spread[volatility];
    const delta = (Math.random() * 2 - 1) * range;
    return parseFloat((value * (1 + delta)).toFixed(2));
}

const base = loadPositions();
const state: Position[] = base.map((p) => ({ ...p }));

export function tickPositions(): Position[] {
    const indices = new Set<number>();
    while (indices.size < Math.min(TICK_COUNT, state.length)) {
        indices.add(Math.floor(Math.random() * state.length));
    }

    const changed: Position[] = [];
    for (const i of indices) {
        state[i] = {
            ...state[i],
            price: jitter(base[i].price, base[i].volatility),
            change24h: jitter(base[i].change24h, base[i].volatility),
        };
        changed.push(state[i]);
    }

    return changed;
}

export function getAllPositions(): Position[] {
    return state;
}
