import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  onPress,
  className = "",
  variant = "default",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "elevated":
        return "bg-white shadow-lg";
      case "outlined":
        return "bg-white border-2 border-gray-200";
      default:
        return "bg-white";
    }
  };

  const Content = (
    <View className={`rounded-xl p-4 ${getVariantStyles()} ${className}`}>
      {title && (
        <Text className="text-lg font-bold text-gray-800 mb-1">{title}</Text>
      )}
      {subtitle && (
        <Text className="text-sm text-gray-500 mb-3">{subtitle}</Text>
      )}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {Content}
      </TouchableOpacity>
    );
  }

  return Content;
};
