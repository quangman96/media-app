import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  setChatTitle,
  firebaseSet,
  firebaseDatabase,
  firebaseDatabaseRef,
  onValue,
  getLastMessage,
  getUserId,
} from "../../firebase";
import Screen from "../components/Screens";
import ChatList from "../components/ChatList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import HorizontalList from "../components/HorizontalList";
import moment from "moment";
import AppText from "../components/Text";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/core";

export default function Chat() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (flag = false) => {
    if (flag) {
      const temp = [...groupUsersDf];
      setGroupUsers(temp.map((e) => Object.assign({ ...e, checked: false })));
      onChangeGroupText([]);
      onChangeName([]);
    }
    setModalVisible(!isModalVisible);
  };
  const uid = getUserId();
  const [usersDf, setUsersDf] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatUsersDf, setChatUsersDf] = useState([]);
  const [chatUsers, setChatUsers] = useState([]);
  const [groupUsersDf, setGroupUsersDf] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [myProfile, setMyprofile] = useState(null);
  const [text, onChangeText] = useState([]);
  const [groupText, onChangeGroupText] = useState([]);
  const [name, onChangeName] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const { width } = useWindowDimensions();
  setChatTitle(groupName || "");
  const filterChatList = (text) => {
    if (!isDone) return;
    if (!text || Array.isArray(text)) {
      setUsers(usersDf);
      setChatUsers(chatUsersDf);
    } else {
      setUsers(
        usersDf.filter((e) =>
          (e.name || "").toLowerCase().includes(text.toLowerCase())
        )
      );
      setChatUsers(
        chatUsersDf.filter((e) =>
          (e.name || "").toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const filterUserChatList = (text) => {
    if (!isDone) return;
    if (!text || Array.isArray(text)) {
      setGroupUsers(groupUsersDf);
    } else {
      setGroupUsers(
        groupUsersDf.filter((e) =>
          (e.name || "").toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const isGroupValid = (id) => {
    return id.includes(uid);
  };

  useEffect(() => {
    onValue(
      firebaseDatabaseRef(firebaseDatabase, "users"),
      async (snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          const arrUsers = [];
          for (const id in values) {
            if (id !== uid) {
              const obj = values[id];
              if (obj["type"] === "group" && !isGroupValid(id)) {
                continue;
              }
              const folder =
                obj["type"] === "group"
                  ? id
                  : uid > id
                  ? `${uid}-${id}`
                  : `${id}-${uid}`;
              const objMessage = await getLastMessage(folder);
              const lastMessage = objMessage
                ? objMessage["user"]["_id"] ===
                  (obj.type === "group" ? uid : id)
                  ? `You: ${objMessage["text"]}`
                  : objMessage?.text
                : "";
              arrUsers.push({
                id,
                avatar: obj["avatar"],
                avatar1: obj["avatar1"],
                avatar2: obj["avatar2"],
                name: obj["name"],
                email: obj["email"],
                type: obj["type"],
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
          const data = arrUsers
            .filter((e) => e.lastMessage)
            .sort((a, b) => b.createdAt - a.createdAt);
          setUsers(arrUsers);
          setUsersDf(arrUsers);
          setChatUsers(data);
          setChatUsersDf(data);
          const temp = arrUsers
            .filter((z) => z.type !== "group")
            .map((e) => Object.assign({ ...e, checked: false }));
          setGroupUsersDf(temp);
          setGroupUsers(temp);
          setIsLoading(false);
          setIsDone(true);
        }
      }
    );
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterChatList(text);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterUserChatList(groupText);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [groupText]);

  const handleAddUser = (index) => {
    const temp = [...groupUsers];
    temp[index]["checked"] = !temp[index]["checked"];
    setGroupUsers(temp);
  };

  const getColor = () => {
    const isValid = groupUsers.some((e) => e.checked);
    if (isValid) {
      return "#0386D0";
    }
    return "#979797";
  };

  const handleClickButtonCreateGroup = () => {
    const arr = [];
    groupUsers.forEach((e) => e.checked && arr.push(e));
    if (arr.length > 0) {
      const obj = {
        user: arr,
        name: name && name.length > 0 ? name : "",
      };
      toggleModal();
      createNewGroup(obj);
    }
  };

  const getName = (obj) => {
    if (obj.name) {
      return obj.name;
    }
    return `${myProfile["displayName"]}, ${[...obj.user]
      .map((e) => e.name)
      .join(", ")}`;
  };

  const createNewGroup = (obj) => {
    const id = [...obj.user, { id: myProfile["uid"] }]
      .map((e) => e.id)
      .sort((a, b) => a.localeCompare(b))
      .join("-");

    const groupName = getName(obj);
    setGroupName(groupName);
    firebaseSet(firebaseDatabaseRef(firebaseDatabase, `users/` + id), {
      type: "group",
      name: groupName,
      avatar1: myProfile["photoURL"],
      avatar2: obj.user[0]["avatar"],
    });
    navigation.navigate("ChatDetail", {
      data: { id, type: "group" },
      profile: myProfile,
    });
  };

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
        <View>
          <View style={{ flex: 1 }}>
            <Modal
              isVisible={isModalVisible}
              style={{ margin: 0 }}
              onSwipeComplete={() => setModalVisible(false)}
              swipeDirection="bottom"
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={toggleModal}>
                    <AppText
                      style={[
                        styles.text,
                        { color: "#0386D0", marginLeft: 15, fontSize: 14 },
                      ]}
                    >
                      Cancel
                    </AppText>
                  </TouchableOpacity>
                  <AppText
                    style={[styles.text, { fontWeight: "bold", fontSize: 18 }]}
                  >
                    New Group
                  </AppText>
                  <TouchableOpacity onPress={handleClickButtonCreateGroup}>
                    <AppText
                      style={[
                        styles.text,
                        { color: getColor(), marginRight: 15, fontSize: 14 },
                      ]}
                    >
                      Create
                    </AppText>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ marginLeft: 15, marginBottom: -5, marginTop: 15 }}
                >
                  <TextInput
                    style={{ width: width - 100 }}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder={"Group name (optional)"}
                  />
                </View>
                <View
                  style={[
                    styles.search,
                    { marginLeft: 15, marginRight: 15, marginBottom: 15 },
                  ]}
                >
                  <Feather
                    style={styles.icon}
                    name={"search"}
                    size={25}
                    color={"#979797"}
                  />
                  <TextInput
                    style={{ width: width - 100 }}
                    onChangeText={onChangeGroupText}
                    value={groupText}
                    placeholder={"Search"}
                  />
                </View>

                <AppText
                  style={{
                    marginLeft: 15,
                    color: "#979797",
                    fontSize: 14,
                    marginBottom: 15,
                  }}
                >
                  Gợi ý
                </AppText>

                <ScrollView>
                  <View style={styles.area}>
                    {groupUsers.length === 0 && (
                      <AppText style={styles.noText}>No matching</AppText>
                    )}
                    {(groupUsers || []).map((prop, key) => {
                      return (
                        <TouchableOpacity onPress={() => handleAddUser(key)}>
                          <View style={styles.form}>
                            <View
                              style={{
                                flex: 2,
                                justifyContent: "center",
                                marginLeft: 15,
                              }}
                            >
                              <Image
                                style={styles.avatar}
                                source={{ uri: prop.avatar }}
                              />
                            </View>
                            <View
                              style={{
                                flex: 8,
                                marginLeft: 10,
                                justifyContent: "center",
                              }}
                            >
                              <AppText numberOfLines={1} style={styles.name}>
                                {prop.name || prop.email}
                              </AppText>
                            </View>
                            <View
                              style={{
                                flex: 2,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 50,
                                  borderWidth: prop.checked ? 0 : 2,
                                  borderColor: "rgba(102, 112, 128, 0.5);",
                                  backgroundColor: prop.checked
                                    ? "#0386D0"
                                    : "white",
                                  marginBottom: 15,
                                }}
                              ></View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </Modal>
          </View>
          <View style={styles.container}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <View style={[styles.search, { width: width - 20, flex: 4 }]}>
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
              <View
                style={{
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={toggleModal}>
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      marginTop: 10,
                      borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1.125,
                      borderColor: "#979797",
                      backgroundColor: "white",
                    }}
                  >
                    <AntDesign name="addusergroup" size={26} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
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
    marginTop: 20,
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
  avatar: {
    backgroundColor: "whitesmoke",
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "thistle",
  },
  text: {
    fontWeight: "400",
    lineHeight: 22,
  },
  form: {
    flexDirection: "row",
    position: "relative",
    width: "100%",
    minHeight: 80,
    flex: 1,
    marginBottom: 1,
    backgroundColor: "white",
    overflow: "hidden",
    textAlign: "center",
  },
  name: {
    color: "#667080",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 30,
    marginBottom: 10,
  },
});
