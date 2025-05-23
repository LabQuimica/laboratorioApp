import { useQuery } from '@tanstack/react-query';
import { ValeProfesorDetails } from '@/src/types/vale';
import { getAllValesProfesor } from '@/src/services/allValesService';

export function useValesProfesor(userId: number) {
  return useQuery<ValeProfesorDetails[]>({
    queryKey: ['valesProfesor'],
    queryFn: () => getAllValesProfesor(userId),
    retry: 1,
  });
} 