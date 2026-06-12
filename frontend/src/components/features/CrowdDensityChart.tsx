import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { crowdDensityData } from '@/lib/mockData';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const chartConfig = {
  density: { label: 'Crowd Density %' },
};

function getDensityColor(density: number) {
  if (density >= 70) return 'var(--chart-5)';
  if (density >= 50) return 'var(--chart-4)';
  return 'var(--chart-3)';
}

function getDensityLabel(density: number) {
  if (density >= 70) return { text: 'High', cls: 'text-destructive' };
  if (density >= 50) return { text: 'Medium', cls: 'text-[var(--warning)]' };
  return { text: 'Low', cls: 'text-[var(--success)]' };
}

export function CrowdDensityChart() {
  return (
    <Card className="border-border/60 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent inline-block" />
          Crowd Density by Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ChartContainer config={chartConfig} className="h-36 w-full">
          <BarChart data={crowdDensityData} margin={{ left: -16, right: 0, top: 4, bottom: 0 }} barSize={14}>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
            <XAxis
              dataKey="zone"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
            />
            <YAxis hide domain={[0, 100]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="density" radius={[4, 4, 0, 0]}>
              {crowdDensityData.map((entry, i) => (
                <Cell key={i} fill={getDensityColor(entry.density)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>

        <div className="flex flex-col gap-2 mt-1">
          {crowdDensityData.map((zone) => {
            const label = getDensityLabel(zone.density);
            return (
              <div key={zone.zone} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-14 shrink-0">{zone.zone}</span>
                <Progress value={zone.density} className="h-1.5 flex-1" />
                <span className={cn('text-xs font-medium w-14 text-right shrink-0', label.cls)}>
                  {label.text} {zone.density}%
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
