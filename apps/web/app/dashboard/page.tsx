import { getDashboard } from '@/lib/api/server/dashboard';
import { PositionsTable } from '@/app/dashboard/components/positions-table';

export default async function DashboardPage() {
    const data = await getDashboard();

    if (!data) {
        return <p className="p-8 text-destructive">Failed to load dashboard.</p>;
    }

    const { meta, positions } = data;

    return (
        <main className="flex flex-col gap-8 p-8">
            <h1 className="text-2xl font-semibold">Portfolio</h1>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat label="Total Value" value={`$${meta.totalValue.toLocaleString()}`} />
                <Stat label="Daily P&L" value={`$${meta.dailyPnL.toLocaleString()}`} />
                <Stat label="Daily P&L %" value={`${meta.dailyPnLPct}%`} />
                <Stat label="Risk Score" value={String(meta.riskScore)} />
            </div>

            <PositionsTable initialPositions={positions} />
        </main>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-xl font-semibold">{value}</p>
        </div>
    );
}
