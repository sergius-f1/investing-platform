'use client';

import { useState, useEffect } from 'react';
import type { PositionSignal } from '@fedasenka/models';
import { createPositionsStream } from '@/lib/api/client/positions';

export function usePositionsStream(initialPositions: PositionSignal[], after?: string): PositionSignal[] {
    const [positions, setPositions] = useState(initialPositions);

    useEffect(() => {
        const source = createPositionsStream(after);
        source.onmessage = (event) => setPositions(JSON.parse(event.data));
        return () => source.close();
    }, [after]);

    return positions;
}
