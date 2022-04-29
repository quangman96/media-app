import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

export default function AppTextInput({
  icon,
  width = "100%",
  style = "right",
  ...otherProps
}) {
  const iconStyle =
    style === "right"
      ? { position: "absolute", alignSelf: "center", right: 0, marginRight: 10 }
      : {
          position: "absolute",
          alignSelf: "center",
          left: 10,
          marginRight: 10,
        };

  const textStyle =
    style === "right"
      ? { ...defaultStyles.text, width: "85%" }
      : { ...defaultStyles.text, width: "85%", marginLeft: 30 };

  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={defaultStyles.colors.placeholder}
        style={textStyle}
        {...otherProps}
      />
      {icon && (
        <Feather
          name={icon}
          size={25}
          color={defaultStyles.colors.icon}
          style={iconStyle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    position: "relative",
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    marginVertical: 10,
    borderColor: "#979797",
    borderWidth: 1,
    paddingLeft: 15,
  },
});
