import { Bus, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { transitStatusData } from '@/lib/trafficMockData';

export function TransitStatusBar() {
  const { delays, serviceAlerts, onSchedule } = transitStatusData;

  return (
    <Card className="border-border/60">
      <CardContent className="p-3 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[var(--warning)]/15">
            <Bus size={16} className="text-[var(--warning)]" />
          </div>
          <div>
            <span className="text-base font-bold text-[var(--warning)]">{delays}</span>
            <span className="text-xs text-muted-foreground ml-1">Delays</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[var(--warning)]/15">
            <AlertCircle size={16} className="text-[var(--warning)]" />
          </div>
          <div>
            <span className="text-base font-bold text-[var(--warning)]">{serviceAlerts}</span>
            <span className="text-xs text-muted-foreground ml-1">Service Alerts</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="p-1.5 rounded-md bg-[var(--success)]/15">
            <CheckCircle size={16} className="text-[var(--success)]" />
          </div>
          <span className="text-sm font-semibold text-[var(--success)]">
            {onSchedule ? 'On Schedule' : 'Delayed'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
