import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import Card from "./Card";

export default function CardList({
  data,
  isSavedPage = false,
  isMyListPage = false,
  callBack
}) {
  return (
    <View style={styles.body}>
      {(data || []).map((prop, key) => {
        return (
          <Card
            isSavedPage={isSavedPage}
            isMyListPage={isMyListPage}
            key={key}
            cardObj={prop}
            callBack={callBack}
          ></Card>
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
