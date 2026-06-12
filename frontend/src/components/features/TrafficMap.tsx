import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { trafficSegments, vehicleMarkers } from '@/lib/mapData';
import type { CongestionLevel } from '@/types';

// ─── Colour maps (matching existing CSS variables) ───────────────────────────

const CONGESTION_COLORS: Record<CongestionLevel, string> = {
  Low: '#10B981',    // --success
  Medium: '#F59E0B', // --warning
  High: '#EF4444',   // --destructive
};

const VEHICLE_STATUS_COLORS = {
  moving:  '#1560BD', // --primary
  stopped: '#EF4444', // --destructive
  idle:    '#F59E0B', // --warning
} as const;

// ─── Inline SVG helpers ───────────────────────────────────────────────────────

const CAR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0
    .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45
    1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5
    1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5
    1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
</svg>`;

function trafficLightSvg(state: 'red' | 'green' | 'yellow'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20">
    <rect x="1" y="1" width="10" height="18" rx="2" fill="#1E2435" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <circle cx="6" cy="5"  r="2.2" fill="${state === 'red'    ? '#EF4444' : '#2a2a3e'}"/>
    <circle cx="6" cy="10" r="2.2" fill="${state === 'yellow' ? '#F59E0B' : '#2a2a3e'}"/>
    <circle cx="6" cy="15" r="2.2" fill="${state === 'green'  ? '#10B981' : '#2a2a3e'}"/>
  </svg>`;
}

// ─── Leaflet DivIcon factories ────────────────────────────────────────────────

function createVehicleIcon(status: 'moving' | 'stopped' | 'idle'): L.DivIcon {
  const bg = VEHICLE_STATUS_COLORS[status];
  return L.divIcon({
    className: '',
    html: `<div style="
      width:30px;height:30px;
      background:${bg};
      border:2.5px solid rgba(255,255,255,0.9);
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 10px rgba(0,0,0,0.7);
      cursor:pointer;
    ">${CAR_SVG}</div>`,
    iconSize:      [30, 30],
    iconAnchor:    [15, 15],
    tooltipAnchor: [0, -18],
  });
}

function createSignalIcon(state: 'red' | 'green' | 'yellow'): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      filter:drop-shadow(0 2px 6px rgba(0,0,0,0.7));
      cursor:pointer;
    ">${trafficLightSvg(state)}</div>`,
    iconSize:      [14, 22],
    iconAnchor:    [7, 22],
    tooltipAnchor: [0, -24],
  });
}

// Pre-create all icon variants once — avoids re-instantiation on every render
const VEHICLE_ICONS: Record<'moving' | 'stopped' | 'idle', L.DivIcon> = {
  moving:  createVehicleIcon('moving'),
  stopped: createVehicleIcon('stopped'),
  idle:    createVehicleIcon('idle'),
};

const SIGNAL_ICONS: Record<'red' | 'green' | 'yellow', L.DivIcon> = {
  red:    createSignalIcon('red'),
  green:  createSignalIcon('green'),
  yellow: createSignalIcon('yellow'),
};

// ─── Constants ────────────────────────────────────────────────────────────────

const MAP_CENTER: [number, number] = [12.9716, 77.5946]; // Bangalore
const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// ─── Component ────────────────────────────────────────────────────────────────

export function TrafficMap() {
  const vehicleCount = vehicleMarkers.filter((m) => m.type === 'vehicle').length;
  const signalCount  = vehicleMarkers.filter((m) => m.type === 'signal').length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base font-semibold">Live Traffic Map</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">{vehicleCount} vehicles</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground">{signalCount} signals</span>
            <span className="text-muted-foreground/40">·</span>
            <div className="h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
            <Badge variant="secondary" className="text-xs">Bangalore</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Outer wrapper: provides height and clip for rounded corners */}
        <div
          className="relative mx-4 mb-4 rounded-lg overflow-hidden border border-border"
          style={{ height: 480 }}
        >
          {/* ── Legend overlay (bottom-left, above map) ── */}
          <div className="absolute bottom-8 left-3 z-[1000] glass-panel rounded-lg p-3 min-w-[128px] pointer-events-none">
            <p className="label-meta mb-2">Traffic Density</p>
            <div className="flex flex-col gap-1.5 mb-3">
              {(Object.entries(CONGESTION_COLORS) as [CongestionLevel, string][]).map(
                ([level, color]) => (
                  <div key={level} className="flex items-center gap-2">
                    <div style={{ width: 22, height: 4, background: color, borderRadius: 2 }} />
                    <span className="text-xs text-muted-foreground">{level}</span>
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-border/40 mb-2" />

            <p className="label-meta mb-2">Vehicles</p>
            <div className="flex flex-col gap-1.5">
              {(
                Object.entries(VEHICLE_STATUS_COLORS) as [
                  keyof typeof VEHICLE_STATUS_COLORS,
                  string,
                ][]
              ).map(([status, color]) => (
                <div key={status} className="flex items-center gap-2">
                  <div
                    style={{ width: 10, height: 10, background: color, borderRadius: '50%' }}
                  />
                  <span className="text-xs text-muted-foreground capitalize">{status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Leaflet map ── */}
          <MapContainer
            center={MAP_CENTER}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            {/* Dark tile layer (CartoDB Dark Matter — free, no API key) */}
            <TileLayer
              url={TILE_URL}
              attribution={TILE_ATTRIBUTION}
              subdomains={['a', 'b', 'c', 'd']}
              maxZoom={20}
            />

            {/* ── Traffic route polylines coloured by congestion ── */}
            {trafficSegments.map((seg) => (
              <Polyline
                key={seg.id}
                positions={seg.positions}
                pathOptions={{
                  color:     CONGESTION_COLORS[seg.congestion],
                  weight:    5,
                  opacity:   0.85,
                  lineCap:   'round',
                  lineJoin:  'round',
                }}
              >
                <Tooltip sticky>
                  <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2 }}>
                    {seg.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: CONGESTION_COLORS[seg.congestion],
                    }}
                  >
                    ● {seg.congestion} Congestion
                  </div>
                </Tooltip>
              </Polyline>
            ))}

            {/* ── Vehicle & signal markers ── */}
            {vehicleMarkers.map((m) => (
              <Marker
                key={m.id}
                position={m.position}
                icon={
                  m.type === 'vehicle'
                    ? VEHICLE_ICONS[m.status ?? 'moving']
                    : SIGNAL_ICONS[m.signalState ?? 'green']
                }
              >
                <Tooltip direction="top" offset={[0, -8]}>
                  <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2 }}>
                    {m.label}
                  </div>
                  {m.type === 'vehicle' && (
                    <div
                      style={{
                        fontSize: 11,
                        color: VEHICLE_STATUS_COLORS[m.status ?? 'moving'],
                        textTransform: 'capitalize',
                      }}
                    >
                      ● {m.status}
                    </div>
                  )}
                  {m.type === 'signal' && (
                    <div style={{ fontSize: 11, textTransform: 'capitalize' }}>
                      Signal: {m.signalState}
                    </div>
                  )}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}
