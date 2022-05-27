import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    fontFamily: Platform.OS === "android" ? "Inter" : "Inter",
  },
};
