"use client";

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

const MapComponentWithNoSSR = dynamic(() => import('@/components/core/map'), { 
  ssr: false
});

export default function Page() {
  const searchParams = useSearchParams();
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  // Convert to numbers safely
  const lat = latParam ? parseFloat(latParam) : undefined;
  const lng = lngParam ? parseFloat(lngParam) : undefined;

  const MemoizedMapComponent = useMemo(() => {
    if (lat !== undefined && lng !== undefined) {
      return <MapComponentWithNoSSR lat={lat} lng={lng} />;
    }
    return <p>Invalid or missing coordinates</p>;
  }, [lat, lng]);

  return (
    <section className="z-10">
      {MemoizedMapComponent}
    </section>
  );
}
