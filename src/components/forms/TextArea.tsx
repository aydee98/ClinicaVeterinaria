import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface TextAreaProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rows?: number;
  required?: boolean;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  icon,
  rows = 4,
  required = false,
  className = "",
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-sm font-semibold text-gray-700 mb-1">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <View
        className={`flex-row items-start border rounded-lg px-3 bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={error ? "#EF4444" : "#9CA3AF"}
            style={{ marginTop: 12 }}
          />
        )}
        <TextInput
          className={`flex-1 py-3 px-2 text-base text-gray-800`}
          style={{ minHeight: rows * 24 }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          multiline
          numberOfLines={rows}
          textAlignVertical="top"
        />
      </View>
      {error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
};
