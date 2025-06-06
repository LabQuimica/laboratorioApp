import { useQuery } from '@tanstack/react-query';
import { getAllValesAlumno } from '@/src/services/allValesService';
import { ValeAlumnoDetails } from '@/src/types/vale';

export function useValesAlumno(userId: number | undefined) {
  return useQuery<ValeAlumnoDetails[]>({
    queryKey: ['valesAlumno'],
    queryFn: () => getAllValesAlumno(userId!),
    retry: 1,
    enabled: !!userId,
  });
} 