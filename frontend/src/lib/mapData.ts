import type { VehicleMarker, TrafficSegment } from '@/types';

/**
 * Mock traffic route segments around Bangalore.
 * Each segment has a congestion level that maps to a polyline colour.
 */
export const trafficSegments: TrafficSegment[] = [
  {
    id: 'seg-01',
    name: 'MG Road Corridor',
    congestion: 'High',
    positions: [
      [12.9786, 77.5917],
      [12.9768, 77.6005],
      [12.9742, 77.6069],
      [12.9731, 77.6183],
    ],
  },
  {
    id: 'seg-02',
    name: 'Outer Ring Road South',
    congestion: 'Medium',
    positions: [
      [12.9352, 77.6142],
      [12.9279, 77.6318],
      [12.9180, 77.6441],
      [12.9118, 77.6524],
    ],
  },
  {
    id: 'seg-03',
    name: 'Bannerghatta Road',
    congestion: 'Low',
    positions: [
      [12.9236, 77.5912],
      [12.9062, 77.5841],
      [12.8921, 77.5762],
    ],
  },
  {
    id: 'seg-04',
    name: 'Old Airport Road',
    congestion: 'High',
    positions: [
      [12.9592, 77.6386],
      [12.9523, 77.6551],
      [12.9453, 77.6714],
    ],
  },
  {
    id: 'seg-05',
    name: 'Tumkur Road',
    congestion: 'Medium',
    positions: [
      [13.0120, 77.5678],
      [13.0295, 77.5581],
      [13.0448, 77.5491],
    ],
  },
  {
    id: 'seg-06',
    name: 'Mysore Road',
    congestion: 'Low',
    positions: [
      [12.9627, 77.5462],
      [12.9512, 77.5341],
      [12.9382, 77.5121],
    ],
  },
  {
    id: 'seg-07',
    name: 'Hosur Road',
    congestion: 'High',
    positions: [
      [12.9512, 77.6185],
      [12.9388, 77.6207],
      [12.9207, 77.6248],
    ],
  },
  {
    id: 'seg-08',
    name: 'Bellary Road',
    congestion: 'Low',
    positions: [
      [13.0072, 77.5972],
      [13.0285, 77.5875],
      [13.0521, 77.5783],
    ],
  },
];

/** Mock vehicle positions and traffic signal states. */
export const vehicleMarkers: VehicleMarker[] = [
  // Vehicles
  { id: 'v-01', type: 'vehicle', position: [12.9765, 77.6010], label: 'Bus KA-01 B301',      status: 'moving'  },
  { id: 'v-02', type: 'vehicle', position: [12.9608, 77.6452], label: 'Truck TN-22 C4521',   status: 'stopped' },
  { id: 'v-03', type: 'vehicle', position: [12.9150, 77.5890], label: 'Van KA-05 V201',       status: 'moving'  },
  { id: 'v-04', type: 'vehicle', position: [13.0380, 77.5530], label: 'Bus KA-01 B207',       status: 'moving'  },
  { id: 'v-05', type: 'vehicle', position: [12.9420, 77.5180], label: 'Truck MH-12 G891',     status: 'idle'    },
  { id: 'v-06', type: 'vehicle', position: [12.9320, 77.6300], label: 'Van KA-03 W108',       status: 'moving'  },
  { id: 'v-07', type: 'vehicle', position: [13.0160, 77.5920], label: 'Bus KA-01 B412',       status: 'moving'  },
  { id: 'v-08', type: 'vehicle', position: [12.9490, 77.6590], label: 'Truck KA-09 T331',     status: 'stopped' },
  // Traffic signals
  { id: 's-01', type: 'signal', position: [12.9742, 77.6069], label: 'MG Road Signal',        signalState: 'red'    },
  { id: 's-02', type: 'signal', position: [12.9279, 77.6318], label: 'Silk Board Junction',   signalState: 'green'  },
  { id: 's-03', type: 'signal', position: [12.9592, 77.6386], label: 'Domlur Signal',         signalState: 'yellow' },
  { id: 's-04', type: 'signal', position: [13.0295, 77.5581], label: 'Yeshwanthpur Signal',   signalState: 'green'  },
  { id: 's-05', type: 'signal', position: [12.9627, 77.5462], label: 'Rajajinagar Signal',    signalState: 'red'    },
  { id: 's-06', type: 'signal', position: [12.9388, 77.6207], label: 'Koramangala Signal',    signalState: 'green'  },
];
