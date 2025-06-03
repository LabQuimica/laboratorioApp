import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { asignarPractica, getNewPracticas, getPracticas, getPracticasByGrupo, getPracticasCreadas } from '@/src/services/practicasService';
import { Practica } from '@/src/types/practicas';

export function usePracticasAlumno(alumnoId?: number) {
    return useQuery<Practica[]>({
        queryKey: ['practicasAlumno'],
        queryFn: () => getPracticas(alumnoId!),
    })
}

export const useAsignarPractica = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: asignarPractica,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["practicasAlumno"] });
        },
    });
};

export function usePracticasPorGrupo(grupoId?: number) {
  return useQuery<Practica[]>({
    queryKey: ["practicasPorGrupo", grupoId],
    queryFn: () => getPracticasByGrupo(grupoId!),
    enabled: !!grupoId,
  });
}

export function usePracticasCreadas() {
  return useQuery<Practica[]>({
    queryKey: ["practicasCreadas"],
    queryFn: getPracticasCreadas,
  });
}

export function useNewPracticas(alumnoId?: number) {
  return useQuery<Practica[]>({
    queryKey: ["practicasNuevasAsignadas", alumnoId],
    queryFn: () => getNewPracticas(alumnoId!),
    enabled: !!alumnoId,
  });
}