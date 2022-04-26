import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import AppText from "./Text";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        placeholderTextColor={defaultStyles.colors.placeholder}
        style={{ ...defaultStyles.text, width: "85%" }}
        {...otherProps}
      />
      {icon && (
        <Feather
          name={icon}
          size={25}
          color={defaultStyles.colors.icon}
          style={styles.icon}
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
  icon: {
    position: "absolute",
    alignSelf: "center",
    right: 0,
    marginRight: 10,
  },
});

export default AppTextInput;
