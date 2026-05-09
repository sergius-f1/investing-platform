import { Skeleton } from '@/components/ui/skeleton';

function StatCardSkeleton() {
    return (
        <div className="rounded-lg border p-4 flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-32" />
        </div>
    );
}

function TableRowSkeleton() {
    return (
        <div className="flex gap-4 px-2 py-3 border-b border-border last:border-0">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 flex-1" />
        </div>
    );
}

export default function DashboardLoading() {
    return (
        <main className="flex flex-col gap-8 p-8">
            <Skeleton className="h-8 w-28" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            <div className="rounded-md border">
                <div className="flex gap-4 px-2 py-3 border-b border-border">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-20" />
                    ))}
                </div>
                {Array.from({ length: 10 }).map((_, i) => (
                    <TableRowSkeleton key={i} />
                ))}
            </div>
        </main>
    );
}
