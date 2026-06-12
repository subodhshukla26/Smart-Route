import { apiRequest } from '@/api/client';
import type { TrafficData } from '@/types';

const BASE_URL = '/api/traffic';

export function fetchTrafficData(area?: string): Promise<TrafficData[]> {
  const params = new URLSearchParams();

  if (area?.trim()) {
    params.set('area', area.trim());
  }

  const query = params.toString();
  return apiRequest<TrafficData[]>(query ? `${BASE_URL}?${query}` : BASE_URL);
}

export function addTrafficData(trafficData: Omit<TrafficData, 'id' | 'updatedAt'>): Promise<TrafficData> {
  return apiRequest<TrafficData>(BASE_URL, {
    method: 'POST',
    body: trafficData,
  });
}
