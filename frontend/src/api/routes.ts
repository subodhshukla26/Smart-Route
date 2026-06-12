import type { Route } from '@/types';
import { apiRequest } from '@/api/client';

const BASE_URL = '/api/routes';

export async function fetchRoutes(): Promise<Route[]> {
  return apiRequest<Route[]>(BASE_URL);
}

export async function addRoute(route: Omit<Route, 'id'>): Promise<Route> {
  return apiRequest<Route>(BASE_URL, {
    method: 'POST',
    body: route,
  });
}

export async function fetchBestRoute(source?: string, destination?: string): Promise<Route | null> {
  const params = new URLSearchParams();

    if (source?.trim()) {
    params.set('source', source.trim());
  }

  if (destination?.trim()) {
    params.set('destination', destination.trim());
  }

  const query = params.toString();
  return apiRequest<Route | null>(`${BASE_URL}/best${query ? `?${query}` : ''}`);
}
