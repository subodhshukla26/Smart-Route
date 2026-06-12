import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { incidentsData } from '@/lib/trafficMockData';

export function IncidentSummaryPanel() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Incident Summary</CardTitle>
          <span className="text-xs text-muted-foreground">Mentions / Accident</span>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-3 flex flex-col gap-0.5">
        {incidentsData.map(({ id, description, meta, color, hasAction }) => (
          <div
            key={id}
            className="flex items-center gap-2.5 py-2 px-2 rounded-md hover:bg-muted/30 transition-colors cursor-default group"
          >
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ background: color }}
            />
            <span className="text-xs text-foreground flex-1 truncate">{description}</span>
            {meta && (
              <span className="text-xs text-muted-foreground shrink-0 opacity-80">{meta}</span>
            )}
            {hasAction && (
              <Mail
                size={12}
                className="text-muted-foreground shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
