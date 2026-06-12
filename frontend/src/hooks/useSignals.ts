import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addSignal, fetchSignals } from '@/api/signals';
import type { Signal } from '@/types';

export function useSignals(roadName?: string) {
  return useQuery<Signal[]>({
    queryKey: ['signals', roadName ?? 'all'],
    queryFn: () => fetchSignals(roadName),
  });
}

export function useAddSignal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSignal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });
}
