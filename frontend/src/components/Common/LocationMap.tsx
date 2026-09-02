import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface LocationMapProps {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ apiKey, center, zoom = 12 }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const gmaps = (window as any).google;
        const map = new gmaps.maps.Map(mapRef.current, {
          center,
          zoom,
        });

        // Add marker for polling place
        new gmaps.maps.Marker({
          position: center,
          map,
          title: 'Polling Place',
        });
      }
    });
  }, [apiKey, center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%' }}
      role="img"
      aria-label="Map showing polling place location"
    />
  );
};

export default LocationMap;