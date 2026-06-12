import { CloudRain, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { weatherData } from '@/lib/trafficMockData';

export function WeatherPanel() {
  const { condition, visibility, tempF, rainIntensity, windLevel } = weatherData;

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm font-semibold">Weather &amp; Conditions</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <CloudRain size={44} className="text-primary shrink-0 opacity-90" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-semibold text-foreground">{condition}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye size={11} />
                {visibility}
              </span>
            </div>
            <span className="text-3xl font-bold text-foreground">{tempF}°F</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16 shrink-0">Rain</span>
            <div className="flex-1 bg-muted/40 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${rainIntensity}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-8 text-right">{rainIntensity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-16 shrink-0">Wind</span>
            <div className="flex-1 bg-muted/40 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${windLevel}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-8 text-right">{windLevel}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
