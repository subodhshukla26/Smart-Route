import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signalPerformanceData } from '@/lib/trafficMockData';

interface GaugeProps {
  value: number;
  maxValue: number;
  displayValue: string;
  label: string;
  sublabel: string;
  color: string;
  size?: number;
}

function CircularGauge({ value, maxValue, displayValue, label, sublabel, color, size = 96 }: GaugeProps) {
  const radius = size * 0.38;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value / maxValue, 1);
  const strokeDashoffset = circumference * (1 - progress);
  const center = size / 2;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <p className="text-xs text-muted-foreground text-center leading-tight">{label}</p>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="7"
            strokeOpacity="0.5"
          />
          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: 'stroke-dashoffset 1.2s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0">
          <span
            className="font-bold leading-none"
            style={{ color, fontSize: size * 0.24 }}
          >
            {displayValue}
          </span>
        </div>
      </div>
      <span className="text-xs font-medium" style={{ color }}>{sublabel}</span>
    </div>
  );
}

export function SignalPerformancePanel() {
  const { intersectionDelay, signalEfficiency } = signalPerformanceData;

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm font-semibold">Signal Performance</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 flex justify-around items-start">
        <CircularGauge
          value={intersectionDelay}
          maxValue={120}
          displayValue={`${intersectionDelay}`}
          label="Intersection Delay"
          sublabel="secs"
          color="var(--accent)"
          size={100}
        />
        <CircularGauge
          value={signalEfficiency}
          maxValue={100}
          displayValue={`${signalEfficiency}%`}
          label="Signal Efficiency"
          sublabel="Optimized"
          color="var(--warning)"
          size={100}
        />
      </CardContent>
    </Card>
  );
}
