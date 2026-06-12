import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LayoutDashboard, MapPin, Route, Settings, TrafficCone } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import type { ActivePage } from '@/types';

const navItems: { label: string; icon: React.ElementType; page: ActivePage }[] = [
  { label: 'Overview', icon: LayoutDashboard, page: 'dashboard' },
  { label: 'Traffic Management', icon: TrafficCone, page: 'traffic' },
  { label: 'Plan Route', icon: MapPin, page: 'planner' },
  { label: 'Saved Routes', icon: Route, page: 'routes' },
];

export function AppSidebar() {
  const { activePage, setActivePage } = useAppStore();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-foreground group-data-[collapsible=icon]:hidden">
            Smart Route
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ label, icon: Icon, page }) => (
                <SidebarMenuItem key={page}>
                  <SidebarMenuButton
                    isActive={activePage === page}
                    tooltip={label}
                    onClick={() => setActivePage(page)}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings size={16} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export { SidebarTrigger };
