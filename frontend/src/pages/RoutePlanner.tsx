import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PredictionResultCard } from '@/components/features/PredictionResult';
import { TypographyH2, TypographyLabel, TypographyP } from '@/components/shared/Typography';
import { MapPin, Navigation, Loader2, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import type { CongestionLevel, PredictionResult, Route, TimeOfDay } from '@/types';
import { fetchBestRoute } from '@/api/routes';
import { toast } from 'sonner';

const timeOptions: { value: TimeOfDay; label: string; icon: React.ElementType }[] = [
  { value: 'morning', label: 'Morning Rush', icon: Sunrise },
  { value: 'afternoon', label: 'Afternoon', icon: Sun },
  { value: 'evening', label: 'Evening Rush', icon: Sunset },
  { value: 'night', label: 'Night', icon: Moon },
];

function congestionFromTime(estimatedTime: number): CongestionLevel {
  if (estimatedTime > 40) return 'High';
  if (estimatedTime > 25) return 'Medium';
  return 'Low'; 
}

function routeToPrediction(route: Route, source: string, destination: string): PredictionResult {
  const congestionLevel = congestionFromTime(route.estimatedTime);

  return {
    source,
    destination,
    predictedTime: route.estimatedTime,
    confidence: 92,
    congestionLevel,
    suggestions: [
      {
        name: 'Best Route',
        distance: route.distance,
        estimatedTime: route.estimatedTime,
        congestion: congestionLevel,
        via: `${route.source} to ${route.destination}`,
      },
    ],
  };
}

export function RoutePlanner() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  async function handlePredict(e: React.FormEvent) {
    e.preventDefault();
    if (!source.trim() || !destination.trim()) {
      toast.error('Please enter both source and destination');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const bestRoute = await fetchBestRoute(source, destination);

      if (!bestRoute) {
        toast.error('No route found for this source and destination');
        return;
      }

      setResult(routeToPrediction(bestRoute, source, destination));
      toast.success('Best route loaded from backend');
    } catch {
      toast.error('Could not load route prediction. Check backend connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <TypographyH2>Route Planner</TypographyH2>
        <TypographyP className="mt-1">Predict travel time using ML-based traffic analysis</TypographyP>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Navigation size={16} className="text-primary" />
                Enter Journey Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePredict} className="flex flex-col gap-5">
                {/* Source */}
                <div className="flex flex-col gap-1.5">
                  <TypographyLabel>Source Location</TypographyLabel>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                    <Input
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="e.g. City Center"
                      className="pl-8 bg-muted/30 border-border/60 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Route line */}
                <div className="flex items-center gap-2 px-3">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <div className="w-px h-6 bg-border/60" />
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </div>
                </div>

                {/* Destination */}
                <div className="flex flex-col gap-1.5">
                  <TypographyLabel>Destination</TypographyLabel>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                    <Input
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Airport"
                      className="pl-8 bg-muted/30 border-border/60 focus:border-primary"
                    />
                  </div>
                </div>

                <Separator className="bg-border/40" />

                {/* Time of day */}
                <div className="flex flex-col gap-2">
                  <TypographyLabel>Time of Day</TypographyLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {timeOptions.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTimeOfDay(value)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                          timeOfDay === value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border/50 bg-muted/20 text-muted-foreground hover:border-border hover:text-foreground'
                        }`}
                      >
                        <Icon size={13} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    'Predict Travel Time'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right: Result */}
        <div className="lg:col-span-3">
          {loading && (
            <Card className="border-border/60 h-full min-h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <Loader2 size={32} className="animate-spin text-primary" />
                <p className="text-sm">Analysing traffic data...</p>
              </div>
            </Card>
          )}
          {!loading && result && <PredictionResultCard result={result} />}
          {!loading && !result && (
            <Card className="border-border/60 border-dashed h-full min-h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Navigation size={32} className="opacity-20" />
                <p className="text-sm">Enter a route and click Predict</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
