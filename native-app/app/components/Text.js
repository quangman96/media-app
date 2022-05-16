import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

export default function AppText({
  children,
  style,
  numberOfLines = 99999,
  ...otherProps
}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[defaultStyles.text, style]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
