import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Shield, ArrowRight } from 'lucide-react';
import { TypographyLabel } from '@/components/shared/Typography';
import { cn } from '@/lib/utils';
import type { PredictionResult as PredictionResultType, RouteSuggestion } from '@/types';

interface Props {
  result: PredictionResultType;
}

function CongestionBadge({ level }: { level: 'Low' | 'Medium' | 'High' }) {
  const styles = {
    Low: 'bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30',
    Medium: 'bg-[var(--warning)]/15 text-[var(--warning)] border-[var(--warning)]/30',
    High: 'bg-destructive/15 text-destructive border-destructive/30',
  };
  return (
    <Badge variant="outline" className={cn('text-xs', styles[level])}>
      Traffic: {level}
    </Badge>
  );
}

function RouteCard({ route, rank }: { route: RouteSuggestion; rank: number }) {
  const congestionWidth = { Low: 30, Medium: 60, High: 90 };
  const congestionColor = {
    Low: 'bg-[var(--success)]',
    Medium: 'bg-[var(--warning)]',
    High: 'bg-destructive',
  };

  return (
    <div className={cn(
      'rounded-lg border p-3 flex flex-col gap-2 transition-colors hover:bg-muted/20',
      rank === 0 ? 'border-primary/40 bg-primary/5' : 'border-border/50'
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded',
            rank === 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
          )}>
           {rank === 0 ? '★ Best' : rank === 1 ? '2nd' : '3rd'}
          </span>
          <span className="text-sm font-medium text-foreground">{route.name}</span>
        </div>
        <CongestionBadge level={route.congestion} />
      </div>
      <p className="text-xs text-muted-foreground">via {route.via}</p>
      <div className="flex items-center gap-4 mt-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={11} />
          <span className="font-medium text-foreground">{route.estimatedTime} min</span>
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{route.distance} km</span>
        </div>
        <div className="flex-1 flex items-center gap-1.5">
          <div className="flex-1 h-1 rounded bg-muted overflow-hidden">
            <div
              className={cn('h-full rounded transition-all', congestionColor[route.congestion])}
              style={{ width: `${congestionWidth[route.congestion]}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PredictionResultCard({ result }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Main prediction */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Clock size={16} className="text-primary" />
              </div>
              <div>
                <TypographyLabel>Predicted Time</TypographyLabel>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-4xl font-semibold text-foreground">{result.predictedTime}</span>
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <CongestionBadge level={result.congestionLevel} />
              <div className="flex items-center gap-1.5">
                <Shield size={12} className="text-[var(--success)]" />
                <span className="text-xs text-muted-foreground">
                  <span className="text-[var(--success)] font-medium">{result.confidence}%</span> confidence
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1 border-t border-border/40">
            <span className="text-foreground font-medium">{result.source}</span>
            <ArrowRight size={13} />
            <span className="text-foreground font-medium">{result.destination}</span>
          </div>
        </CardContent>
      </Card>

      {/* Route suggestions */}
      <div className="flex flex-col gap-2">
        <TypographyLabel>Route Suggestions</TypographyLabel>
        {result.suggestions.map((route, i) => (
          <RouteCard key={i} route={route} rank={i} />
        ))}
      </div>
    </div>
  );
}
