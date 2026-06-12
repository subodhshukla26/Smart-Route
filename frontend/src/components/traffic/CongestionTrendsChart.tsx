import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { congestionTrendsData } from '@/lib/trafficMockData';

const chartConfig = {
  thisWeek: { label: 'This Week', color: 'var(--chart-1)' },
  lastWeek: { label: 'Last Week', color: 'var(--chart-4)' },
};

export function CongestionTrendsChart() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm font-semibold">Congestion Trends</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <ChartContainer config={chartConfig} className="h-44 w-full">
          <AreaChart data={congestionTrendsData} margin={{ left: -8, right: 6, top: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="ctThisWeek" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ctLastWeek" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-4)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="thisWeek"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#ctThisWeek)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="lastWeek"
              stroke="var(--chart-4)"
              strokeWidth={2}
              fill="url(#ctLastWeek)"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
