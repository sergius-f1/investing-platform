export interface Position {
    symbol: string;
    price: number;
    change24h: number;
    weight: number;
    volatility: 'low' | 'med' | 'high';
    momentum: 'positive' | 'neutral' | 'negative';
}

export const portfolioMeta = {
    totalValue: 2_480_000,
    dailyPnL: 14_320,
    dailyPnLPct: 0.58,
    riskScore: 62,
};
