import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
    after?: string;
    nextCursor: string | null;
    prevCursor: string | null;
}

export function PaginationControls({ after, nextCursor, prevCursor }: Props) {
    const isFirstPage = !after;
    const prevHref = prevCursor ? `/dashboard?after=${prevCursor}` : '/dashboard';
    const nextHref = nextCursor ? `/dashboard?after=${nextCursor}` : undefined;

    return (
        <Pagination className="justify-end">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={isFirstPage ? undefined : prevHref}
                        aria-disabled={isFirstPage}
                        className={isFirstPage ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        href={nextHref}
                        aria-disabled={!nextCursor}
                        className={!nextCursor ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
