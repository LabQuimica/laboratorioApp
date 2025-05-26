import { useQuery } from '@tanstack/react-query';
import { getPracticas, getPracticasDetalles } from '@/src/services/practicasService';
import { Practica, PracticaDetails } from '@/src/types/practicas';

export function usePracticasAlumno(alumnoId?: number) {
    return useQuery<Practica[]>({
        queryKey: ['practicasAlumno'],
        queryFn: () => getPracticas(alumnoId!),
    })
}

export function usePracticasDetalle(practicaId?: number) {
    return useQuery<PracticaDetails>({
        queryKey: ['practicasDetalle'],
        queryFn: () => getPracticasDetalles(practicaId!),
    })
}