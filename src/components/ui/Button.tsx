import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "success" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  className = "",
}) => {
  // Colores según variante
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 active:bg-blue-600";
      case "secondary":
        return "bg-gray-500 active:bg-gray-600";
      case "danger":
        return "bg-red-500 active:bg-red-600";
      case "success":
        return "bg-green-500 active:bg-green-600";
      case "outline":
        return "bg-transparent border-2 border-blue-500 active:bg-blue-50";
      default:
        return "bg-blue-500 active:bg-blue-600";
    }
  };

  const getTextStyles = () => {
    if (variant === "outline") {
      return "text-blue-500";
    }
    return "text-white";
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "py-2 px-4";
      case "medium":
        return "py-3 px-6";
      case "large":
        return "py-4 px-8";
      default:
        return "py-3 px-6";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-lg flex-row items-center justify-center ${getVariantStyles()} ${getSizeStyles()} ${
        disabled || loading ? "opacity-50" : ""
      } ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Ionicons
              name={icon}
              size={20}
              color={variant === "outline" ? "#3B82F6" : "white"}
            />
          )}
          <Text
            className={`font-semibold ${getTextStyles()} ${getTextSize()} ${icon ? "mx-2" : ""}`}
          >
            {title}
          </Text>
          {icon && iconPosition === "right" && (
            <Ionicons
              name={icon}
              size={20}
              color={variant === "outline" ? "#3B82F6" : "white"}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
