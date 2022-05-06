import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Screen from "../components/Screens";
import { Feather } from "@expo/vector-icons";
import CardList from "../components/CardList";
import ChipList from "../components/ChipList";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/Text";
import AppFormField from "../components/forms/AppFormField";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import React from "react";
import * as MOCK from "../mock/data";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../firebase";

const validationSchema = Yup.object().shape({});

export default function Search() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((e) => console.log(e));
  };
  const TEST = MOCK.list;
  const result = TEST.length;
  return (
    <KeyBoardAvoidingWrapper>
      <Screen style={{ backgroundColor: "#EEF1F4" }}>
        {/* <View style={styles.header}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Explore</Text>
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
          <View style={styles.search}>
            <AppForm
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) =>
                navigation.navigate("Main", { screen: "User" })
              }
              validationSchema={validationSchema}
            >
              <AppFormField
                style="left"
                icon="search"
                autoCapitalize="none"
                autoCorrect={false}
                name="keyword"
                placeholder="Enter the keywords"
              />
            </AppForm>
          </View>
          <View style={{ marginLeft: 20, marginBottom: 10 }}>
            <ChipList data={TEST[0]["category"]}></ChipList>
          </View>
        </View> */}
        <View style={styles.result}>
          <AppText>Result: {result}</AppText>
        </View>
        <CardList data={TEST}></CardList>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -10,
  },
  search: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: -10,
  },
  body: {
    alignItems: "center",
    margin: 20,
  },
  result: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: -10,
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
