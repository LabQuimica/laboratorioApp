import axios from 'axios';
import { Practica, PracticaDetails } from '@/src/types/practicas';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getPracticas = async (alumnoId: number): Promise<Practica[]> => {
    try {
        const response = await axios.get<Practica[]>(
        `${API_URL}/practicas/getPracticasByAlumno/${alumnoId}`
        );
        return response.data;
    } catch (error) {
        console.error('Error getting practices:', error);
        throw error;
    }
}

export const getPracticasDetalles = async (practicaId: number): Promise<PracticaDetails> => {
    try {
        const response = await axios.get<PracticaDetails>(
        `${API_URL}/practicas/getPractica/${practicaId}`
        );
        return response.data;
    } catch (error) {
        console.error('Error getting practices:', error);
        throw error;
    }
}

export const inscribirsePractica = async (idPracticaAsignada: number, idAlumno: number): Promise<any> => {
    try {
        const response = await axios.post(
            `${API_URL}/practicas/inscribemePractica?id_practica_asignada=${idPracticaAsignada}&id_alumno=${idAlumno}`
        );
        return response.data;
    } catch (error) {
        console.error('Error enrolling in practice:', error);
        throw error;
    }
}

export const updateStatusPracticaAsignada = async (idPracticaAsignada: number, newStatus: string): Promise<any> => {
    try {
        const response = await axios.post(
            `${API_URL}/practicas/updateStatusPracticaAsignada?id_practica_asignada=${idPracticaAsignada}&newStatus=${newStatus}`
        );
        return response.data;
    } catch (error) {
        console.error('Error updating practice status:', error);
        throw error;
    }
}