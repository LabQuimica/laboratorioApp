import { useQuery } from '@tanstack/react-query';
import { Grupo } from '../types/grupos';
import { fetchGrupos, fetchGruposByAlumno } from '../services/gruposService';

export const useGrupos = () => {
    return useQuery<Grupo[], Error>({
        queryKey: ["grupos"],
        queryFn: fetchGrupos,
    });
};

export const useGruposByAlumno = (idAlumno: number) => {
    return useQuery<Grupo[], Error>({
        queryKey: ["gruposByAlumno", idAlumno],
        queryFn: () => fetchGruposByAlumno(idAlumno),
        enabled: !!idAlumno,
    });
};