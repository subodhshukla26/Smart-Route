import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTrafficData, fetchTrafficData } from '@/api/traffic';
import type { TrafficData } from '@/types';

export function useTrafficData(area?: string) {
  return useQuery<TrafficData[]>({
    queryKey: ['traffic-data', area ?? 'all'],
    queryFn: () => fetchTrafficData(area),
  });
}

export function useAddTrafficData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTrafficData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['traffic-data'] });
    },
  });
}
