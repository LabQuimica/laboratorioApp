import { useQuery } from '@tanstack/react-query';
import { getAllValesAlumno } from '@/src/services/allValesAlumnoService';
import { ValeAlumnoDetails } from '@/src/types/vale';

export function useValesAlumno(userId: number) {
  return useQuery<ValeAlumnoDetails[]>({
    queryKey: ['valesAlumno'],
    queryFn: () => getAllValesAlumno(userId),
    retry: 1,
  });
} 