import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPracticas, getPracticasDetalles, inscribirsePractica, updateStatusPracticaAsignada } from '@/src/services/practicasService';
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

export function useInscribirsePractica() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ idPracticaAsignada, idAlumno }: { idPracticaAsignada: number; idAlumno: number }) =>
            inscribirsePractica(idPracticaAsignada, idAlumno),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['practicasAlumno'] });
            queryClient.invalidateQueries({ queryKey: ['practicasDetalle'] });
            queryClient.invalidateQueries({ queryKey: ['valesAlumno'] });
        },
    });
}

export function useUpdateStatusPracticaAsignada() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ idPracticaAsignada, newStatus }: { idPracticaAsignada: number; newStatus: string }) =>
            updateStatusPracticaAsignada(idPracticaAsignada, newStatus),
        onSuccess: () => {
            // Invalidar queries relacionadas con vales de profesor
            queryClient.invalidateQueries({ queryKey: ['valesProfesor'] });
            // Invalidar queries relacionadas con prácticas de alumno
            queryClient.invalidateQueries({ queryKey: ['practicasDetalle'] });
        },
        onError: (error) => {
            console.error('Error updating practice status:', error);
        },
    });
}