import axios from 'axios';
import { Grupo } from '../types/grupos';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchGrupos = async () => {

    try {
        const response = await axios.get<Grupo[]>(
        `${API_URL}/grupos/getGrupos`
        );
        return response.data;
    } catch (error) {
        console.error('Error getting grupos:', error);
        throw error;
    }
};

export const fetchGruposByUsuario = async (idAlumno: number): Promise<Grupo[]> => {
    try {
        const response = await axios.get<Grupo[]>(
            `${API_URL}/grupos/getGruposByUsuario/${idAlumno}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error getting grupos for alumno:`, error);
        throw error;
    }
};