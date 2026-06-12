import { BarChart2, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrafficKPIBar } from '@/components/traffic/TrafficKPIBar';
import { SpeedCorridorPanel } from '@/components/traffic/SpeedCorridorPanel';
import { TransitStatusBar } from '@/components/traffic/TransitStatusBar';
import { CCTVFeedsPanel } from '@/components/traffic/CCTVFeedsPanel';
import { MiniCongestionChart } from '@/components/traffic/MiniCongestionChart';
import { CameraFeedCard } from '@/components/traffic/CameraFeedCard';
import { CongestionTrendsChart } from '@/components/traffic/CongestionTrendsChart';
import { IncidentResponsePanel } from '@/components/traffic/IncidentResponsePanel';
import { IncidentSummaryPanel } from '@/components/traffic/IncidentSummaryPanel';
import { SignalPerformancePanel } from '@/components/traffic/SignalPerformancePanel';
import { WeatherPanel } from '@/components/traffic/WeatherPanel';
import { RoadwayThroughputChart } from '@/components/traffic/RoadwayThroughputChart';
import { TrafficMap } from '@/components/features/TrafficMap';

export function TrafficDashboard() {
  return (
    <div className="flex flex-col gap-3 p-3">
      {/* ── Dashboard Header ───────────────────────────────────── */}
      <div className="flex items-center justify-between py-1">
        <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
          <BarChart2 size={13} />
          KPI2E
        </Button>

        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Traffic Management Dashboard
        </h1>

        <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
          <Plus size={13} />
          <Settings size={13} />
          Settings
        </Button>
      </div>

      {/* ── KPI Row ────────────────────────────────────────────── */}
      <TrafficKPIBar />

      {/* ── Main 3-column grid ─────────────────────────────────── */}
      <div className="grid gap-3 grid-cols-1 xl:grid-cols-[minmax(0,2.4fr)_minmax(0,1.7fr)_290px]">

        {/* ── Left column: Map + Corridor + Transit ── */}
        <div className="flex flex-col gap-3">
          <TrafficMap />
          <SpeedCorridorPanel />
          <TransitStatusBar />
        </div>

        {/* ── Middle column: CCTV + Mini chart + Camera feeds + Congestion + Response ── */}
        <div className="flex flex-col gap-3">
          <CCTVFeedsPanel />
          <MiniCongestionChart />
          <CameraFeedCard
            name="Broadway Ave Cam"
            imageUrl="https://picsum.photos/seed/broadwaycam9/400/220"
            className="h-32"
          />
          <CameraFeedCard
            name="Main St Cam"
            imageUrl="https://picsum.photos/seed/mainstcam5/400/220"
            className="h-32"
          />
          <CongestionTrendsChart />
          <IncidentResponsePanel />
        </div>

        {/* ── Right column: Incidents + Signal + Weather + Throughput ── */}
        <div className="flex flex-col gap-3">
          <IncidentSummaryPanel />
          <SignalPerformancePanel />
          <WeatherPanel />
          <RoadwayThroughputChart />
        </div>
      </div>
    </div>
  );
}
