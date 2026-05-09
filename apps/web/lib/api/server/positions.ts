import { httpClient } from '@/lib/api/server';

export function streamPositions(after?: string): Promise<Response> {
    const params = new URLSearchParams({ limit: '10' });
    if (after) params.set('after', after);
    return httpClient.sse(`/api/dashboard/stream?${params}`);
}
