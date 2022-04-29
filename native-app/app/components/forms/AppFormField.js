import React from "react";
import AppTextInput from "../TextInput";
import AppText from "../Text";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";

export default function AppFormField({
  name,
  label,
  width,
  position,
  top,
  style,
  initValues,
  ...otherProps
}) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
  const props = { ...otherProps, width };
  return (
    <View style={{ width: width ? width : "100%" }}>
      <AppText style={styles.label}>{label}</AppText>
      <AppTextInput
        children={initValues}
        style={style}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...props}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
  },
});