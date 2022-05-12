import React from "react";
import { View } from "react-native";
import AppText from "./Text";

export default function Chip({ label, size = "small", theme = "light" }) {
  const chipStyle =
    size === "small"
      ? {
          height: 24,
          borderRadius: 20,
          backgroundColor: "#EEF1F4",
          marginBottom: 5,
          marginRight: 10,
          marginTop: 5,
          paddingRight: 5,
          paddingLeft: 5,
        }
      : size === "medium"
      ? {
          height: 40,
          minWidth: 100,
          justifyContent: "center",
          backgroundColor: "#EEF1F4",
          borderRadius: 20,
          marginRight: 20,
        }
      : {
          height: 25,
          minWidth: 80,
          borderRadius: 20,
          backgroundColor: "#EEF1F4",
          marginBottom: 5,
          marginRight: 5,
          marginTop: 5,
          paddingRight: 5,
          paddingLeft: 5,
        };

  size === "medium" &&
    theme === "dark" &&
    (chipStyle["backgroundColor"] = "#667080");

  const textStyle =
    size === "small"
      ? {
          alignSelf: "center",
          color: "#667080",
          fontSize: 10,
          fontWeight: "400",
          lineHeight: 22,
        }
      : theme === "light"
      ? {
          alignSelf: "center",
          color: "#667080",
          fontSize: 14,
          fontWeight: "700",
          lineHeight: 22,
        }
      : {
          alignSelf: "center",
          color: "white",
          fontSize: 14,
          fontWeight: "700",
          lineHeight: 22,
        };
  return (
    <View style={chipStyle}>
      <AppText style={textStyle}>{label}</AppText>
    </View>
  );
}
