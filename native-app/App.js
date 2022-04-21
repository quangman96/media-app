import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Screen from "./app/components/Screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import Login from "./app/screens/Login";

const Home = () => (
  <Screen>
    <Text>Home</Text>
  </Screen>
);

const Search = () => (
  <Screen>
    <Text>Search</Text>
  </Screen>
);

const Saved = () => (
  <Screen>
    <Text>Saved</Text>
  </Screen>
);

const User = () => (
  <Screen>
    <Text>User</Text>
  </Screen>
);

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarLabel: () => {
    return null;
  },
  tabBarStyle: {
    backgroundColor: "white",
    height: 100,
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
            size={30}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="search"
            size={30}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Saved"
      component={Saved}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="bookmark"
            size={30}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="User"
      component={User}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="user"
            size={30}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
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
    <Login />
    // <NavigationContainer>
    //   <TabNavigator />
    // </NavigationContainer>
  );
}
