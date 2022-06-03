import * as Analytics from "expo-firebase-analytics";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { auth, getAll, getUserProfile } from "../../firebase";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import Screen from "../components/Screens";
import AppText from "../components/Text";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).label("Password"),
});

export default function Login({ navigation }) {
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [initValues, setinitValues] = useState({
    email: "",
    password: "",
  });
  const onPressLogin = () => setPage(0);
  const onPressRegister = () => setPage(1);

  const showToast = (type) => {
    if (type === "login") {
      ToastAndroid.show("Login successfully !!!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Register successfully !!!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    async function getData() {
      const res = await getAll("user_profile");
      setUser(res);
    }
    getData();
  }, []);

  const handleSignUp = (values) => {
    const { email, password } = values;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { uid, email } = userCredential.user;
        Analytics.logEvent("sign_up", { uid, email, time: new Date() });

        setinitValues(values);
        setPage(0);
        showToast("register");
      })
      .catch((error) => console.log(error.message));
  };

  const handleLogin = (values) => {
    const { email, password } = values;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        showToast("login");
        const { uid, email } = userCredential.user;
        Analytics.logEvent("login", { uid, email, time: new Date() });
        getUserProfile().then((res) => {
          if (res.length === 0) {
            navigation.navigate("NewProfile", { type: 1 });
          } else {
            navigation.navigate("Main", { screen: "Home" });
          }
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <KeyBoardAvoidingWrapper>
      <Screen>
        <View style={{ flex: 1 }}>
          <View
            style={{
              padding: 30,
              alignItems: "center",
              position: "relative",
            }}
          >
            <AppText
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: "rgba(102, 112, 128, 1)",
                lineHeight: 36,
                paddingBottom: 15,
              }}
            >
              Login
            </AppText>
            <AppText style={styles.text}>
              By signing in you are agreeing
            </AppText>
            <AppText style={{ ...styles.text, marginBottom: 30 }}>
              our Term and privacy lolicy
            </AppText>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={onPressLogin}>
                <AppText
                  style={{
                    ...styles.tab,
                    color:
                      page === 0
                        ? "rgba(246, 202, 86, 1)"
                        : "rgba(102, 112, 128, 0.3)",
                    marginRight: 58,
                    textDecorationLine: page === 0 ? "underline" : "none",
                  }}
                >
                  Login
                </AppText>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressRegister}>
                <AppText
                  style={{
                    ...styles.tab,
                    color:
                      page === 1
                        ? "rgba(246, 202, 86, 1)"
                        : "rgba(102, 112, 128, 0.3)",
                    marginBottom: 10,
                    textDecorationLine: page === 1 ? "underline" : "none",
                  }}
                >
                  Register
                </AppText>
              </TouchableOpacity>
            </View>
            {page === 0 && (
              <AppForm
                initialValues={initValues}
                onSubmit={(values) => {
                  handleLogin(values);
                }}
                validationSchema={validationSchema}
              >
                <AppFormField
                  icon="mail"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email address"
                  textContentType="emailAddress"
                  initValues={initValues["email"]}
                />
                <AppFormField
                  icon="eye"
                  name="password"
                  placeholder="Password"
                  secureTextEntry={true}
                  textContentType="password"
                  initValues={initValues["password"]}
                />
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 15,
                  }}
                ></View>

                <SubmitButton title="Login" />
                <View style={{ marginBottom: 25 }}></View>
              </AppForm>
            )}
            {page === 1 && (
              <AppForm
                initialValues={initValues}
                onSubmit={(values) => {
                  handleSignUp(values);
                }}
                validationSchema={validationSchema}
              >
                <AppFormField
                  icon="mail"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email address"
                  textContentType="emailAddress"
                />
                <AppFormField
                  icon="eye"
                  name="password"
                  placeholder="Password"
                  secureTextEntry={true}
                  textContentType="password"
                />
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 15,
                  }}
                ></View>

                <SubmitButton title="Register" />
                <View style={{ marginBottom: 25 }}></View>
              </AppForm>
            )}
          </View>
          <Image
            resizeMode="stretch"
            style={styles.footer}
            source={require("../../assets/images/footer.png")}
          />
        </View>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    height: 260,
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#667080",
    lineHeight: 22,
  },
  text2: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
  },
  tab: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgba(246, 202, 86, 1)",
    lineHeight: 30,
  },
});
