import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useRoutes, useAddRoute } from '@/hooks/useRoutes';
import { TypographyH2, TypographyLabel, TypographyP } from '@/components/shared/Typography';
import { Plus, Search, MapPin, ArrowRight, Clock, Ruler, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { Route } from '@/types';

const FALLBACK_ROUTES: Route[] = [
  { id: '1', source: 'City Center', destination: 'Airport', distance: 18.5, estimatedTime: 35 },
  { id: '2', source: 'North Station', destination: 'Tech Park', distance: 8.2, estimatedTime: 22 },
  { id: '3', source: 'University', destination: 'Mall Road', distance: 5.6, estimatedTime: 18 },
  { id: '4', source: 'Bus Terminal', destination: 'Old City', distance: 11.0, estimatedTime: 42 },
];

function congestionFromTime(t: number) {
  if (t > 40) return { label: 'High', cls: 'bg-destructive/15 text-destructive border-destructive/30' };
  if (t > 25) return { label: 'Medium', cls: 'bg-[var(--warning)]/15 text-[var(--warning)] border-[var(--warning)]/30' };
  return { label: 'Low', cls: 'bg-[var(--success)]/15 text-[var(--success)] border-[var(--success)]/30' };
}

export function RoutesList() {
  const { data: routes, isLoading, isError } = useRoutes();
  const addRoute = useAddRoute();

  const displayRoutes = isError || !routes?.length ? FALLBACK_ROUTES : routes;

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ source: '', destination: '', distance: '', estimatedTime: '' });

  const filtered = displayRoutes.filter(
    (r) =>
      r.source.toLowerCase().includes(search.toLowerCase()) ||
      r.destination.toLowerCase().includes(search.toLowerCase()),
  );

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.source || !form.destination || !form.distance || !form.estimatedTime) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await addRoute.mutateAsync({
        source: form.source,
        destination: form.destination,
        distance: parseFloat(form.distance),
        estimatedTime: parseInt(form.estimatedTime),
      });
      toast.success('Route saved!');
      setForm({ source: '', destination: '', distance: '', estimatedTime: '' });
      setShowForm(false);
    } catch {
      toast.error('Error saving route — check backend connection');
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <TypographyH2>Saved Routes</TypographyH2>
          <TypographyP className="mt-1">All routes stored in the database</TypographyP>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white shrink-0"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? 'Cancel' : 'Add Route'}
        </Button>
      </div>

      {/* Add route form */}
      {showForm && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">New Route</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1.5">
                <TypographyLabel>Source Location</TypographyLabel>
                <Input
                  value={form.source}
                  onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                  placeholder="e.g. City Center"
                  className="bg-muted/30 border-border/60 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <TypographyLabel>Destination</TypographyLabel>
                <Input
                  value={form.destination}
                  onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                  placeholder="e.g. Airport"
                  className="bg-muted/30 border-border/60 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <TypographyLabel>Distance (km)</TypographyLabel>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.distance}
                  onChange={(e) => setForm((f) => ({ ...f, distance: e.target.value }))}
                  placeholder="12.5"
                  className="bg-muted/30 border-border/60 text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <TypographyLabel>Est. Time (min)</TypographyLabel>
                <Input
                  type="number"
                  min="1"
                  value={form.estimatedTime}
                  onChange={(e) => setForm((f) => ({ ...f, estimatedTime: e.target.value }))}
                  placeholder="30"
                  className="bg-muted/30 border-border/60 text-sm"
                />
              </div>
              <div className="col-span-2 md:col-span-4 flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  disabled={addRoute.isPending}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  {addRoute.isPending ? 'Saving...' : 'Save Route'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by source or destination..."
          className="pl-8 bg-muted/30 border-border/60"
        />
      </div>

      {/* Routes table */}
      <Card className="border-border/60 overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_auto_1fr_80px_80px_80px] items-center gap-3 px-4 py-2.5 border-b border-border/40 bg-muted/20">
          <TypographyLabel>Source</TypographyLabel>
          <span />
          <TypographyLabel>Destination</TypographyLabel>
          <TypographyLabel>Distance</TypographyLabel>
          <TypographyLabel>Time</TypographyLabel>
          <TypographyLabel>Traffic</TypographyLabel>
        </div>

        <div className="divide-y divide-border/30">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_1fr_80px_80px_80px] gap-3 px-4 py-3 items-center">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-14" />
                </div>
              ))
            : filtered.length === 0
            ? (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No routes found
              </div>
            )
            : filtered.map((route, i) => {
                const cong = congestionFromTime(route.estimatedTime);
                return (
                  <div key={route.id ?? i} className="grid grid-cols-[1fr_auto_1fr_80px_80px_80px] gap-3 px-4 py-3 items-center hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-1.5 text-sm text-foreground min-w-0">
                      <MapPin size={12} className="text-primary shrink-0" />
                      <span className="truncate">{route.source}</span>
                    </div>
                    <ArrowRight size={12} className="text-muted-foreground" />
                    <div className="flex items-center gap-1.5 text-sm text-foreground min-w-0">
                      <MapPin size={12} className="text-accent shrink-0" />
                      <span className="truncate">{route.destination}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Ruler size={11} />
                      <span>{route.distance} km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={11} />
                      <span>{route.estimatedTime}m</span>
                    </div>
                    <Badge variant="outline" className={cn('text-[10px] px-1.5 h-5', cong.cls)}>
                      {cong.label}
                    </Badge>
                  </div>
                );
              })}
        </div>
      </Card>

      {isError && (
        <p className="text-xs text-muted-foreground text-center">
          Backend not reachable — showing sample data. Start Spring Boot on port 8080.
        </p>
      )}
    </div>
  );
}
