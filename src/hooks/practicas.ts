import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPracticas, getPracticasDetalles, inscribirsePractica, updateStatusPracticaAsignada, updateFechasPracticaAsignada } from '@/src/services/practicasService';
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
            queryClient.invalidateQueries({ queryKey: ['valesProfesor'] });
            queryClient.invalidateQueries({ queryKey: ['practicasDetalle'] });
        },
        onError: (error) => {
            console.error('Error updating practice status:', error);
        },
    });
}

export function useUpdateFechasPracticaAsignada() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ idPracticaAsignada, fechaInicio, fechaFin }: { 
            idPracticaAsignada: number; 
            fechaInicio: string; 
            fechaFin: string 
        }) => updateFechasPracticaAsignada(idPracticaAsignada, fechaInicio, fechaFin),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['valesProfesor'] });
            queryClient.invalidateQueries({ queryKey: ['practicasDetalle'] });
        },
        onError: (error) => {
            console.error('Error updating practice dates:', error);
        },
    });
}