import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import * as MOCK from "../mock/data";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../firebase";

export default function Saved(props) {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((e) => console.log(e));
  };
  const TEST = MOCK.saved;

  return (
    <KeyBoardAvoidingWrapper>
      <Screen style={{ backgroundColor: "#EEF1F4" }}>
        <View style={styles.header}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Saved</Text>
            <TouchableOpacity
              onPress={handleSignOut}
              style={{
                alignSelf: "flex-end",
                marginRight: 20,
              }}
            >
              {<Feather name={"log-out"} size={30} color={"#0386D0"} />}
            </TouchableOpacity>
          </View>
        </View>
        <CardList data={TEST}></CardList>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 100,
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
