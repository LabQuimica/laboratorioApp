import axios from 'axios';
import { ValeAlumnoDetails, ValeProfesorDetails } from '@/src/types/vale';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getAllValesAlumno = async (userId: number): Promise<ValeAlumnoDetails[]> => {
  try {
    const response = await axios.get<ValeAlumnoDetails[]>(
      `${API_URL}/vales/getAllValesAlumno?fk_alumno_users_vale=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting all vales:', error);
    throw error;
  }
}; 

export const getAllValesProfesor = async (userId: number): Promise<ValeProfesorDetails[]> => {
  try {
    const response = await axios.get<ValeProfesorDetails[]>(
      `${API_URL}/vales/getAllValesProfesor?id_users_vale=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting all vales:', error);
    throw error;
  }
}; 