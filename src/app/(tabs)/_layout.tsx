import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";

type IconProps = Readonly<{ color: ColorValue; size: number }>;

function HomeIcon({ color, size }: IconProps) {
  return <Ionicons name="home" size={size} color={color} />;
}

function AddMealIcon({ color, size }: IconProps) {
  return <Ionicons name="add-circle" size={size} color={color} />;
}

function MealsIcon({ color, size }: IconProps) {
  return <Ionicons name="list" size={size} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarIcon: HomeIcon }}
      />
      <Tabs.Screen
        name="add-meal"
        options={{ title: "Add Meal", tabBarIcon: AddMealIcon }}
      />
      <Tabs.Screen
        name="meals"
        options={{ title: "All Meals", tabBarIcon: MealsIcon }}
      />
    </Tabs>
  );
}
