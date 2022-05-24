import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Card from "./Card";
import AppText from "../components/Text";

export default function CardList({
  data,
  isSavedPage = false,
  isMyListPage = false,
  callBack,
  ...rest
}) {
  return (
    <View style={styles.body}>
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={({ item }) => (
          <Card
            isSavedPage={isSavedPage}
            isMyListPage={isMyListPage}
            cardObj={item}
            callBack={callBack}
          ></Card>
        )}
        keyExtractor={(item) => item.id}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  flatList: {
    width: "100%",
  },
});
