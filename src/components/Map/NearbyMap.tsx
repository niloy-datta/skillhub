import { Map, LocationMarker, workerIcon, UpdateMapCenter } from './Map';
import { getCityCoordinates } from './WorkerMap';
import { useState } from 'react';
import type { Worker } from '../../types';

interface NearbyMapProps {
  workers: Worker[];
  userLocation?: string;
  radius?: number; // in km
  height?: string;
  onWorkerSelect?: (worker: Worker) => void;
}

export function NearbyMap({ workers, userLocation = 'Dhaka', radius = 50, height = '500px', onWorkerSelect }: NearbyMapProps) {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const userCoords = getCityCoordinates(userLocation);

  // Filter workers within radius (simplified - just show all for now)
  const nearbyWorkers = workers;

  const handleWorkerClick = (worker: Worker) => {
    setSelectedWorker(worker);
    onWorkerSelect?.(worker);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Map center={userCoords} zoom={11} height={height}>
        <UpdateMapCenter center={userCoords} zoom={11} />
        
        {/* User location marker */}
        <LocationMarker
          position={userCoords}
          title="Your Location"
          description={`
            <div style="min-width: 150px;">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">📍 ${userLocation}</div>
              <div style="font-size: 12px; color: #666;">Search radius: ${radius}km</div>
            </div>
          `}
        />

        {/* Worker markers */}
        {nearbyWorkers.map((worker) => {
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
                      <div style="font-size: 12px; color: #666;">${worker.city}</div>
                    </div>
                  </div>
                  <div style="margin-bottom: 8px;">
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                      ${worker.skills.slice(0, 2).map(skill => 
                        `<span style="background: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${skill}</span>`
                      ).join('')}
                    </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <span style="color: #f59e0b;">★</span>
                      <span style="font-weight: bold;">${worker.rating}</span>
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

      {/* Selected worker info panel */}
      {selectedWorker && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          background: 'white',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '32px' }}>{selectedWorker.avatar}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{selectedWorker.name}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{selectedWorker.city}, {selectedWorker.country}</div>
            </div>
            <button 
              onClick={() => setSelectedWorker(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#999',
              }}
            >
              ✕
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {selectedWorker.skills.slice(0, 3).map(skill => (
              <span 
                key={skill}
                style={{
                  background: '#e0e7ff',
                  color: '#4338ca',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#f59e0b' }}>★</span>
                <span style={{ fontWeight: 'bold' }}>{selectedWorker.rating}</span>
                <span style={{ fontSize: '12px', color: '#666' }}>({selectedWorker.reviews} reviews)</span>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                {selectedWorker.completedWork} jobs completed
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#10b981' }}>
                {selectedWorker.currency}{selectedWorker.expectedRate}
                <span style={{ fontSize: '14px', color: '#666' }}>/hr</span>
              </div>
              {selectedWorker.availableNow && (
                <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
                  ✓ Available now
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'white',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        fontSize: '12px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Legend</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#6366f1', borderRadius: '50%' }}></div>
          <span>Workers</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }}></div>
          <span>Your Location</span>
        </div>
      </div>
    </div>
  );
}
