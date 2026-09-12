import { Map, LocationMarker, companyIcon } from './Map';
import { getCityCoordinates } from './WorkerMap';
import type { Company } from '../../types';

interface CompanyMapProps {
  companies: Company[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onCompanyClick?: (company: Company) => void;
}

export function CompanyMap({ companies, center, zoom = 12, height = '500px', onCompanyClick }: CompanyMapProps) {
  // Calculate center based on companies if not provided
  const mapCenter = center || (companies.length > 0 
    ? getCityCoordinates(companies[0].city)
    : [23.8103, 90.4125] // Default to Dhaka
  );

  return (
    <Map center={mapCenter} zoom={zoom} height={height}>
      {companies.map((company) => {
        const coords = getCityCoordinates(company.city);
        
        return (
          <LocationMarker
            key={company.id}
            position={coords}
            title={company.name}
            description={`
              <div style="min-width: 220px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="font-size: 28px;">${company.logo}</span>
                  <div>
                    <div style="font-weight: bold; font-size: 16px;">${company.name}</div>
                    <div style="font-size: 12px; color: #666;">${company.city}, ${company.country}</div>
                  </div>
                </div>
                <div style="margin-bottom: 8px;">
                  <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Industry:</div>
                  <span style="background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${company.industry}</span>
                </div>
                <div style="margin-bottom: 8px;">
                  <div style="font-size: 13px; line-height: 1.4; color: #374151;">${company.tagline}</div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #e5e7eb;">
                  <div>
                    <div style="font-size: 11px; color: #666;">${company.activeJobs} jobs</div>
                    <div style="font-size: 11px; color: #666;">${company.activeShifts} shifts</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <span style="color: #f59e0b;">★</span>
                      <span style="font-weight: bold;">${company.workerRating}</span>
                    </div>
                    ${company.verified ? '<div style="font-size: 11px; color: #10b981;">✓ Verified</div>' : ''}
                  </div>
                </div>
              </div>
            `}
            icon={companyIcon}
          />
        );
      })}
    </Map>
  );
}
