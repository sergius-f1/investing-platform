'use client';

import { useState, useEffect } from 'react';
import type { PositionSignal } from '@fedasenka/models';
import { createPositionsStream } from '@/lib/api/client/positions';

export function usePositionsStream(initialPositions: PositionSignal[]): PositionSignal[] {
    const [positions, setPositions] = useState(initialPositions);

    useEffect(() => {
        const source = createPositionsStream();
        source.onmessage = (event) => setPositions(JSON.parse(event.data));
        return () => source.close();
    }, []);

    return positions;
}
