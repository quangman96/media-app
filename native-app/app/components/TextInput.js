import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

export default function AppTextInput({
  icon,
  width = "100%",
  style = "right",
  editable = true,
  fade = false,
  height = 48,
  multiline = false,
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
      ? { ...defaultStyles.text, width: "85%", textAlignVertical : multiline ? "top" : "center" }
      : { ...defaultStyles.text, width: "85%", marginLeft: 30, textAlignVertical : multiline ? "top" : "center" };

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor: fade ? "whitesmoke" : defaultStyles.colors.white
        },
      ]}
    >
      <TextInput
        editable={editable}
        placeholderTextColor={defaultStyles.colors.placeholder}
        style={textStyle}
        multiline={multiline}
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
