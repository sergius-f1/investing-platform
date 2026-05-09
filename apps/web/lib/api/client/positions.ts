export function createPositionsStream(after?: string): EventSource {
    const params = after ? `?after=${after}` : '';
    return new EventSource(`/api/positions/stream${params}`);
}
