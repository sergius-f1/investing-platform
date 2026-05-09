export function createPositionsStream(): EventSource {
    return new EventSource('/api/positions/stream');
}
