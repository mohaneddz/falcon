"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const MapComponentWithNoSSR = dynamic(() => import('@/components/core/map'), { // Adjust the import path as needed
  ssr: false
});

export default function page () {

  const MemoizedMapComponent = useMemo(() => <MapComponentWithNoSSR />, []);

  return (
    <div>
      {MemoizedMapComponent}
    </div>
  );
};
