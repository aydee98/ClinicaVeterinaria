import React from "react";
import { Text, View } from "react-native";

interface FooterProps {
  text?: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  text = "© 2026 VetCare - Todos los derechos reservados",
  className = "",
}) => {
  return (
    <View className={`py-4 bg-gray-100 items-center ${className}`}>
      <Text className="text-xs text-gray-500">{text}</Text>
    </View>
  );
};
