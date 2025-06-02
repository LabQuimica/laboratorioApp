import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DatePicker, { SingleOutput } from "react-native-neat-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { usePracticasCreadas } from "@/src/hooks/practicas";
import { useGrupos } from "@/src/hooks/grupos";
import { useAsignarPractica } from "@/src/hooks/practicas";
import { useState } from "react";
import { useToast } from "@/src/contexts/ToastContext";

export default function AsignarPractica() {
  const { data: practicas = [] } = usePracticasCreadas();
  const { data: grupos = [] } = useGrupos();
  const asignarPractica = useAsignarPractica();
  const { showToast } = useToast();

  const [selectedPractica, setSelectedPractica] = useState<number | null>(null);
  const [selectedGrupo, setSelectedGrupo] = useState<number | null>(null);
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const onConfirmStartDate = (output: SingleOutput) => {
    setShowStartDatePicker(false);
    if (output.date) {
      setStartDate(output.date);
    }
  };

  const onConfirmEndDate = (output: SingleOutput) => {
    setShowEndDatePicker(false);
    if (output.date) {
      setEndDate(output.date);
    }
  };


  const combineDateTime = (date: Date, time: Date) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    return combined;
  };

  const handleAsignar = async () => {
    if (!selectedPractica || !selectedGrupo || !startDate || !endDate) {
      showToast("Completa todos los campos antes de asignar.", "error");
      return;
    }

    const fechaInicioFinal = combineDateTime(startDate, startTime);
    const fechaFinFinal = combineDateTime(endDate, endTime);

    try {
      console.log("Datos de practica", selectedPractica, selectedGrupo, fechaInicioFinal, fechaFinFinal)
      
      await asignarPractica.mutateAsync({
        practica: selectedPractica,
        grupo: selectedGrupo,
        fecha_inicio: fechaInicioFinal.toISOString(),
        fecha_fin: fechaFinFinal.toISOString(),
      });

      showToast("Práctica asignada correctamente.", "success");

      setSelectedPractica(null);
      setSelectedGrupo(null);
      setStartDate(null);
      setEndDate(null);
      setStartTime(new Date());
      setEndTime(new Date());
    } catch (error) {
      console.log(error)
      showToast("Error al asignar la práctica. Intenta nuevamente.", "error");
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-6">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Asignar Práctica
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Configura los detalles para asignar una práctica a un grupo
          </Text>
        </View>

        {/* Selector de práctica */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Selecciona una práctica
          </Text>
          <View className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Picker
              selectedValue={selectedPractica}
              onValueChange={(itemValue) => setSelectedPractica(itemValue)}
              style={{ backgroundColor: "transparent", color: "#ffffff" }}
              dropdownIconColor="#6b7280"
            >
              <Picker.Item label="Selecciona una práctica" value={null} color="#000000" />
              {practicas.map((p) => (
                <Picker.Item 
                  key={p.id_practica} 
                  label={p.nombre} 
                  value={p.id_practica} 
                  color="#000000" 
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Selector de grupo */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Selecciona un grupo
          </Text>
          <View className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Picker
              selectedValue={selectedGrupo}
              onValueChange={(itemValue) => setSelectedGrupo(itemValue)}
              style={{ backgroundColor: "transparent", color: "#ffffff" }}
              dropdownIconColor="#6b7280"
            >
              <Picker.Item label="Selecciona un grupo" value={null} color="#000000" />
              {grupos.map((g) => (
                <Picker.Item 
                  key={g.id_grupo} 
                  label={g.nombre} 
                  value={g.id_grupo} 
                  color="#000000" 
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Fechas */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Fechas
          </Text>
          
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-3"
          >
            <Text className="text-gray-900 dark:text-white">
              Fecha de inicio: {startDate ? startDate.toLocaleDateString("es-MX") : "Selecciona fecha"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <Text className="text-gray-900 dark:text-white">
              Fecha de fin: {endDate ? endDate.toLocaleDateString("es-MX") : "Selecciona fecha"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Horarios */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Horarios
          </Text>

          <TouchableOpacity
            onPress={() => setShowStartTimePicker(true)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-3"
          >
            <Text className="text-gray-900 dark:text-white">
              Hora de inicio: {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowEndTimePicker(true)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <Text className="text-gray-900 dark:text-white">
              Hora de fin: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Botón de asignar */}
        <TouchableOpacity
          onPress={handleAsignar}
          disabled={asignarPractica.isPending}
          className={`rounded-xl p-4 shadow-lg ${
            asignarPractica.isPending
              ? "bg-gray-400 dark:bg-gray-600"
              : "bg-blue-600 dark:bg-blue-500 active:bg-blue-700 dark:active:bg-blue-600"
          }`}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {asignarPractica.isPending ? "Asignando..." : "Asignar Práctica"}
          </Text>
        </TouchableOpacity>

        {/* Date Pickers */}
        <DatePicker
          isVisible={showStartDatePicker}
          mode="single"
          onCancel={() => setShowStartDatePicker(false)}
          onConfirm={onConfirmStartDate}
          colorOptions={{
            headerColor: '#3b82f6',
            headerTextColor: '#ffffff',
            changeYearModalColor: '#ffffff',
            weekDaysColor: '#6b7280',
            dateTextColor: '#1f2937',
            selectedDateBackgroundColor: '#dbeafe',
            confirmButtonColor: '#3b82f6'
          }}
        />

        <DatePicker
          isVisible={showEndDatePicker}
          mode="single"
          onCancel={() => setShowEndDatePicker(false)}
          onConfirm={onConfirmEndDate}
          colorOptions={{
            headerColor: '#3b82f6',
            headerTextColor: '#ffffff',
            changeYearModalColor: '#ffffff',
            weekDaysColor: '#6b7280',
            dateTextColor: '#1f2937',
            selectedDateBackgroundColor: '#dbeafe',
            confirmButtonColor: '#3b82f6'
          }}
        />

        {/* Time Pickers */}
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartTimePicker(Platform.OS === 'ios');
              if (selectedDate) setStartTime(selectedDate);
            }}
          />
        )}

        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndTimePicker(Platform.OS === 'ios');
              if (selectedDate) setEndTime(selectedDate);
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}