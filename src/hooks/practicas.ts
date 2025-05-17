import { useQuery } from '@tanstack/react-query';
import { getPracticas } from '@/src/services/practicasService';
import { Practica } from '@/src/types/practicas';

export function usePracticasAlumno(alumnoId?: number) {
    return useQuery<Practica[]>({
        queryKey: ['practicasAlumno'],
        queryFn: () => getPracticas(alumnoId!),
    })
}