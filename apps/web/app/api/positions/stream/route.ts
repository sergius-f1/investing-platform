import { streamPositions } from '@/lib/api/server/positions';

export function GET(request: Request) {
    const after = new URL(request.url).searchParams.get('after') ?? undefined;
    return streamPositions(after);
}
