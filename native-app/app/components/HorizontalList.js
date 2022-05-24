import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import CustomCard from "./CustomCard";

export default function HorizontalList({ data }) {
  return (
    <View style={styles.body}>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={({ item }) => <CustomCard cardObj={item}></CustomCard>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    //margin: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});
