import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "./Text";

function Chip({ label, ...otherProps }) {
  return (
    <View style={styles.chip}>
      <AppText style={styles.text}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 24,
    borderRadius: 20,
    backgroundColor: "#EEF1F4",
    marginBottom: 5,
    marginRight: 5,
    marginTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
  text: {
    alignSelf: "center",
    color: "#667080",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 22,
  },
});

export default Chip;
