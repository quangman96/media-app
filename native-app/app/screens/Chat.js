import {
  StyleSheet,
  View,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  auth,
  firebaseDatabase,
  firebaseDatabaseRef,
  onValue,
  getLastMessage,
} from "../../firebase";
import Screen from "../components/Screens";
import ChatList from "../components/ChatList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import HorizontalList from "../components/HorizontalList";
import moment from "moment";
import AppText from "../components/Text";

export default function Chat({ value }) {
  const uid = auth.currentUser?.uid;
  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [myProfile, setMyprofile] = useState(null);
  const [text, onChangeText] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  useEffect(() => {
    onValue(
      firebaseDatabaseRef(firebaseDatabase, "users"),
      async (snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          const arrUsers = [];
          for (const id in values) {
            if (id !== uid) {
              const folder = uid > id ? `${uid}-${id}` : `${id}-${uid}`;
              const objMessage = await getLastMessage(folder);
              const lastMessage = objMessage
                ? objMessage["user"]["_id"] === id
                  ? `You: ${objMessage["text"]}`
                  : objMessage["text"]
                : "";
              const obj = values[id];
              arrUsers.push({
                id,
                avatar: obj["avatar"],
                name: obj["name"],
                email: obj["email"],
                lastMessage,
                time: objMessage?.createdAt
                  ? moment(objMessage.createdAt).fromNow() || ""
                  : "",
                createdAt: objMessage?.createdAt,
                numberOfUnreadMessages: 0,
              });
            } else {
              const obj = values[id];
              setMyprofile({
                uid: id,
                photoURL: obj["avatar"],
                displayName: obj["name"],
                email: obj["email"],
                numberOfUnreadMessages: 0,
              });
            }
          }
          // uid, email, displayName, photoURL
          setUsers(arrUsers);
          setChatUsers(
            arrUsers
              .filter((e) => e.lastMessage)
              .sort((a, b) => b.createdAt - a.createdAt)
          );
          setIsLoading(false);
        }
      }
    );
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
          <View style={[styles.search, { width: width - 20 }]}>
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

          <HorizontalList
            data={users}
            type={1}
            profile={myProfile}
          ></HorizontalList>
          <Screen style={{ width: "100%", backgroundColor: "#EEF1F4" }}>
            <ChatList data={chatUsers} profile={myProfile}></ChatList>
            {chatUsers.length === 0 && (
              <AppText style={styles.noText}>
                Please choose a friend to start the conversation
              </AppText>
            )}
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
  noText: {
    color: "#0386D0",
    marginLeft: 15,
    fontSize: 15,
    marginTop: 10,
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
