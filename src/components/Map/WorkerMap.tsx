import { Map, LocationMarker, workerIcon } from './Map';
import type { Worker } from '../../types';

interface WorkerMapProps {
  workers: Worker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onWorkerClick?: (worker: Worker) => void;
}

// City coordinates mapping
const CITY_COORDS: Record<string, [number, number]> = {
  // Bangladesh
  'Dhaka': [23.8103, 90.4125],
  'Gazipur': [23.9999, 90.4203],
  'Chittagong': [22.3569, 91.7832],
  
  // Japan
  'Tokyo': [35.6762, 139.6503],
  'Shinjuku': [35.6938, 139.7036],
  'Osaka': [34.6937, 135.5023],
  
  // UAE
  'Dubai': [25.2048, 55.2708],
  'Abu Dhabi': [24.4539, 54.3773],
  
  // Portugal
  'Lisbon': [38.7223, -9.1393],
  'Porto': [41.1579, -8.6291],
  
  // India
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.7041, 77.1025],
  'Bangalore': [12.9716, 77.5946],
  
  // Brazil
  'São Paulo': [-23.5505, -46.6333],
  'Rio de Janeiro': [-22.9068, -43.1729],
  
  // UK
  'London': [51.5074, -0.1278],
  'Manchester': [53.4808, -2.2426],
  
  // Netherlands
  'Amsterdam': [52.3676, 4.9041],
  'Rotterdam': [51.9244, 4.4777],
  
  // Singapore
  'Singapore': [1.3521, 103.8198],
  
  // Thailand
  'Bangkok': [13.7563, 100.5018],
  
  // Germany
  'Berlin': [52.5200, 13.4050],
  'Munich': [48.1351, 11.5820],
  
  // France
  'Paris': [48.8566, 2.3522],
  
  // Italy
  'Rome': [41.9028, 12.4964],
  'Milan': [45.4642, 9.1900],
  
  // Spain
  'Madrid': [40.4168, -3.7038],
  'Barcelona': [41.3851, 2.1734],
  
  // USA
  'New York': [40.7128, -74.0060],
  'Los Angeles': [34.0522, -118.2437],
  'San Francisco': [37.7749, -122.4194],
  
  // Canada
  'Toronto': [43.6532, -79.3832],
  'Vancouver': [49.2827, -123.1207],
  
  // Australia
  'Sydney': [-33.8688, 151.2093],
  'Melbourne': [-37.8136, 144.9631],
};

function getCityCoordinates(city: string): [number, number] {
  // Try exact match first
  if (CITY_COORDS[city]) {
    return CITY_COORDS[city];
  }
  
  // Try to find partial match
  for (const [key, coords] of Object.entries(CITY_COORDS)) {
    if (city.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(city.toLowerCase())) {
      return coords;
    }
  }
  
  // Default to Dhaka if no match
  return CITY_COORDS['Dhaka'];
}

export function WorkerMap({ workers, center, zoom = 12, height = '500px', onWorkerClick }: WorkerMapProps) {
  // Calculate center based on workers if not provided
  const mapCenter = center || (workers.length > 0 
    ? getCityCoordinates(workers[0].city)
    : [23.8103, 90.4125] // Default to Dhaka
  );

  return (
    <Map center={mapCenter} zoom={zoom} height={height}>
      {workers.map((worker) => {
        const coords = getCityCoordinates(worker.city);
        
        return (
          <LocationMarker
            key={worker.id}
            position={coords}
            title={worker.name}
            description={`
              <div style="min-width: 200px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 24px;">${worker.avatar}</span>
                  <div>
                    <div style="font-weight: bold; font-size: 16px;">${worker.name}</div>
                    <div style="font-size: 12px; color: #666;">${worker.city}, ${worker.country}</div>
                  </div>
                </div>
                <div style="margin-bottom: 8px;">
                  <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Skills:</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                    ${worker.skills.slice(0, 3).map(skill => 
                      `<span style="background: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${skill}</span>`
                    ).join('')}
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="color: #f59e0b;">★</span>
                    <span style="font-weight: bold;">${worker.rating}</span>
                    <span style="font-size: 12px; color: #666;">(${worker.reviews})</span>
                  </div>
                  <div style="font-weight: bold; color: #10b981;">
                    ${worker.currency}${worker.expectedRate}/hr
                  </div>
                </div>
              </div>
            `}
            icon={workerIcon}
          />
        );
      })}
    </Map>
  );
}

export { getCityCoordinates, CITY_COORDS };
