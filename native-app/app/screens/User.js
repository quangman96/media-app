import React, { useState, useEffect } from "react";
import Screen from "../components/Screens";
import { Feather } from "@expo/vector-icons";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/core";
import { auth, getAll, getMasterData, updateOne } from "../../firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required().label("Name"),
  address: Yup.string().required().label("Address"),
  dob: Yup.string().required().label("Date of birth"),
  gender: Yup.string().required().label("Gender"),
});

export default function User() {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
  });
  const converTime = (time) => {
    const date = new Date(+time);
    return (
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
  };

  const getGenderCode = (list, id) => {
    const genderObj = (list || []).find((obj) => obj.id === id);
    return genderObj ? genderObj["code"] : "";
  };

  const handleUpdate = (values) => {
    const obj = {
      id: values["id"],
      name: values["name"],
      address: values["address"],
      email: values["email"],
    };
    updateOne("user_profile", obj);
  };

  useEffect(() => {
    async function getData() {
      const res = await getAll("user_profile");
      const genderList = await getMasterData("GENDER");
      const data = (res || [])[0];
      setDate(new Date(+data["dob"]));
      setUser({
        id: data["id"],
        name: data["name"],
        email: data["email"],
        address: data["address"],
        avatar: data["avatar"],
        dob: converTime(+data["dob"]),
        gender: getGenderCode(genderList, data["gender"]),
      });
    }
    getData();
  }, []);

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((e) => console.log(e));
  };

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setDatePicker(false);
    if (value) {
      setDate(value);
    }
  }

  return (
    user.name !== "" && (
      <KeyBoardAvoidingWrapper>
        <Screen
          style={{
            backgroundColor: "white",
            height: "100%",
            // marginTop: 10,
          }}
        >
          {datePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              is24Hour={true}
              onChange={onDateSelected}
            />
          )}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity
              onPress={handleSignOut}
              style={{
                alignSelf: "flex-end",
                marginRight: 20,
              }}
            >
              {<Feather name={"log-out"} size={30} color={"#0386D0"} />}
            </TouchableOpacity>
          </View> */}
          <View style={styles.body}>
            <AppForm
              initialValues={user}
              onSubmit={(values) => handleUpdate(values)}
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
                initValues={user["name"]}
              />

              <View style={styles.inline}>
                <TouchableOpacity onPress={showDatePicker}>
                  <AppFormField
                    editable={false}
                    label="Date of birth"
                    width={200}
                    position="absolute"
                    icon="chevron-down"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="dob"
                    placeholder="Date of birth"
                    initValues={converTime(date)}
                  />
                </TouchableOpacity>
                <AppFormField
                  editable={false}
                  width={100}
                  label="Gender"
                  position="absolute"
                  icon="chevron-down"
                  autoCapitalize="none"
                  autoCorrect={false}
                  name="gender"
                  placeholder="Gender"
                  initValues={user["gender"]}
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
                initValues={user["email"]}
              />

              <AppFormField
                label="Address"
                autoCapitalize="none"
                autoCorrect={false}
                name="address"
                placeholder="Address"
                initValues={user["address"]}
              />
              <View style={{ padding: 10 }}></View>
              <SubmitButton title="Update profile" />
              <View style={{ paddingBottom: 30 }}></View>
            </AppForm>
          </View>
        </Screen>
      </KeyBoardAvoidingWrapper>
    )
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
