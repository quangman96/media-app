import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  useNavigationContainerRef,
  useNavigationState,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Analytics from "expo-firebase-analytics";
import { useFonts } from "expo-font";
import React, { useEffect, useRef, useState } from "react";
import { LogBox, StatusBar } from "react-native";
import "react-native-gesture-handler";
import Article from "./app/screens/Article";
import CreateVideo from "./app/screens/CreateVideo";
import Detail from "./app/screens/Detail";
import FilteredArticles from "./app/screens/FilteredArticles";
import Header from "./app/screens/Header";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import MyList from "./app/screens/MyList";
import Chat from "./app/screens/Chat";
import VideoScreen from "./app/screens/Video";
import Saved from "./app/screens/Saved";
import Search from "./app/screens/Search";
import User from "./app/screens/User";
import ChatDetail from "./app/screens/ChatDetail";
import { getChatTitle } from "./firebase";
LogBox.ignoreAllLogs();

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const routeNameRef = useRef();
  const navigationRef = useNavigationContainerRef();
  const screenOptions = {
    tabBarLabel: () => {
      return null;
    },
    tabBarStyle: {
      backgroundColor: "white",
      height: 70,
    },
    tabBarHideOnKeyboard: true,
    tabBarOptions: {
      keyboardHidesTabBar: true,
    },
  };
  const TabNavigator = () => (
    <Tab.Navigator {...{ screenOptions }}>
      <Tab.Screen
        name="Home"
        children={() => <Home value={categories} />}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? "#667080" : "#bbc0c8"}
            />
          ),
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Search"
        children={() => <Search value={childData} />}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search"
              size={24}
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
          tabBarButton: () => null,
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Video"
        children={() => <VideoScreen value={categories} />}
        options={{
          unmountOnBlur: true,
          tabBarButton: () => null,
          header: () => null,
        }}
      />
      <Tab.Screen
        name="My Article"
        component={MyList}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="list"
              size={24}
              color={focused ? "#667080" : "#bbc0c8"}
            />
          ),
          header: () => null,
        }}
      />
      <Tab.Screen
        name="All Chat"
        children={() => <Chat />}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="message-circle"
              size={24}
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
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#667080" : "#bbc0c8"}
            />
          ),
          header: () => null,
          headerTitle: () => <></>,
          headerLeft: () => <></>,
          headerStyle: { height: 300 },
        }}
      />
    </Tab.Navigator>
  );
  const [headerHeight, setHeaderHeight] = useState(115);
  const [childData, setChildData] = useState("");
  const [categories, setCategory] = useState([]);
  const [loaded] = useFonts({
    Inter: require("./assets/fonts/static/Inter-Regular.ttf"),
  });

  useEffect(() => {}, [childData]);
  useEffect(() => {}, [categories]);

  if (!loaded) {
    return null;
  }

  const getTitle = () => {
    const routes = useNavigationState((state) => state.routes);
    const currentRouteIndex =
      routes?.length && routes[routes.length - 1].state?.index;
    const currentRoute =
      routes[routes.length - 1].state?.routeNames[currentRouteIndex];
    if (currentRoute === "Search") {
      setHeaderHeight(165);
    } else if (currentRoute === "Home") {
      setHeaderHeight(145);
    } else if (!currentRoute) {
      setHeaderHeight(150);
    } else {
      setHeaderHeight(105);
    }
    return currentRoute || getChatTitle() || "Home";
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          Analytics.logEvent("screen_view", { currentRouteName });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: headerHeight,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            headerTitle: () => (
              <Header
                passInput={setChildData}
                passCategory={setCategory}
                title={getTitle()}
              />
            ),
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="NewProfile"
          component={User}
          options={{
            headerTitle: () => (
              <Header
                passInput={setChildData}
                passCategory={setCategory}
                title={"New Profile"}
              />
            ),
            headerLeft: null,
            headerStyle: {},
          }}
        />

        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: "",
            headerStyle: {
              height: 85,
            },
            headerLeftContainerStyle: {
              marginBottom: 20,
            },
          }}
        />

        <Stack.Screen
          name="ChatDetail"
          component={ChatDetail}
          options={{
            title: getChatTitle(),
            headerStyle: {
              height: 100,
            },
            headerTintColor: "#667080",
            headerTitleStyle: {
              color: "#667080",
              fontSize: 30,
              fontWeight: "700",
              marginTop: -10,
            },
          }}
        />

        <Stack.Screen
          name="AddArticle"
          component={Article}
          options={{
            title: "Add Article",
            headerStyle: {
              height: 110,
            },
            headerTintColor: "#667080",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 35,
              fontFamily: "Inter",
            },
          }}
        />

        <Stack.Screen
          name="EditArticle"
          component={Article}
          options={{
            title: "Edit Article",
            headerStyle: {
              height: 110,
            },
            headerTintColor: "#667080",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 35,
              fontFamily: "Inter",
            },
          }}
        />

        <Stack.Screen
          name="FilteredArticles"
          component={FilteredArticles}
          options={{
            headerStyle: {
              height: 110,
            },
            headerTintColor: "#667080",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 35,
              fontFamily: "Inter",
            },
          }}
        />

        <Stack.Screen
          name="CreateVideo"
          component={CreateVideo}
          options={{
            title: "Create Video",
            headerStyle: {
              height: 110,
            },
            headerTintColor: "#667080",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 35,
              fontFamily: "Inter",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
