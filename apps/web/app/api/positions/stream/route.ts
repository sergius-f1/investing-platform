import { streamPositions } from '@/lib/api/server/positions';

export function GET() {
    return streamPositions();
}
