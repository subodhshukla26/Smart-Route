export interface Route {
  id?: string;
  source: string;
  destination: string;
  distance: number;
  estimatedTime: number;
}

export interface Signal {
  id?: string;
  name: string;
  roadName: string;
  status: string;
  waitTimeSeconds: number;
  latitude: number;
  longitude: number;
  updatedAt?: string;
}

export interface TrafficData {
  id?: string;
  roadName: string;
  area: string;
  trafficLevel: CongestionLevel | string;
  vehicleCount: number;
  averageSpeed: number;
  latitude: number;
  longitude: number;
  updatedAt?: string;
}

export interface RouteSuggestion {
  name: string;
  distance: number;
  estimatedTime: number;
  congestion: 'Low' | 'Medium' | 'High';
  via: string;
}

export interface PredictionResult {
  source: string;
  destination: string;
  predictedTime: number;
  confidence: number;
  congestionLevel: 'Low' | 'Medium' | 'High';
  suggestions: RouteSuggestion[];
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type ActivePage = 'dashboard' | 'planner' | 'routes' | 'traffic';
export type CongestionLevel = 'Low' | 'Medium' | 'High';

export interface VehicleMarker {
  id: string;
  type: 'vehicle' | 'signal';
  position: [number, number];
  label: string;
  status?: 'moving' | 'stopped' | 'idle';
  signalState?: 'red' | 'green' | 'yellow';
}

export interface TrafficSegment {
  id: string;
  name: string;
  congestion: CongestionLevel;
  positions: [number, number][];
}
