import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates, DayComponentProps } from "@/src/types/calendar";
import { usePracticasAlumno } from "@/src/hooks/practicas";
import { useAuthStore } from "@/src/stores/auth";
import { router } from "expo-router";

const getColorByCodigo = (codigo: string | null | undefined): string => {
  if (!codigo) {
    return "#5B74D8";
  }

  let hash = 0;
  for (let i = 0; i < codigo.length; i++) {
    hash = codigo.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const getColorByTime = (fechaInicio: string, fechaFin: string): string => {
  const now = new Date();
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  if (now < inicio) return "#3DB745";
  if (now >= inicio && now <= fin) return "#D6D433";
  return "#EA6466";
};

const CustomCalendar: React.FC = () => {
   // Obtener fecha actual
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const [selected, setSelected] = useState<string>("");
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const [isWeekView, setIsWeekView] = useState(false);

  const { user } = useAuthStore();
  
  const {
    data: practicas,
    isLoading,
    error,
  } = usePracticasAlumno(user?.id_user);

  useEffect(() => {
    if (practicas) {
      const newMarkedDates: MarkedDates = {};

      newMarkedDates[todayString] = {
        selected: todayString === selected,
        selectedColor: "#6C63FF",
        marked: practicas.some(
          (p) =>
            new Date(p.fecha_inicio).toISOString().split("T")[0] === todayString
        ),
      };

      if (selected && selected !== todayString) {
        newMarkedDates[selected] = {
          ...newMarkedDates[selected],
          selected: true,
          selectedColor: "#5C8AEE",
        };
      }

      const practicasByDate: Record<string, typeof practicas> = {};

      practicas.forEach((practica) => {
        const fechaInicio = new Date(practica.fecha_inicio)
          .toISOString()
          .split("T")[0];

        if (!practicasByDate[fechaInicio]) {
          practicasByDate[fechaInicio] = [];
        }

        practicasByDate[fechaInicio].push(practica);
      });

      Object.entries(practicasByDate).forEach(([fecha, practicasEnFecha]) => {
        const currentDateMarking = newMarkedDates[fecha] || {};

        if (practicasEnFecha.length === 1) {
          newMarkedDates[fecha] = {
            ...currentDateMarking,
            marked: true,
            dotColor: getColorByCodigo(practicasEnFecha[0].codigo),
            activeOpacity: 0,
          };
        } else {
          newMarkedDates[fecha] = {
            ...currentDateMarking,
            marked: true,
            dots: practicasEnFecha.map((p) => ({
              color: getColorByCodigo(p.codigo),
            })),
            activeOpacity: 0,
          };
        }
      });

      setMarkedDates(newMarkedDates);
    }
  }, [practicas, selected, todayString]);

  const getDisplayDate = () => {
    return selected || todayString;
  };

  const getHeaderText = () => {
    const displayDate = getDisplayDate();
    const isToday = displayDate === todayString;
    
    if (isToday) {
      return 'Hoy';
    } else {
      const [year, month, day] = displayDate.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      
      const weekday = dateObj.toLocaleDateString('es-MX', { 
        weekday: 'long' 
      });
      return weekday.charAt(0).toUpperCase() + weekday.slice(1);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#5C8AEE" />
        <Text className="text-black dark:text-white mt-4">
          Cargando prácticas...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error al cargar las prácticas</Text>
        <Text className="text-black dark:text-white mt-2">
          Por favor, intenta nuevamente más tarde.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-background-dark w-full py-10 px-5">
      <Calendar
        onDayPress={(day: DateData) => {
          setSelected(day.dateString);
        }}
        onDayLongPress={(day: DateData) => {
          setSelected(day.dateString);
        }}
        markedDates={markedDates}
        style={{
          borderRadius: 30,
          padding: 10,
        }}
        theme={{
          calendarBackground: "#272E4B",
          textSectionTitleColor: "#FFFFFF",
          selectedDayBackgroundColor: "#5B74D8",
          selectedDayTextColor: "#FFFFFF",
          todayTextColor: "#FFFFFF",
          dayTextColor: "#FFFFFF",
          textDisabledColor: "#3D539F",
          dotColor: "#3D539F",
          selectedDotColor: "#FFFFFF",
          arrowColor: "#FFFFFF",
          monthTextColor: "#FFFFFF",
          indicatorColor: "#FFFFFF",
          textDayFontFamily: "System",
          textMonthFontFamily: "System",
          textDayHeaderFontFamily: "System",
          textDayFontSize: 20,
          textMonthFontSize: 24,
          textDayHeaderFontSize: 14,
        }}
        hideExtraDays={false}
        // Header del calendario
        renderHeader={(date: Date) => {
          const dateObj = new Date(date);
          const month = dateObj.toLocaleString("es", { month: "long" });
          const day = dateObj.getDate();
          const year = dateObj.getFullYear();
          return (
            <View className="flex flex-row justify-between items-center p-4">
              <Text className="text-white text-xl font-bold">
                {`${
                  month.charAt(0).toUpperCase() + month.slice(1)
                }, ${day} de ${year}`}
              </Text>
            </View>
          );
        }}
        enableSwipeMonths={true}
        // Dias personalizados
        dayComponent={({ date, state, marking }: DayComponentProps) => {
          if (!date) return null;

          const isToday = date.dateString === todayString;
          const isSelected = date.dateString === selected;

          // Color del texto segun el dia
          let textColorClass = "text-white font-extralight"; // Dia del mes actual
          if (state === "disabled") {
            textColorClass = "text-[#5B74D8] dark:text-[#3D539F]"; // Dia de otro mes
          } else if (isToday) {
            textColorClass = "text-white font-extrabold"; // Dia actual
          }

          const handleDayPress = () => {
            setSelected(date.dateString);
          };

          return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleDayPress}
              className={`flex items-center justify-center rounded-full align-middle ${
                isSelected ? "bg-[#272E4B] dark:bg-[#5B74D8]" : ""
              } ${isToday ? "bg-[#272E4B] dark:bg-[#5B74D8]" : ""} w-10 h-10`}
            >
              <Text className={`${textColorClass} font-medium`}>
                {date.day}
              </Text>
              {marking && marking.marked && (
                <View className="flex flex-row mt-1 h-1">
                  {marking.dots ? (
                    marking.dots.map((dot, index) => (
                      <View
                        key={index}
                        className="h-1 w-1 mx-0.5 rounded-full"
                        style={{ backgroundColor: dot.color }}
                      />
                    ))
                  ) : (
                    <View
                      className="h-1 w-4 rounded-sm"
                      style={{ backgroundColor: marking.dotColor }}
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Mostrar timeline de practicas */}
      {selected && practicas && (
        <ScrollView className="mt-6 px-4">
          <View className="flex flex-row items-center mb-5">
            <Text className="text-black dark:text-white text-5xl font-bold mr-7">{getHeaderText()}</Text>
            <Text className='text-black dark:text-white text-xl font-thin'>
              {(() => {
                const displayDate = getDisplayDate();
                const [year, month, day] = displayDate.split('-').map(Number);
                const dateObj = new Date(year, month - 1, day);
                return dateObj.toLocaleDateString('es-MX', { 
                  day: 'numeric', 
                  month: 'long',
                  timeZone: 'America/Mexico_City'
                });
              })()}
            </Text>
          </View>

          <View className="flex-row">
            {/* Horas */}
            <View className="w-14">
              {Array.from({ length: 14 }, (_, i) => {
                const hour = 7 + i;
                return (
                  <View key={hour} className="h-16 justify-start">
                    <Text className="text-xs text-gray-400">{hour} AM</Text>
                  </View>
                );
              })}
            </View>

            {/* Timeline de practicas */}
            <View className="flex-1 relative">
              <View className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />

              {practicas
                .filter(
                  (p) =>
                    new Date(p.fecha_inicio).toISOString().split("T")[0] ===
                    selected
                )
                .map((practica) => {
                  const start = new Date(practica.fecha_inicio);
                  const end = new Date(practica.fecha_fin);
                  const startHour = start.getHours() + start.getMinutes() / 60;
                  const topOffset = (startHour - 7) * 64; // 64px por cuadrito

                  const durationInHours =
                    (end.getTime() - start.getTime()) / 3600000;
                  const height = durationInHours * 64;

                  const color = getColorByCodigo(practica.codigo);

                  return (
                    <View
                      key={practica.id_practica}
                      style={{ top: topOffset, height }}
                      className="absolute left-8 right-0 rounded-lg px-3 py-2 "
                    >
                      <View
                        className="absolute -left-5 top-6 w-5 h-5 rounded-full border-2 dark:border-white border-gray-300 "
                        style={{ backgroundColor: color }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          router.push({
                            pathname: "/practica_seleccionada",
                            params: {
                              practica: practica.id_practica,
                              status: practica.status,
                            },
                          });
                        }}
                      >
                        <View className="bg-[#3D539F] dark:bg-[#1E1E2F] rounded-xl px-4 py-2 shadow-md">
                          <Text className="text-white font-semibold text-sm">
                            {practica.nombre}
                          </Text>
                          <Text className="text-gray-300 text-xs">
                            {practica.grupo_nombre}
                          </Text>
                          <Text className="text-gray-400 text-xs">
                            {start.toLocaleTimeString("es", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -
                            {end.toLocaleTimeString("es", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CustomCalendar;
