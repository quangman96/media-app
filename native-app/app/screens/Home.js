import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import React from "react";
import * as MOCK from "../mock/data";

export default function Home() {
  const TEST = MOCK.list;

  return (
    <KeyBoardAvoidingWrapper>
      <Screen style={{ backgroundColor: "#EEF1F4" }}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
        </View>
        <CardList data={TEST}></CardList>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 130,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -10,
  },
  body: {
    alignItems: "center",
    margin: 20,
  },
  title: {
    color: "#667080",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 40,
    marginLeft: 20,
  },
});
