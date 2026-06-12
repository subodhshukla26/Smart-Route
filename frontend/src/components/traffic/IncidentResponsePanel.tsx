import { incidentResponseData } from '@/lib/trafficMockData';

export function IncidentResponsePanel() {
  const { averageResponse, majorIncidents, secondaryIncidents } = incidentResponseData;

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Average Response */}
      <div
        className="rounded-lg p-3 flex flex-col items-center gap-1 border"
        style={{ background: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.25)' }}
      >
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-bold text-[var(--warning)]">{averageResponse}</span>
          <span className="text-xs text-[var(--warning)] ml-0.5">min</span>
        </div>
        <span className="text-xs text-muted-foreground text-center leading-tight">
          Average Response
        </span>
      </div>

      {/* Major Incidents */}
      <div
        className="rounded-lg p-3 flex flex-col items-center gap-1 border"
        style={{ background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.25)' }}
      >
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-bold text-destructive">{majorIncidents}</span>
          <span className="text-xs text-destructive ml-0.5">min</span>
        </div>
        <span className="text-xs text-muted-foreground text-center leading-tight">
          Major Incidents
        </span>
      </div>

      {/* Secondary Incidents */}
      <div
        className="rounded-lg p-3 flex flex-col items-center gap-1 border"
        style={{ background: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.25)' }}
      >
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-bold text-[var(--success)]">{secondaryIncidents}</span>
          <span className="text-xs text-[var(--success)] ml-0.5">%</span>
        </div>
        <span className="text-xs text-muted-foreground text-center leading-tight">
          Secondary Incidents
        </span>
      </div>
    </div>
  );
}
