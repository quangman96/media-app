import React from "react";
import {
  Keyboard, KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
export default function KeyBoardAvoidingWrapper({ children }) {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
