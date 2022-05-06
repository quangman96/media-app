import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Card from "./Card";

export default function CardList({ data }) {
  const handleClick = (prop) => {
    console.log(prop["title"]);
  };
  return (
    <View style={styles.body}>
      {(data || []).map((prop, key) => {
        return (
          // <TouchableOpacity key={key} onPress={() => handleClick(prop)}>
          <Card key={key} cardObj={prop}></Card>
          // </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    margin: 20,
  },
});
