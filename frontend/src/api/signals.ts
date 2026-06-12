import { apiRequest } from '@/api/client';
import type { Signal } from '@/types';

const BASE_URL = '/api/signals';

export function fetchSignals(roadName?: string): Promise<Signal[]> {
  const params = new URLSearchParams();

  if (roadName?.trim()) {
    params.set('roadName', roadName.trim());
  }

  const query = params.toString();
  return apiRequest<Signal[]>(query ? `${BASE_URL}?${query}` : BASE_URL);
}

export function addSignal(signal: Omit<Signal, 'id' | 'updatedAt'>): Promise<Signal> {
  return apiRequest<Signal>(BASE_URL, {
    method: 'POST',
    body: signal,
  });
}
