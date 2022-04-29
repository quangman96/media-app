import React from "react";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/screens/Login";
import User from "./app/screens/User";
import Saved from "./app/screens/Saved";
import Search from "./app/screens/Search";
import Home from "./app/screens/Home";
import Detail from "./app/screens/Detail";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  tabBarLabel: () => {
    return null;
  },
  tabBarStyle: {
    backgroundColor: "white",
    height: 70,
  },
};
const TabNavigator = () => (
  <Tab.Navigator {...{ screenOptions }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="home"
            size={26}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
        header: () => null,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="search"
            size={26}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
        header: () => null,
      }}
    />
    <Tab.Screen
      name="Saved"
      component={Saved}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="bookmark"
            size={26}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
        header: () => null,
      }}
    />
    <Tab.Screen
      name="User"
      component={User}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="user"
            size={26}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
        header: () => null,
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [loaded] = useFonts({
    Inter: require("./assets/fonts/static/Inter-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
