export const trafficKPIData = {
  averageSpeed: { value: 26, unit: 'mph' },
  trafficVolume: { value: 12450, unit: 'vehicles/hr' },
  incidentAlerts: { count: 5, label: 'Active Alerts' },
  travelTimeIndex: { value: 1.8, status: 'Congested' },
};

export const corridorSpeedsData = [
  { corridor: 'I-95', speed: 35, limit: 65, color: '#10B981' },
  { corridor: 'Main St', speed: 28, limit: 65, color: '#10B981' },
  { corridor: 'Route 45', speed: 22, limit: 65, color: '#F59E0B' },
  { corridor: 'Highway 22', speed: 30, limit: 65, color: '#10B981' },
  { corridor: 'Downtown', speed: 18, limit: 65, color: '#EF4444' },
];

export const incidentsData = [
  { id: 1, description: 'Accident on I-95', meta: '7 mins Since', color: '#F59E0B', hasAction: false },
  { id: 2, description: 'Construction on Main St', meta: 'Roadwork', color: '#F59E0B', hasAction: false },
  { id: 3, description: 'Stalled Vehicle on Route 12', meta: '', color: '#F59E0B', hasAction: true },
  { id: 4, description: 'Lane Closure on Hwy 8', meta: '', color: '#EF4444', hasAction: true },
  { id: 5, description: 'Weather Alert: Heavy Rain', meta: '', color: '#F97316', hasAction: true },
];

export const signalPerformanceData = {
  intersectionDelay: 65,
  signalEfficiency: 81,
};

export const weatherData = {
  condition: 'Heavy Rain',
  visibility: 'Low Visibility',
  tempF: 62,
  rainIntensity: 72,
  windLevel: 45,
};

export const congestionTrendsData = [
  { time: '6 AM', thisWeek: 18, lastWeek: 22 },
  { time: '3 AM', thisWeek: 8, lastWeek: 12 },
  { time: '8 AM', thisWeek: 45, lastWeek: 38 },
  { time: '5 PM', thisWeek: 48, lastWeek: 42 },
  { time: '7 PM', thisWeek: 28, lastWeek: 36 },
];

export const miniCongestionData = [
  { time: '6 AM', low: 30, medium: 20, high: 8 },
  { time: '8 AM', low: 14, medium: 28, high: 26 },
  { time: '10 AM', low: 20, medium: 22, high: 14 },
  { time: '12 PM', low: 24, medium: 32, high: 16 },
  { time: '2 PM', low: 20, medium: 26, high: 18 },
  { time: '4 PM', low: 10, medium: 22, high: 36 },
  { time: '6 PM', low: 12, medium: 18, high: 30 },
  { time: '8 PM', low: 26, medium: 18, high: 10 },
];

export const roadwayThroughputData = [
  { time: '6AM', vehicles: 220 },
  { time: '3AM', vehicles: 155 },
  { time: '8PM', vehicles: 470 },
  { time: '1PM', vehicles: 315 },
  { time: '5PM', vehicles: 400 },
];

export const incidentResponseData = {
  averageResponse: 8,
  majorIncidents: 12,
  secondaryIncidents: 15,
};

export const cctvFeedsData = [
  { id: 'cam1', name: 'I-95 & 5th Ave', imageUrl: 'https://picsum.photos/seed/highway95/200/120' },
  { id: 'cam2', name: 'Downtown Tunnel', imageUrl: 'https://picsum.photos/seed/downtunnel/200/120' },
  { id: 'cam3', name: 'Downtown 2 Tunnel', imageUrl: 'https://picsum.photos/seed/tunnel2city/200/120' },
  { id: 'cam4', name: 'Accident Bl', imageUrl: 'https://picsum.photos/seed/trafficjam7/200/120' },
];

export const transitStatusData = {
  delays: 10,
  serviceAlerts: 2,
  onSchedule: true,
};
