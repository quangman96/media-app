import React, { useState } from "react";
import Screen from "../components/Screens";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { Text, View, StyleSheet, Image } from "react-native";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  // email: Yup.string().required().email().label("Email"),
  // password: Yup.string().required().min(4).max(12).label("Password"),
});

function User(props) {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  return (
    <KeyBoardAvoidingWrapper>
      <Screen style={{ backgroundColor: "white" }}>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
          />
        )}
        <Text style={styles.title}>Profile</Text>
        <View style={styles.body}>
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) =>
              navigation.navigate("Main", { screen: "User" })
            }
            validationSchema={validationSchema}
          >
            <Image
              style={styles.avatar}
              source={require("../../assets/images/user.png")}
            />
            <AppFormField
              label="Name"
              autoCapitalize="none"
              autoCorrect={false}
              name="name"
              placeholder="Full name"
            />

            <View style={styles.inline}>
              <AppFormField
                label="Date of birth"
                width={200}
                position="absolute"
                icon="chevron-down"
                autoCapitalize="none"
                autoCorrect={false}
                name="dob"
                placeholder="Date of birth"
              />
              <AppFormField
                width={100}
                label="Gender"
                position="absolute"
                icon="chevron-down"
                autoCapitalize="none"
                autoCorrect={false}
                name="gender"
                placeholder="Gender"
              />
            </View>

            <AppFormField
              label="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder="Email address"
              textContentType="emailAddress"
            />

            <AppFormField
              label="Address"
              autoCapitalize="none"
              autoCorrect={false}
              name="address"
              placeholder="Address"
            />
            <View style={{ padding: 10 }}></View>
            <SubmitButton title="Update profile" />
          </AppForm>
        </View>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingRight: 30,
    paddingTop: 10,
    paddingLeft: 30,
    alignItems: "center",
  },
  title: {
    color: "#667080",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 30,
    marginLeft: 20,
  },
  inline: {
    position: "relative",
    width: "100%",
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default User;
