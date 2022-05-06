import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import React from "react";

export default function Header({ title }) {
  const name = title === "User" ? "Profile" : title;
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
