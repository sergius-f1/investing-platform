export interface Position {
  symbol: string;
  price: number;
  change24h: number;
  weight: number;
  volatility: 'low' | 'med' | 'high';
  momentum: 'positive' | 'neutral' | 'negative';
}

const basePositions: Position[] = [
  { symbol: 'AAPL', price: 189.43, change24h: 1.2,  weight: 0.22, volatility: 'low',  momentum: 'positive' },
  { symbol: 'NVDA', price: 875.20, change24h: 3.8,  weight: 0.18, volatility: 'low',  momentum: 'positive' },
  { symbol: 'TSLA', price: 248.10, change24h: -2.1, weight: 0.12, volatility: 'high', momentum: 'negative' },
  { symbol: 'MSFT', price: 415.60, change24h: 0.4,  weight: 0.20, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'META', price: 523.80, change24h: -0.9, weight: 0.14, volatility: 'med',  momentum: 'neutral'  },
  { symbol: 'AMZN', price: 195.30, change24h: 1.8,  weight: 0.14, volatility: 'low',  momentum: 'positive' },
];

const spread = { low: 0.01, med: 0.025, high: 0.05 };

/**
 * Applies a small random perturbation to a numeric value to simulate market fluctuation.
 *
 * The magnitude of the perturbation is determined by the volatility tier:
 * - `low` → ±1%
 * - `med` → ±2.5%
 * - `high` → ±5%
 *
 * @param value - The base numeric value to perturb (e.g. price or 24h change).
 * @param volatility - The volatility tier of the position, controls the spread range.
 * @returns The perturbed value rounded to 2 decimal places.
 */
function jitter(value: number, volatility: Position['volatility']): number {
  const range = spread[volatility];
  const delta = (Math.random() * 2 - 1) * range;
  return parseFloat((value * (1 + delta)).toFixed(2));
}

export function getPositions(): Position[] {
  return basePositions.map((p) => ({
    ...p,
    price: jitter(p.price, p.volatility),
    change24h: jitter(p.change24h, p.volatility),
  }));
}

export const portfolioMeta = {
  totalValue: 2_480_000,
  dailyPnL: 14_320,
  dailyPnLPct: 0.58,
  riskScore: 62,
};
