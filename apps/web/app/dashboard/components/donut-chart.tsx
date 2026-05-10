'use client';

import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import type { PositionSignal } from '@fedasenka/models';
import { prepareAllocationData } from '@/app/dashboard/utils';

interface Props {
    positions: PositionSignal[];
}

export function DonutChart({ positions }: Props) {
    const data = prepareAllocationData(positions);

    return (
        <div>
            <ResponsiveContainer width="100%" height={200} style={{ border: 'none', outline: 'none' }}>
                <PieChart style={{ background: 'transparent' }}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        paddingAngle={2}
                    />
                    <Tooltip
                        formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`}
                        contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fff' }}
                    />
                </PieChart>
            </ResponsiveContainer>

            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {data.map((entry) => (
                    <li key={entry.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: entry.fill }} />
                        {entry.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
