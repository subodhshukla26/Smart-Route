import type { RouteSuggestion } from '@/types';

export const travelTimeChartData = [
  { day: 'Mon', predicted: 28, actual: 30 },
  { day: 'Tue', predicted: 35, actual: 33 },
  { day: 'Wed', predicted: 45, actual: 48 },
  { day: 'Thu', predicted: 38, actual: 36 },
  { day: 'Fri', predicted: 52, actual: 55 },
  { day: 'Sat', predicted: 22, actual: 20 },
  { day: 'Sun', predicted: 18, actual: 17 },
];

export const crowdDensityData = [
  { zone: 'Zone A', density: 82, fill: 'var(--chart-5)' },
  { zone: 'Zone B', density: 55, fill: 'var(--chart-4)' },
  { zone: 'Zone C', density: 38, fill: 'var(--chart-3)' },
  { zone: 'Zone D', density: 70, fill: 'var(--chart-4)' },
  { zone: 'Zone E', density: 28, fill: 'var(--chart-2)' },
];

export const mockStats = {
  totalRoutes: 24,
  avgTravelTime: 34,
  congestionLevel: 'Medium',
  onTimeRate: 87,
};

export function generatePrediction(
  source: string,
  destination: string,
  timeOfDay: string,
): {
  predictedTime: number;
  confidence: number;
  congestionLevel: 'Low' | 'Medium' | 'High';
  suggestions: RouteSuggestion[];
} {
  const baseTime = Math.floor(Math.random() * 25) + 20;
  const multipliers: Record<string, number> = {
    morning: 1.5,
    afternoon: 1.0,
    evening: 1.7,
    night: 0.7,
  };
  const mult = multipliers[timeOfDay] ?? 1.0;
  const predictedTime = Math.round(baseTime * mult);

  const congestionMap: Record<string, 'Low' | 'Medium' | 'High'> = {
    morning: 'High',
    afternoon: 'Medium',
    evening: 'High',
    night: 'Low',
  };

  return {
    predictedTime,
    confidence: Math.floor(Math.random() * 15) + 80,
    congestionLevel: congestionMap[timeOfDay] ?? 'Medium',
    suggestions: [
      {
        name: 'Best Route',
        distance: parseFloat((Math.random() * 5 + 5).toFixed(1)),
        estimatedTime: predictedTime,
        congestion: congestionMap[timeOfDay] ?? 'Medium',
        via: `${source} Highway`,
      },
      {
        name: 'Alternative Route',
        distance: parseFloat((Math.random() * 5 + 7).toFixed(1)),
        estimatedTime: predictedTime + Math.floor(Math.random() * 8) + 5,
        congestion: 'Low',
        via: 'Inner Ring Road',
      },
      {
        name: 'Scenic Route',
        distance: parseFloat((Math.random() * 5 + 10).toFixed(1)),
        estimatedTime: predictedTime + Math.floor(Math.random() * 12) + 8,
        congestion: 'Low',
        via: `${destination} Bypass`,
      },
    ],
  };
}
