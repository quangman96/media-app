import { useFormikContext } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../Text";
import AppTextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

export default function AppFormField({
  name,
  label,
  width,
  position,
  top,
  style,
  initValues,
  editable,
  customErrors,
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
        editable={editable}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...props}
      />
      <ErrorMessage
        error={errors[name] ? errors[name] : customErrors}
        visible={touched[name]}
      />
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
