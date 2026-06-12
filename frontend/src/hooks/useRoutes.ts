import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRoutes, addRoute, fetchBestRoute } from '@/api/routes';
import type { Route } from '@/types';

export function useRoutes() {
  return useQuery<Route[]>({
    queryKey: ['routes'],
    queryFn: fetchRoutes,
    staleTime: 30_000,
  });
}

export function useAddRoute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routes'] });
    },
  });
}

export function useBestRoute(source?: string, destination?: string, enabled = true) {
  return useQuery<Route | null>({
    queryKey: ['routes', 'best', source ?? '', destination ?? ''],
    queryFn: () => fetchBestRoute(source, destination),
    enabled,
  });
}
