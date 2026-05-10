import type { ReactNode } from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { TableHead } from '@/components/ui/table';
import type { SortDir } from '@/lib/types';

interface Props {
    sortDir: SortDir;
    onSort: () => void;
    children: ReactNode;
    className?: string;
}

export function SortableHead({ sortDir, onSort, children, className }: Props) {
    return (
        <TableHead className={`cursor-pointer select-none ${className ?? ''}`} onClick={onSort}>
            <span className="flex items-center gap-1">
                {children}
                {sortDir === 'asc'  && <ArrowUp      className="h-3 w-3" />}
                {sortDir === 'desc' && <ArrowDown     className="h-3 w-3" />}
                {sortDir === null   && <ArrowUpDown   className="h-3 w-3 text-muted-foreground" />}
            </span>
        </TableHead>
    );
}
