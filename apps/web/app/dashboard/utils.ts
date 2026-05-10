import type { PositionSignal } from '@fedasenka/models';

const COLORS = [
    '#6366f1', '#8b5cf6', '#a78bfa',
    '#06b6d4', '#0ea5e9', '#38bdf8',
    '#10b981', '#34d399',
    '#f59e0b', '#fb923c',
];

export const TOP_N = 10;

export function prepareAllocationData(positions: PositionSignal[]) {
    const sorted = [...positions].sort((a, b) => b.weight - a.weight);
    const top = sorted.slice(0, TOP_N);
    return top.map((p, i) => ({ name: p.symbol, value: p.weight, fill: COLORS[i % COLORS.length] }));
}
