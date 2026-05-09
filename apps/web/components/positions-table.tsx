import type { PositionSignal } from '@fedasenka/models';
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

interface Props {
    positions: PositionSignal[];
}

export function PositionsTable({ positions }: Props) {
    return (
        <Table>
            <TableHeader>
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
                {positions.map((pos) => (
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
                ))}
            </TableBody>
        </Table>
    );
}
