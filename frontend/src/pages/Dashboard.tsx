import { StatsCards } from '@/components/features/StatsCards';
import { TravelTimeChart } from '@/components/features/TravelTimeChart';
import { CrowdDensityChart } from '@/components/features/CrowdDensityChart';
import { RecentRoutes } from '@/components/features/RecentRoutes';
import { TrafficMap } from '@/components/features/TrafficMap';
import { TypographyH2, TypographyP } from '@/components/shared/Typography';

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <TypographyH2>Overview</TypographyH2>
        <TypographyP className="mt-1">Real-time traffic insights and route analytics</TypographyP>
      </div>

      {/* Stat cards */}
      <StatsCards />

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <TravelTimeChart />
        </div>
        <div className="xl:col-span-1">
          <CrowdDensityChart />
        </div>
      </div>

      {/* Live traffic map */}
      <TrafficMap />

      {/* Recent routes */}
      <RecentRoutes />
    </div>
  );
}
