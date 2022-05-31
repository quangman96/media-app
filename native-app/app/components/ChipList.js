import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Chip from "./Chip";

export default function ChipList({
  data,
  size = "small",
  customStyles,
  isFull = false,
}) {
  return (
    <View style={[styles.body, customStyles]}>
      {(data || []).map((prop, key) => {
        return isFull ? (
          <TouchableOpacity disabled={false}>
            <Chip
              key={key}
              size={size}
              theme={prop["theme"]}
              label={prop["name"] || prop["label"] || prop}
            ></Chip>
          </TouchableOpacity>
        ) : (
          key < 4 && (
            <TouchableOpacity disabled={false}>
              <Chip
                key={key}
                size={size}
                theme={prop["theme"]}
                label={prop["name"] || prop["label"] || prop}
              ></Chip>
            </TouchableOpacity>
          )
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
  },
});
