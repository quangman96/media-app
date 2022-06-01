import {
  StyleSheet,
  View,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { getAll } from "../../firebase";
import Screen from "../components/Screens";
import ChatList from "../components/ChatList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";

export default function Chat({ value }) {
  const [userList, setUserList] = useState([]);
  const [text, onChangeText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    async function getUserList() {
      const data = await getAll("user_profile");
      setUserList(data);
    }
    getUserList();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.center, styles.horizontal]}>
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
        <View style={styles.container}>
          <View style={[styles.search, { width: width - 40 }]}>
            <Feather
              style={styles.icon}
              name={"search"}
              size={25}
              color={"#979797"}
            />
            <TextInput
              style={{ width: width - 100 }}
              onChangeText={onChangeText}
              value={text}
              placeholder={"Search"}
            />
          </View>

          <Screen style={{ width: "100%", backgroundColor: "#EEF1F4" }}>
            <ChatList data={userList}></ChatList>
          </Screen>
        </View>
      </KeyBoardAvoidingWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  search: {
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: "white",
    position: "relative",
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    marginVertical: 10,
    borderColor: "#979797",
    borderWidth: 1,
    paddingLeft: 15,
    marginTop: 30,
  },
  icon: {
    marginTop: 10,
    marginRight: 10,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
