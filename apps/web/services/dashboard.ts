import { httpClient } from '@/lib/api';
import type { DashboardResponse } from '@fedasenka/models';

export function getDashboard(): Promise<DashboardResponse | undefined> {
    return httpClient.get<DashboardResponse>('/api/dashboard');
}
