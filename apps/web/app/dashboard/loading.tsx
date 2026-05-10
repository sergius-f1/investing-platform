import { Skeleton } from '@/components/ui/skeleton';

function DonutSkeleton() {
    return (
        <div className="flex h-[200px] items-center justify-center">
            <Skeleton className="h-40 w-40 rounded-full" />
        </div>
    );
}

function StatCardSkeleton() {
    return (
        <div className="flex flex-col gap-2 rounded-lg border p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-32" />
        </div>
    );
}

function TableRowSkeleton() {
    return (
        <div className="flex gap-4 border-b border-border px-2 py-3 last:border-0">
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

            <section className="flex items-center gap-8">
                <div className="w-56 shrink-0">
                    <Skeleton className="mb-2 h-4 w-32" />
                    <DonutSkeleton />
                </div>
                <div className="grid flex-1 grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <StatCardSkeleton key={i} />
                    ))}
                </div>
            </section>

            <div className="rounded-md border">
                <div className="flex gap-4 border-b border-border px-2 py-3">
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
