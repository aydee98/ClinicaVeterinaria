import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightComponent,
  className = "",
}) => {
  const navigation = useNavigation();

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-3 bg-blue-500 ${className}`}
    >
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-bold text-white">{title}</Text>
      </View>
      {rightComponent}
    </View>
  );
};
