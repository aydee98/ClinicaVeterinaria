import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SelectorOption {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface SelectorProps {
  label?: string;
  options: SelectorOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const Selector: React.FC<SelectorProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  required = false,
  className = "",
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              className={`flex-row items-center px-4 py-2 rounded-lg border ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
              onPress={() => onSelect(option.value)}
            >
              {option.icon && (
                <Ionicons
                  name={option.icon}
                  size={20}
                  color={isSelected ? "#3B82F6" : "#6B7280"}
                />
              )}
              <Text
                className={`ml-2 ${
                  isSelected ? "text-blue-500 font-semibold" : "text-gray-600"
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
