import React from "react";
import { StyleSheet, Image, Dimensions, View, Text } from "react-native";
import Screen from "../components/Screens";
import * as Yup from "yup";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import AppText from "../components/Text";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).label("Password"),
});
function Login(props) {
  return (
    <KeyBoardAvoidingWrapper>
      <Screen>
        <View
          style={{
            height: Dimensions.get("window").height,
          }}
        >
          <View
            style={{
              padding: 30,
              alignItems: "center",
            }}
          >
            <AppText
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: "rgba(102, 112, 128, 1)",
                lineHeight: 36,
                paddingBottom: 20,
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
            <AppForm
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <AppText
                  style={{
                    ...styles.tab,
                    color: "rgba(246, 202, 86, 1)",
                    marginRight: 58,
                    textDecorationLine: "underline",
                  }}
                >
                  Login
                </AppText>
                <AppText
                  style={{
                    ...styles.tab,
                    color: "rgba(102, 112, 128, 0.3)",
                    marginBottom: 30,
                  }}
                >
                  Register
                </AppText>
              </View>
              <AppFormField
                icon="mail"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                placeholder="Email address"
                textContentType="emailAddress"
              />
              <View style={{ padding: 10 }}></View>
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
              >
                <AppText
                  style={{
                    ...styles.text2,
                    color: "#667080",
                    flex: 1,
                  }}
                >
                  Remember password
                </AppText>
                <AppText
                  style={{
                    ...styles.text2,
                    color: "#0386D0",
                  }}
                >
                  Forgot password
                </AppText>
              </View>

              <SubmitButton title="Login" />
            </AppForm>
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
    // position: "absolute",
    height: 250,
    // bottom: 0,
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

export default Login;
