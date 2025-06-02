import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  nombre: string;
  siglas: string;
  color: string;
  onPress?: () => void;
}

const MateriaCard = ({ nombre, siglas, color, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className='mb-6'>
        <View className='flex-row justify-between items-center px-4 py-4 rounded-xl border border-blue-500'>
            <Text className='text-white text-xl font-bold'>{nombre}</Text>
            <View className='rounded-full w-14 h-14 items-center justify-center align-middle' style={{backgroundColor: color}}>
                <Text className='text-white font-bold'>{siglas}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default MateriaCard;