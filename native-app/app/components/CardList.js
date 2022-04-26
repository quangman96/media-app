import { StyleSheet, View } from "react-native";
import React from "react";
import Card from "./Card";

export default function CardList({ data }) {
  return (
    <View style={styles.body}>
      {(data || []).map((prop, key) => {
        return <Card key={key} cardObj={prop}></Card>;
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
