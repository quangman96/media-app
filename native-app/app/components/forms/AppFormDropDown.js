import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AppText from "../Text";

export default function AppFormDropDown({
  label,
  style,
  styleView,
  value,
  items,
  errors,
  width,
  ...otherProps
}) {
  const [open, setOpen] = useState(false);
  const [valueDropDown, setValueDropDown] = useState(value);
  const [itemsDropDown, setItemsDropDown] = useState(items);

  useEffect(() => {
    (() => {
        setValueDropDown(value);
    })();
  }, [value]);

  return (
    <View style={styleView}>
      <AppText style={styles.label}>{label}</AppText>
      <DropDownPicker
        style={style}
        open={open}
        value={valueDropDown}
        items={itemsDropDown}
        setOpen={setOpen}
        setValue={setValueDropDown}
        setItems={setItemsDropDown}
        {...otherProps}
      />
      <AppText style={errors ? styles.error : styles.hidden}>{errors}</AppText>
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
  error: {
    color: "red",
    marginTop: 8,
    marginBottom: -10,
  },
  hidden: {
    display: "none",
  },
});
