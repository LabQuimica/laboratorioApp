import axios from 'axios';
import { Practica } from '@/src/types/practicas';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const formatDates = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

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

export const asignarPractica = async (newPracticaAsignada: {
  practica: number;
  grupo: number;
  fecha_inicio: string;
  fecha_fin: string;
}) => {
   try {
    const formattedPayload = {
      ...newPracticaAsignada,
      fecha_inicio: formatDates(newPracticaAsignada.fecha_inicio),
      fecha_fin: formatDates(newPracticaAsignada.fecha_fin),
    };

    const response = await axios.post(
      `${API_URL}/practicas/asignarPractica`,
      formattedPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error("Error al crear la práctica");
  }
};

export const getPracticasByGrupo = async (grupoId: number): Promise<Practica[]> => {
  try {
    const response = await axios.get<Practica[]>(`${API_URL}/practicas/getPracticasByGroup/${grupoId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting practices by group:", error);
    throw error;
  }
};

export const getPracticasCreadas = async (): Promise<Practica[]> => {
  try {
    const response = await axios.get<Practica[]>(
      `${API_URL}/practicas/getPracticasCreadas`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener prácticas creadas:", error);
    throw error;
  }
};

export const getNewPracticas= async (alumnoId: number): Promise<Practica[]> => {
  try {
    const response = await axios.get<Practica[]>(`${API_URL}/practicas/getNewPracticasAsignadas/${alumnoId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting recent practices:", error);
    throw error;
  }
};