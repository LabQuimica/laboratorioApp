import { useQuery } from '@tanstack/react-query';
import { Grupo } from '../types/grupos';
import { fetchGrupos, fetchGruposByUsuario } from '../services/gruposService';

export const useGrupos = () => {
    return useQuery<Grupo[], Error>({
        queryKey: ["grupos"],
        queryFn: fetchGrupos,
    });
};

export const useGruposByUsuario = (idAlumno: number | undefined) => {
    return useQuery<Grupo[], Error>({
        queryKey: ["gruposByAlumno", idAlumno],
        queryFn: () => fetchGruposByUsuario(idAlumno!),
        enabled: !!idAlumno,
    });
};