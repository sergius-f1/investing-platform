import { httpClient } from '@/lib/api/server';

export function streamPositions(): Promise<Response> {
    return httpClient.sse('/api/dashboard/stream');
}
