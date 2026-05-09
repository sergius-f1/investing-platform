import { z } from 'zod';

export const PortfolioMetaSchema = z.object({
    totalValue: z.number(),
    dailyPnL: z.number(),
    dailyPnLPct: z.number(),
    riskScore: z.number(),
});

export const SignalSchema = z.enum(['BUY', 'HOLD', 'REDUCE']);

export const PositionSignalSchema = z.object({
    symbol: z.string(),
    price: z.number(),
    change24h: z.number(),
    weight: z.number(),
    signal: SignalSchema,
    confidence: z.number(),
    rationale: z.string(),
});

export const DashboardResponseSchema = z.object({
    meta: PortfolioMetaSchema,
    positions: z.array(PositionSignalSchema),
    nextCursor: z.string().nullable(),
    prevCursor: z.string().nullable(),
});

export type PortfolioMeta = z.infer<typeof PortfolioMetaSchema>;
export type Signal = z.infer<typeof SignalSchema>;
export type PositionSignal = z.infer<typeof PositionSignalSchema>;
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
