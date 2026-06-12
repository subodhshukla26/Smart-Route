import { ArrowUp } from 'lucide-react';
import { trafficKPIData } from '@/lib/trafficMockData';

export function TrafficKPIBar() {
  const { averageSpeed, trafficVolume, incidentAlerts, travelTimeIndex } = trafficKPIData;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
      {/* Average Speed */}
      <div className="bg-card border border-border/60 rounded-lg p-3 flex flex-col gap-1">
        <p className="text-xs font-semibold text-accent tracking-wide">Average Speed</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-4xl font-bold text-foreground leading-none">
            {averageSpeed.value}
          </span>
          <span className="text-sm text-muted-foreground mb-0.5">{averageSpeed.unit}</span>
          <ArrowUp size={20} className="text-[var(--warning)] mb-0.5 ml-auto" />
        </div>
      </div>

      {/* Traffic Volume */}
      <div className="bg-card border border-border/60 rounded-lg p-3 flex flex-col gap-1">
        <p className="text-xs font-semibold text-accent tracking-wide">Traffic Volume</p>
        <div className="flex items-end gap-1.5 mt-1">
          <span className="text-4xl font-bold text-[var(--success)] leading-none">
            {trafficVolume.value.toLocaleString()}
          </span>
          <span className="text-xs text-[var(--success)] mb-0.5">{trafficVolume.unit}</span>
        </div>
      </div>

      {/* Incident Alerts */}
      <div className="bg-card border border-border/60 rounded-lg p-3 flex flex-col gap-1">
        <p className="text-xs font-semibold text-accent tracking-wide">Incident Alerts</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-4xl font-bold text-[var(--warning)] leading-none">
            {incidentAlerts.count}
          </span>
          <span className="text-sm text-[var(--warning)] mb-0.5">{incidentAlerts.label}</span>
        </div>
      </div>

      {/* Travel Time Index */}
      <div className="bg-card border border-border/60 rounded-lg p-3 flex flex-col gap-1">
        <p className="text-xs font-semibold text-accent tracking-wide">Travel Time Index</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-4xl font-bold text-[var(--warning)] leading-none">
            {travelTimeIndex.value}
          </span>
          <span className="text-sm text-[var(--warning)] mb-0.5">{travelTimeIndex.status}</span>
        </div>
      </div>

      {/* Live camera thumbnail */}
      <div className="bg-card border border-border/60 rounded-lg overflow-hidden relative col-span-2 md:col-span-3 xl:col-span-1 min-h-[80px]">
        <img
          src="https://picsum.photos/seed/aerialtraffic/300/110"
          alt="Live traffic camera aerial view"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] text-white/80 font-medium">LIVE</span>
        </div>
      </div>
    </div>
  );
}
