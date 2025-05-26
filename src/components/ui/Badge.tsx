import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";

export type BadgeVariant =
  | "default"
  | "primary"
  | "progreso"
  | "success"
  | "pendiente"
  | "completada"
  | "cancelada"
  | "inhabilitada"
  | "danger";

export interface BadgeProps {
  variant?: BadgeVariant;
  label: string;
  className?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({
  variant = "default",
  label,
  className = "",
  style,
  textStyle,
}: BadgeProps) {
  const getVariantStyles = (): { container: string; text: string } => {
    switch (variant) {
      case "primary":
        return {
          container: "bg-primary",
          text: "text-white",
        };
      case "progreso":
        return {
          container: "bg-sky-300",
          text: "text-sky-950",
        };
      case "success":
        return {
          container: "bg-green-300 ",
          text: " text-green-950",
        };
      case "pendiente":
        return {
          container: "bg-amber-300",
          text: "text-amber-950",
        };
      case "completada":
        return {
          container: "bg-green-300",
          text: "text-green-950",
        };
      case "cancelada":
        return {
          container: "bg-red-300",
          text: "text-red-950",
        };
      case "inhabilitada":
        return {
          container: "bg-gray-300",
          text: "text-gray-800",
        };
      case "danger":
        return {
          container: "bg-rose-300",
          text: "text-red-950 ",
        };
      default:
        return {
          container: "bg-gray-200 dark:bg-gray-700",
          text: "text-gray-800 dark:text-gray-200",
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View
      style={style}
      className={`px-3 py-1 rounded-full ${variantStyles.container} ${className}`}
    >
      <Text
        style={textStyle}
        className={`text-base font-medium ${variantStyles.text}`}
      >
        {label}
      </Text>
    </View>
  );
}
