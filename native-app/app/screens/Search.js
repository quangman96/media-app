import { StyleSheet, Text, View } from "react-native";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import React from "react";
import * as MOCK from "../mock/data";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

export default function Search() {
  const TEST = MOCK.list;

  return (
    <KeyBoardAvoidingWrapper>
      <Screen style={{ backgroundColor: "#EEF1F4" }}>
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>

          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) =>
              navigation.navigate("Main", { screen: "User" })
            }
            validationSchema={validationSchema}
          >
            <AppFormField
              icon="search"
              autoCapitalize="none"
              autoCorrect={false}
              name="keyword"
              placeholder="Enter the keywords"
              textContentType="keyword"
            />
          </AppForm>
        </View>
        <CardList data={TEST}></CardList>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 180,
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
