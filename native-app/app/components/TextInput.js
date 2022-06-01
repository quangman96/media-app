import { Feather } from "@expo/vector-icons";
import React, { createRef, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import defaultStyles from "../config/styles";

export default function AppTextInput({
  icon,
  width = "100%",
  style = "right",
  editable = true,
  fade = false,
  height = 48,
  multiline = false,
  reset = false,
  ...otherProps
}) {
  const refTextInput = createRef();
  useEffect(() => {
    if (reset) refTextInput.current.clear();
  }, [reset]);

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

  const textMultiLineStyle = [
    textStyle,
    { textAlignVertical: "top", paddingTop: 5, paddingBottom: 5 },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          backgroundColor: fade ? "whitesmoke" : defaultStyles.colors.white,
        },
      ]}
    >
      <TextInput
        ref={refTextInput}
        editable={editable}
        placeholderTextColor={defaultStyles.colors.placeholder}
        style={multiline ? textMultiLineStyle : textStyle}
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
