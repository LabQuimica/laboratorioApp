import axios from 'axios';
import { Practica } from '@/src/types/practicas';

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