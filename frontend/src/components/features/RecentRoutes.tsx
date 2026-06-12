import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useRoutes } from '@/hooks/useRoutes';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function getCongestionFromTime(time: number): { label: string; variant: 'default' | 'secondary' | 'destructive' } {
  if (time > 40) return { label: 'High', variant: 'destructive' };
  if (time > 25) return { label: 'Medium', variant: 'secondary' };
  return { label: 'Low', variant: 'default' };
}

const FALLBACK_ROUTES = [
  { id: '1', source: 'City Center', destination: 'Airport', distance: 18.5, estimatedTime: 35 },
  { id: '2', source: 'North Station', destination: 'Tech Park', distance: 8.2, estimatedTime: 22 },
  { id: '3', source: 'University', destination: 'Mall Road', distance: 5.6, estimatedTime: 18 },
];

export function RecentRoutes() {
  const { data: routes, isLoading, isError } = useRoutes();
  const displayRoutes = isError || !routes?.length ? FALLBACK_ROUTES : routes.slice(0, 5);

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--warning)] inline-block" />
          Recent Routes
          {isError && (
            <span className="text-xs text-muted-foreground font-normal ml-auto">
              Showing sample data
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/40">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-12 ml-auto" />
                </div>
              ))
            : displayRoutes.map((route, i) => {
                const congestion = getCongestionFromTime(route.estimatedTime);
                return (
                  <div key={route.id ?? i} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-1.5 text-sm text-foreground min-w-0">
                      <MapPin size={13} className="text-primary shrink-0" />
                      <span className="truncate">{route.source}</span>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground shrink-0" />
                    <div className="flex items-center gap-1.5 text-sm text-foreground flex-1 min-w-0">
                      <MapPin size={13} className="text-accent shrink-0" />
                      <span className="truncate">{route.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                      <Clock size={12} />
                      <span>{route.estimatedTime}m</span>
                    </div>
                    <Badge
                      variant={congestion.variant}
                      className={cn(
                        'text-[10px] px-1.5 py-0 h-5 shrink-0',
                        congestion.variant === 'default' && 'bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30',
                        congestion.variant === 'secondary' && 'bg-[var(--warning)]/15 text-[var(--warning)] border-[var(--warning)]/30',
                      )}
                    >
                      {congestion.label}
                    </Badge>
                  </div>
                );
              })}
        </div>
      </CardContent>
    </Card>
  );
}
