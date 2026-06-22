import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  required?: boolean;
  className?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  icon,
  secureTextEntry = false,
  keyboardType = "default",
  maxLength,
  multiline = false,
  numberOfLines = 1,
  required = false,
  className = "",
  onBlur,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-sm font-semibold text-gray-700 mb-1">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}
      <View
        className={`flex-row items-center border rounded-lg px-3 bg-white ${
          error
            ? "border-red-500"
            : isFocused
              ? "border-blue-500"
              : "border-gray-300"
        }`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={error ? "#EF4444" : isFocused ? "#3B82F6" : "#9CA3AF"}
          />
        )}
        <TextInput
          className={`flex-1 py-3 px-2 text-base text-gray-800 ${
            multiline ? "min-h-[80px]" : ""
          }`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlignVertical={multiline ? "top" : "center"}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
};
