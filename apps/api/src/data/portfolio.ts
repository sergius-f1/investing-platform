export interface Position {
  symbol: string;
  price: number;
  change24h: number;
  weight: number;
  volatility: 'low' | 'med' | 'high';
  momentum: 'positive' | 'neutral' | 'negative';
}

const basePositions: Position[] = [
  { symbol: 'AAPL',  price:  189.43, change24h:  1.2,  weight: 0.07, volatility: 'low',  momentum: 'positive' },
  { symbol: 'NVDA',  price:  875.20, change24h:  3.8,  weight: 0.06, volatility: 'low',  momentum: 'positive' },
  { symbol: 'MSFT',  price:  415.60, change24h:  0.4,  weight: 0.06, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'AMZN',  price:  195.30, change24h:  1.8,  weight: 0.06, volatility: 'low',  momentum: 'positive' },
  { symbol: 'META',  price:  523.80, change24h: -0.9,  weight: 0.06, volatility: 'med',  momentum: 'neutral'  },
  { symbol: 'TSLA',  price:  248.10, change24h: -2.1,  weight: 0.04, volatility: 'high', momentum: 'negative' },
  { symbol: 'GOOGL', price:  175.80, change24h:  0.7,  weight: 0.05, volatility: 'low',  momentum: 'positive' },
  { symbol: 'NFLX',  price:  628.40, change24h:  2.3,  weight: 0.04, volatility: 'med',  momentum: 'positive' },
  { symbol: 'AMD',   price:  162.90, change24h: -1.4,  weight: 0.04, volatility: 'high', momentum: 'neutral'  },
  { symbol: 'JPM',   price:  198.50, change24h:  0.3,  weight: 0.04, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'V',     price:  271.20, change24h:  0.5,  weight: 0.03, volatility: 'low',  momentum: 'positive' },
  { symbol: 'MA',    price:  462.70, change24h:  0.6,  weight: 0.03, volatility: 'low',  momentum: 'positive' },
  { symbol: 'DIS',   price:   97.30, change24h: -1.1,  weight: 0.03, volatility: 'med',  momentum: 'negative' },
  { symbol: 'COIN',  price:  214.60, change24h:  5.2,  weight: 0.03, volatility: 'high', momentum: 'positive' },
  { symbol: 'PYPL',  price:   63.80, change24h: -0.8,  weight: 0.02, volatility: 'med',  momentum: 'negative' },
  { symbol: 'UBER',  price:   74.20, change24h:  1.1,  weight: 0.02, volatility: 'med',  momentum: 'positive' },
  { symbol: 'PLTR',  price:   24.50, change24h:  3.1,  weight: 0.02, volatility: 'high', momentum: 'positive' },
  { symbol: 'SHOP',  price:   72.90, change24h: -0.5,  weight: 0.02, volatility: 'med',  momentum: 'neutral'  },
  { symbol: 'INTC',  price:   30.40, change24h: -1.7,  weight: 0.02, volatility: 'high', momentum: 'negative' },
  { symbol: 'SNAP',  price:   11.20, change24h: -3.4,  weight: 0.01, volatility: 'high', momentum: 'negative' },
  { symbol: 'AVGO',  price:  145.30, change24h:  1.5,  weight: 0.02, volatility: 'low',  momentum: 'positive' },
  { symbol: 'TSM',   price:  164.80, change24h:  0.9,  weight: 0.02, volatility: 'low',  momentum: 'positive' },
  { symbol: 'ASML',  price:  672.40, change24h:  1.1,  weight: 0.02, volatility: 'low',  momentum: 'positive' },
  { symbol: 'ADBE',  price:  381.20, change24h: -0.6,  weight: 0.02, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'CRM',   price:  219.50, change24h: -0.4,  weight: 0.02, volatility: 'med',  momentum: 'neutral'  },
  { symbol: 'ORCL',  price:  121.70, change24h:  0.8,  weight: 0.02, volatility: 'low',  momentum: 'positive' },
  { symbol: 'QCOM',  price:  164.30, change24h:  1.3,  weight: 0.01, volatility: 'med',  momentum: 'positive' },
  { symbol: 'MU',    price:   91.40, change24h:  2.7,  weight: 0.01, volatility: 'high', momentum: 'positive' },
  { symbol: 'TXN',   price:  174.60, change24h:  0.2,  weight: 0.01, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'LLY',   price:  782.30, change24h:  1.9,  weight: 0.01, volatility: 'med',  momentum: 'positive' },
  { symbol: 'JNJ',   price:  148.20, change24h:  0.1,  weight: 0.01, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'XOM',   price:  112.40, change24h: -0.3,  weight: 0.01, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'CVX',   price:  154.90, change24h: -0.5,  weight: 0.01, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'GS',    price:  481.20, change24h:  0.7,  weight: 0.01, volatility: 'low',  momentum: 'positive' },
  { symbol: 'MS',    price:   96.30, change24h:  0.4,  weight: 0.01, volatility: 'low',  momentum: 'neutral'  },
  { symbol: 'BAC',   price:   37.80, change24h: -0.2,  weight: 0.01, volatility: 'med',  momentum: 'neutral'  },
  { symbol: 'WFC',   price:   52.40, change24h: -0.3,  weight: 0.01, volatility: 'med',  momentum: 'neutral'  },
  { symbol: 'BABA',  price:   75.60, change24h: -1.8,  weight: 0.01, volatility: 'high', momentum: 'negative' },
  { symbol: 'ROKU',  price:   54.20, change24h: -2.1,  weight: 0.01, volatility: 'high', momentum: 'negative' },
  { symbol: 'HOOD',  price:   18.30, change24h:  4.2,  weight: 0.01, volatility: 'high', momentum: 'positive' },
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
