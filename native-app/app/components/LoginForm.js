import { StyleSheet, View } from "react-native";
import React from "react";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import * as Yup from "yup";
import { AppText } from "../components/Text";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).max(12).label("Password"),
});

export default function LoginForm() {
  return (
    <AppText>zxc</AppText>
    // <AppForm
    //   initialValues={{ email: "", password: "" }}
    //   onSubmit={(values) => {
    //     handleLogin(values);
    //   }}
    //   validationSchema={validationSchema}
    // >
    //   <AppFormField
    //     icon="mail"
    //     autoCapitalize="none"
    //     autoCorrect={false}
    //     keyboardType="email-address"
    //     name="email"
    //     placeholder="Email address"
    //     textContentType="emailAddress"
    //   />
    //   <AppFormField
    //     icon="eye"
    //     name="password"
    //     placeholder="Password"
    //     secureTextEntry={true}
    //     textContentType="password"
    //   />
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       paddingTop: 10,
    //       paddingBottom: 15,
    //     }}
    //   >
    //     <AppText
    //       style={{
    //         ...styles.text2,
    //         color: "#667080",
    //         flex: 1,
    //       }}
    //     >
    //       Remember password
    //     </AppText>
    //     <AppText
    //       style={{
    //         ...styles.text2,
    //         color: "#0386D0",
    //       }}
    //     >
    //       Forgot password
    //     </AppText>
    //   </View>

    //   <SubmitButton title="Login" />
    // </AppForm>
  );
}

const styles = StyleSheet.create({});
