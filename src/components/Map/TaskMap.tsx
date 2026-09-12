import { Map, LocationMarker, taskIcon } from './Map';
import { getCityCoordinates } from './WorkerMap';
import type { Task } from '../../types';

interface TaskMapProps {
  tasks: Task[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onTaskClick?: (task: Task) => void;
}

export function TaskMap({ tasks, center, zoom = 12, height = '500px', onTaskClick }: TaskMapProps) {
  // Calculate center based on tasks if not provided
  const mapCenter = center || (tasks.length > 0 
    ? getCityCoordinates(tasks[0].city)
    : [23.8103, 90.4125] // Default to Dhaka
  );

  return (
    <Map center={mapCenter} zoom={zoom} height={height}>
      {tasks.map((task) => {
        const coords = getCityCoordinates(task.city);
        
        return (
          <LocationMarker
            key={task.id}
            position={coords}
            title={task.title}
            description={`
              <div style="min-width: 220px;">
                <div style="margin-bottom: 8px;">
                  <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${task.title}</div>
                  <div style="font-size: 12px; color: #666;">${task.city}, ${task.country}</div>
                </div>
                <div style="margin-bottom: 8px;">
                  <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Category:</div>
                  <span style="background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${task.category}</span>
                </div>
                <div style="margin-bottom: 8px;">
                  <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Description:</div>
                  <div style="font-size: 13px; line-height: 1.4;">${task.description.substring(0, 100)}${task.description.length > 100 ? '...' : ''}</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                  <div>
                    <div style="font-size: 11px; color: #666;">Date: ${task.date}</div>
                    <div style="font-size: 11px; color: #666;">Duration: ${task.duration}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: bold; color: #f59e0b; font-size: 16px;">
                      ${task.currency}${task.budget.toLocaleString()}
                    </div>
                    <div style="font-size: 11px; color: #666;">${task.offersCount} offers</div>
                  </div>
                </div>
              </div>
            `}
            icon={taskIcon}
          />
        );
      })}
    </Map>
  );
}
