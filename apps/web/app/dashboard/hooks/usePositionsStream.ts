'use client';

import { useState, useEffect } from 'react';
import type { PositionSignal } from '@fedasenka/models';
import { createPositionsStream } from '@/lib/api/client/positions';

export function usePositionsStream(initialPositions: PositionSignal[]): PositionSignal[] {
    const [positions, setPositions] = useState(initialPositions);

    useEffect(() => {
        const source = createPositionsStream();
        source.onmessage = (event) => {
            const delta: PositionSignal[] = JSON.parse(event.data);
            setPositions((prev) => {
                const map = new Map(prev.map((p) => [p.symbol, p]));

                delta.forEach(p => map.set(p.symbol, p));

                return Array.from(map.values());
            });
        };
        return () => source.close();
    }, []);

    return positions;
}
