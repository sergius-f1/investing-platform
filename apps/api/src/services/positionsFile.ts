import { readFileSync } from 'fs';
import { join } from 'path';
import type { Position } from '../data/portfolio';

const POSITIONS_PATH = join(__dirname, '../data/positions.json');

let cached: Position[] | null = null;

export function loadPositions(): Position[] {
    if (cached) return cached;
    const raw = readFileSync(POSITIONS_PATH, 'utf-8');
    cached = JSON.parse(raw) as Position[];
    return cached;
}
