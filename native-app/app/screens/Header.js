import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ToastAndroid,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ChipList from "../components/ChipList";

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../firebase";

export default function Header({ title, passChildData }) {
  const buttons = [
    {
      name: "Popular",
      theme: "dark",
    },
    {
      name: "All",
      theme: "light",
    },
    {
      name: "For you",
      theme: "light",
    },
  ];
  const [text, onChangeText] = useState("");
  const { width } = useWindowDimensions();
  const name = title === "User" ? "Profile" : title;
  const navigation = useNavigation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      passChildData(text);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  const showToast = () => {
    ToastAndroid.show("Logout successfully !!!", ToastAndroid.SHORT);
  };
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        showToast();
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={[styles.header, { width: width }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {title !== "Search" && title !== "Home" && (
          <Text style={styles.title}>{name}</Text>
        )}
        {title === "User" && (
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              alignSelf: "flex-end",
              marginRight: "12%",
            }}
          >
            {<Feather name={"log-out"} size={30} color={"#0386D0"} />}
          </TouchableOpacity>
        )}
        {title === "Search" && (
          <View>
            <View style={styles.custom}>
              <Text style={styles.title}>Explore</Text>
            </View>
            <View style={[styles.search, { width: width - 40 }]}>
              <Feather
                style={styles.icon}
                name={"search"}
                size={25}
                color={"#979797"}
              />
              <TextInput
                style={[styles.input, { width: width - 100 }]}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Enter the keyword"}
              />
            </View>
            <View style={{ marginLeft: 20, marginBottom: 12 }}></View>
          </View>
        )}
        {title === "Home" && (
          <View styles={styles.view}>
            <Text style={styles.title}>Home</Text>
            <View style={{ marginTop: 10 }}></View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.chips}></View>
              <ChipList data={buttons} size="medium"></ChipList>
            </View>
            <View style={{ marginTop: 20 }}></View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { marginBottom: -10 },
  search: {
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: "white",
    position: "relative",
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    marginVertical: 10,
    borderColor: "#979797",
    borderWidth: 1,
    paddingLeft: 15,
    marginTop: 30,
  },
  custom: {
    marginBottom: -15,
  },
  header: {
    position: "absolute",
    bottom: 0,
    minHeight: 100,
    backgroundColor: "white",
  },
  body: {
    alignItems: "center",
    margin: 20,
  },
  title: {
    color: "#667080",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 40,
    marginLeft: 20,
  },
  chips: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  icon: {
    marginTop: 10,
    marginRight: 10,
  },
});
