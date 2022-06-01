import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: "relative",
    paddingTop: 10,
    paddingBottom: 0,
    flex: 1,
  },
  view: {
    position: "relative",
    flex: 1,
  },
});
