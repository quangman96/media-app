import React from "react";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useRoute,
  useNavigationState,
} from "@react-navigation/native";
import Login from "./app/screens/Login";
import User from "./app/screens/User";
import Saved from "./app/screens/Saved";
import Search from "./app/screens/Search";
import Home from "./app/screens/Home";
import Detail from "./app/screens/Detail";
import Header from "./app/screens/Header";

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
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => (
          <Feather
            name="bookmark"
            size={26}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
        header: () => null,
        headerLeft: () => null,
      }}
    />
    <Tab.Screen
      name="User"
      component={User}
      options={{
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => (
          <Feather
            name="user"
            size={26}
            color={focused ? "#667080" : "#bbc0c8"}
          />
        ),
        header: () => null,
        headerTitle: () => <></>,
        headerLeft: () => <></>,
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

  const getTitle = () => {
    const routes = useNavigationState((state) => state.routes);
    const currentRouteIndex =
      routes?.length && routes[routes.length - 1].state?.index;
    const currentRoute =
      routes[routes.length - 1].state?.routeNames[currentRouteIndex];
    return currentRoute || "Home";
  };

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
          // options={{ headerShown: false }}
          options={{
            headerTitle: () => <Header title={getTitle()} />,
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: "",
            headerStyle: {
              // height: 80,
            },
            headerLeftContainerStyle: {
              marginBottom: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
