import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Dashboard } from '@/pages/Dashboard';
import { RoutePlanner } from '@/pages/RoutePlanner';
import { RoutesList } from '@/pages/RoutesList';
import { TrafficDashboard } from '@/pages/TrafficDashboard';
import { useAppStore } from '@/store/appStore';
import { Separator } from '@/components/ui/separator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Overview',
  planner: 'Plan Route',
  routes: 'Saved Routes',
  traffic: 'Traffic Management',
};

function AppContent() {
  const { activePage } = useAppStore();

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-background">
        {/* Header bar */}
        <header className="sticky top-0 z-10 flex h-12 items-center gap-3 border-b border-border/50 bg-background/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          <Separator orientation="vertical" className="h-4 bg-border/60" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Smart Route</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-xs font-medium text-foreground">{PAGE_TITLES[activePage]}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'planner' && <RoutePlanner />}
          {activePage === 'routes' && <RoutesList />}
          {activePage === 'traffic' && <TrafficDashboard />}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster position="bottom-right" richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
