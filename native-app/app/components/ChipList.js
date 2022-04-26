import { StyleSheet, View } from "react-native";
import Chip from "./Chip";
import React from "react";

export default function ChipList({ data }) {
  return (
    <View style={styles.body}>
      {(data || []).map((prop, key) => {
        return <Chip key={key} label={prop["name"]}></Chip>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
  },
});
