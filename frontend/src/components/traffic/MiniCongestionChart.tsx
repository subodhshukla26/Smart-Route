import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { miniCongestionData } from '@/lib/trafficMockData';

const chartConfig = {
  low: { label: 'Low', color: 'var(--chart-3)' },
  medium: { label: 'Medium', color: 'var(--chart-4)' },
  high: { label: 'High', color: 'var(--chart-5)' },
};

export function MiniCongestionChart() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-1 pt-3 px-4">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Congestion Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <ChartContainer config={chartConfig} className="h-24 w-full">
          <AreaChart data={miniCongestionData} margin={{ left: 0, right: 0, top: 2, bottom: 0 }}>
            <defs>
              <linearGradient id="mgHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.65} />
                <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="mgMedium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-4)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="mgLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }}
              interval={1}
            />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="low"
              stroke="var(--chart-3)"
              strokeWidth={1.5}
              fill="url(#mgLow)"
              stackId="congestion"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="medium"
              stroke="var(--chart-4)"
              strokeWidth={1.5}
              fill="url(#mgMedium)"
              stackId="congestion"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="high"
              stroke="var(--chart-5)"
              strokeWidth={1.5}
              fill="url(#mgHigh)"
              stackId="congestion"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
