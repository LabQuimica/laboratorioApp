import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const updateUserAvatar = async (userId: string, avatar: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/updateUserAvatar?id=${userId}&avatar=${avatar}`
    );
    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
}; 