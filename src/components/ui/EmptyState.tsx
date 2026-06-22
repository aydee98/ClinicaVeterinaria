import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  buttonText?: string;
  onButtonPress?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "clipboard-outline",
  iconSize = 60,
  buttonText,
  onButtonPress,
  className = "",
}) => {
  return (
    <View className={`items-center justify-center py-10 ${className}`}>
      <Ionicons name={icon} size={iconSize} color="#CBD5E1" />
      <Text className="text-xl font-bold text-gray-700 mt-4">{title}</Text>
      {description && (
        <Text className="text-base text-gray-400 text-center mt-2 px-8">
          {description}
        </Text>
      )}
      {buttonText && onButtonPress && (
        <Button
          title={buttonText}
          onPress={onButtonPress}
          variant="primary"
          size="medium"
          className="mt-4"
        />
      )}
    </View>
  );
};
