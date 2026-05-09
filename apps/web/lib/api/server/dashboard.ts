import { httpClient } from '@/lib/api/server';
import type { DashboardResponse } from '@fedasenka/models';

export function getDashboard(after?: string): Promise<DashboardResponse | undefined> {
    const params = new URLSearchParams({ limit: '10' });
    if (after) params.set('after', after);
    return httpClient.get<DashboardResponse>(`/api/dashboard?${params}`);
}
