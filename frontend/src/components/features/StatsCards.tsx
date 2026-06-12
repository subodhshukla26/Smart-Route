import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Route, TrendingUp, Users } from 'lucide-react';
import { TypographyLabel } from '@/components/shared/Typography';
import { cn } from '@/lib/utils';
import { mockStats } from '@/lib/mockData';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string;
}

function StatCard({ label, value, unit, icon: Icon, trend, trendUp, accentColor = 'text-primary' }: StatCardProps) {
  return (
    <Card className="stat-card group hover:stat-card-hover transition-all duration-200 cursor-default border-border/60">
      <CardContent className="p-0 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <TypographyLabel>{label}</TypographyLabel>
          <div className={cn('p-1.5 rounded-md bg-muted/50', accentColor)}>
            <Icon size={14} className={accentColor} />
          </div>
        </div>
        <div className="flex items-end gap-1.5">
          <span className="text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </span>
          {unit && <span className="text-sm text-muted-foreground mb-0.5">{unit}</span>}
        </div>
        {trend && (
          <p className={cn('text-xs', trendUp ? 'text-[var(--success)]' : 'text-destructive')}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Total Routes"
        value={mockStats.totalRoutes}
        icon={Route}
        trend="3 this week"
        trendUp={true}
        accentColor="text-primary"
      />
      <StatCard
        label="Avg Travel Time"
        value={mockStats.avgTravelTime}
        unit="min"
        icon={Clock}
        trend="2 min faster"
        trendUp={true}
        accentColor="text-accent"
      />
      <StatCard
        label="Congestion Level"
        value={mockStats.congestionLevel}
        icon={Users}
        accentColor="text-[var(--warning)]"
      />
      <StatCard
        label="On-Time Rate"
        value={mockStats.onTimeRate}
        unit="%"
        icon={TrendingUp}
        trend="vs last week"
        trendUp={true}
        accentColor="text-[var(--success)]"
      />
    </div>
  );
}

export { Badge };
