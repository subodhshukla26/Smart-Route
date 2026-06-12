import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { roadwayThroughputData } from '@/lib/trafficMockData';

const BAR_COLORS = [
  'var(--chart-2)',
  'var(--chart-1)',
  'var(--chart-5)',
  'var(--chart-3)',
  'var(--chart-4)',
];

const chartConfig = {
  vehicles: { label: 'Vehicles/hr', color: 'var(--chart-2)' },
};

export function RoadwayThroughputChart() {
  return (
    <Card className="border-border/60">
      <CardHeader className="pb-0 pt-3 px-4">
        <CardTitle className="text-sm font-semibold">Roadway Throughput</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">Vehicles Per Hour</p>
      </CardHeader>
      <CardContent className="px-3 pb-3 pt-2">
        <ChartContainer config={chartConfig} className="h-[130px] w-full">
          <BarChart
            data={roadwayThroughputData}
            margin={{ left: -8, right: 0, top: 4, bottom: 0 }}
            barSize={22}
          >
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
              domain={[0, 500]}
              ticks={[0, 200, 400]}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="vehicles" radius={[3, 3, 0, 0]}>
              {roadwayThroughputData.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
