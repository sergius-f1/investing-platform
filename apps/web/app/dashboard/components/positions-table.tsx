'use client';

import { useRef } from 'react';
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

interface Props {
    initialPositions: PositionSignal[];
}

export function PositionsTable({ initialPositions }: Props) {
    const positions = usePositionsStream(initialPositions);
    const scrollRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: positions.length,
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
            containerRef={scrollRef}
            containerClassName="h-96 overflow-auto rounded-md border"
        >
            <TableHeader className="sticky top-0 z-10 bg-background">
                <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Signal</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Rationale</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paddingTop > 0 && (
                    <tr><td colSpan={COLUMNS} style={{ height: paddingTop }} /></tr>
                )}
                {virtualRows.map((virtualRow) => {
                    const pos = positions[virtualRow.index];
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
                            <TableCell className="text-muted-foreground">{pos.rationale}</TableCell>
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
