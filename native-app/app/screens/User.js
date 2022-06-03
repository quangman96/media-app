import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as Yup from "yup";
import {
  auth,
  createUser,
  getMasterData,
  getUserProfile,
  updateOne,
  uploadFileAsync,
  firebaseDatabase,
  firebaseDatabaseRef,
  firebaseSet,
} from "../../firebase";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import Screen from "../components/Screens";
import AppText from "../components/Text";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required().label("Name"),
  address: Yup.string().required().label("Address"),
  dob: Yup.string().required().label("Date of birth"),
  gender: Yup.string().required().label("Gender"),
});

export default function User({ route, navigation }) {
  const type = route?.params?.type;
  const email = auth.currentUser?.email;
  const userId = auth.currentUser?.uid;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("MALE");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({
    name: "",
    dob: new Date(),
    gender: "MALE",
    email,
    address: "",
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    async function getData() {
      const res = await getUserProfile();
      const genderList = await getMasterData("GENDER");
      const newList = (genderList || []).map((e) =>
        Object.assign({
          id: e["id"],
          label: e["name"],
          value: e["code"],
        })
      );
      setItems(newList);
      if (res.length > 0) {
        const data = (res || [])[0];
        const genderCode = getGenderCode(genderList, data["gender"]);
        setValue(genderCode);
        setDate(new Date(+data["dob"]));
        setUser({
          id: data["id"],
          name: data["name"],
          email: data["email"],
          address: data["address"],
          avatar: data["avatar"],
          dob: converTime(+data["dob"]),
          gender: genderCode,
        });
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
    getData();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      setImageLoading(true);
      if (!result.cancelled) {
        uploadFileAsync(result.uri, handleUpload);
      } else {
        setImageLoading(false);
      }
    } catch (e) {
      setImageLoading(false);
    }
  };

  const handleUpload = (result) => {
    if (result) {
      setUser({ ...user, avatar: result });
    }
    setImageLoading(false);
  };

  // const afterUpload

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
    const genderCode = items.find((item) => item.value === value)["id"];
    const obj = {
      name: values["name"],
      address: values["address"],
      email: values["email"],
      avatar: user["avatar"],
      dob: new Date(date).getTime(),
      gender: genderCode,
    };

    if (values["id"]) {
      obj["id"] = values["id"];
      updateOne("user_profile", obj);
    } else {
      obj["user_id"] = userId;
      createUser(obj);
    }
    firebaseSet(firebaseDatabaseRef(firebaseDatabase, `users/${userId}`), {
      email: values["email"],
      name: values["name"] || "",
      avatar: user["avatar"],
    });
    ToastAndroid.show("Update profile successfully !!!", ToastAndroid.SHORT);
    if (type === 1) {
      setTimeout(() => {
        navigation.navigate("Main", { screen: "Home" });
      }, 200);
    }
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

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          style={{ opacity: 0.5 }}
          animating={true}
          size={70}
          color="tomato"
        />
      </View>
    );
  } else {
    return (
      <KeyBoardAvoidingWrapper>
        <Screen
          style={{
            height: "100%",
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
          <View style={styles.body}>
            <AppForm
              initialValues={user}
              onSubmit={(values) => handleUpdate(values)}
              validationSchema={validationSchema}
            >
              <TouchableOpacity onPress={pickImage}>
                {isImageLoading && (
                  <View style={[styles.avatar, styles.horizontal]}>
                    <ActivityIndicator
                      size={70}
                      style={{ opacity: 0.5 }}
                      animating={true}
                      color="tomato"
                    />
                  </View>
                )}
                {!isImageLoading && (
                  <Image
                    style={styles.avatar}
                    source={
                      user["avatar"]
                        ? {
                            uri: user["avatar"],
                          }
                        : require("../../assets/images/user.png")
                    }
                  />
                )}
              </TouchableOpacity>
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
                <View style={styles.dropdown}>
                  <AppText style={styles.label}>Gender</AppText>
                  <DropDownPicker
                    style={{
                      borderColor: "#979797",
                    }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode="SCROLLVIEW"
                  />
                </View>
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
                editable={false}
                fade={true}
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
    );
  }
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
    width: 120,
    height: 120,
    marginBottom: 20,
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  dropdown: {
    width: 100,
  },
  label: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 10,
  },
});
