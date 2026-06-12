import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { corridorSpeedsData } from '@/lib/trafficMockData';

export function SpeedCorridorPanel() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm font-semibold">Average Speed by Corridor</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3 flex flex-col gap-2.5">
        {corridorSpeedsData.map(({ corridor, speed, limit, color }) => (
          <div key={corridor} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-24 shrink-0">{corridor}</span>
            <div className="flex-1 bg-muted/40 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(speed / limit) * 100}%`, background: color }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground w-14 text-right shrink-0">
              {speed} mph
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
