'use client';

import { useRef, useState, useMemo } from 'react';
import { SortableHead } from '@/components/ui/sortable-head';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { PositionSignal } from '@fedasenka/models';
import { usePositionsStream } from '@/app/dashboard/hooks/usePositionsStream';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const signalColors: Record<PositionSignal['signal'], string> = {
    BUY:    'text-green-600',
    HOLD:   'text-yellow-600',
    REDUCE: 'text-red-600',
};

const COLUMNS = 7;
const ROW_HEIGHT = 41;

const SIGNAL_ORDER: Record<PositionSignal['signal'], number> = { BUY: 0, HOLD: 1, REDUCE: 2 };

import type { SortDir } from '@/lib/types';

interface Props {
    initialPositions: PositionSignal[];
}

export function PositionsTable({ initialPositions }: Props) {
    const positions = usePositionsStream(initialPositions);
    const [signalSort, setSignalSort] = useState<SortDir>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const sortedPositions = useMemo(() => {
        if (!signalSort) return positions;
        return [...positions].sort((a, b) => {
            const diff = SIGNAL_ORDER[a.signal] - SIGNAL_ORDER[b.signal];
            return signalSort === 'asc' ? diff : -diff;
        });
    }, [positions, signalSort]);

    const cycleSort = () =>
        setSignalSort((prev) => (prev === null ? 'asc' : prev === 'asc' ? 'desc' : null));

    const virtualizer = useVirtualizer({
        count: sortedPositions.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => ROW_HEIGHT,
    });

    const virtualRows = virtualizer.getVirtualItems();
    const totalSize = virtualizer.getTotalSize();
    const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
    const paddingBottom = virtualRows.length > 0
        ? totalSize - virtualRows[virtualRows.length - 1].end
        : 0;

    return (
        <Table
            className="table-fixed"
            containerRef={scrollRef}
            containerClassName="h-96 overflow-auto rounded-md border"
        >
            <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow>
                    <TableHead className="w-24">Symbol</TableHead>
                    <TableHead className="w-28">Price</TableHead>
                    <TableHead className="w-28">24h Change</TableHead>
                    <TableHead className="w-20">Weight</TableHead>
                    <SortableHead sortDir={signalSort} onSort={cycleSort} className="w-24">
                        Signal
                    </SortableHead>
                    <TableHead className="w-28">Confidence</TableHead>
                    <TableHead className="w-64">Rationale</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paddingTop > 0 && (
                    <tr><td colSpan={COLUMNS} style={{ height: paddingTop }} /></tr>
                )}
                {virtualRows.map((virtualRow) => {
                    const pos = sortedPositions[virtualRow.index];
                    return (
                        <TableRow key={pos.symbol}>
                            <TableCell className="font-medium">{pos.symbol}</TableCell>
                            <TableCell>${pos.price.toFixed(2)}</TableCell>
                            <TableCell className={pos.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {pos.change24h >= 0 ? '+' : ''}{pos.change24h.toFixed(2)}%
                            </TableCell>
                            <TableCell>{(pos.weight * 100).toFixed(0)}%</TableCell>
                            <TableCell className={`font-semibold ${signalColors[pos.signal]}`}>
                                {pos.signal}
                            </TableCell>
                            <TableCell>{(pos.confidence * 100).toFixed(0)}%</TableCell>
                            <TableCell className="truncate text-muted-foreground" title={pos.rationale}>{pos.rationale}</TableCell>
                        </TableRow>
                    );
                })}
                {paddingBottom > 0 && (
                    <tr><td colSpan={COLUMNS} style={{ height: paddingBottom }} /></tr>
                )}
            </TableBody>
        </Table>
    );
}
