import React, { useState, useCallback, useEffect } from "react";
import { Bubble, Time, GiftedChat, Send } from "react-native-gifted-chat";
import { Feather } from "@expo/vector-icons";
import {
  firebaseSet,
  firebaseDatabase,
  firebaseDatabaseRef,
  onValue,
} from "../../firebase";

export default function ChatDetail({ route }) {
  const data = route?.params?.data;
  const myProfile = route?.params?.profile;
  const { uid, email, displayName, photoURL } = myProfile;
  const { id, name, avatar } = data;
  const [messages, setMessages] = useState([]);
  const folder = uid > id ? `${uid}-${id}` : `${id}-${uid}`;

  useEffect(() => {
    onValue(
      firebaseDatabaseRef(firebaseDatabase, `chats/${folder}`),
      (snapshot) => {
        if (snapshot.exists()) {
          const values = snapshot.val();
          setMessages(
            Object.values(values)
              .map((e) => {
                return { ...e, createdAt: new Date(e?.createdAt) };
              })
              .sort((y, z) => z.createdAt - y.createdAt)
          );
        } else {
          console.log(`no data`);
        }
      }
    );
  }, []);

  const onSend = useCallback((messages = []) => {
    const path = `chats/${folder}/${new Date().getTime()}`;
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    firebaseSet(firebaseDatabaseRef(firebaseDatabase, path), {
      ...messages[0],
      createdAt: new Date().getTime(),
    });
  }, []);

  const renderBubble = (props) => {
    return <Bubble {...props} />;
  };

  return (
    <GiftedChat
      messages={messages}
      alwaysShowSend={true}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: "#667080",
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "400",
                marginTop: 10,
                marginLeft: 15,
              },
              left: {
                color: "#667080",
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "400",
                marginTop: 10,
                marginRight: 15,
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: "rgba(3, 134, 208, 0.15)",
                marginBottom: 5,
                borderWidth: 1,
                borderColor: "rgba(102, 112, 128, 0.1)",
                borderBottomRightRadius: 0,
              },
              left: {
                backgroundColor: "white",
                marginBottom: 5,
                borderWidth: 1,
                borderColor: "rgba(102, 112, 128, 0.1)",
                borderBottomLeftRadius: 0,
              },
            }}
          />
        );
      }}
      renderTime={(props) => {
        return (
          <Time
            {...props}
            timeTextStyle={{
              left: {
                color: "#667080",
              },
              right: {
                color: "#667080",
              },
            }}
          />
        );
      }}
      renderSend={(props) => {
        return (
          <Send
            {...props}
            containerStyle={{
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginRight: 15,
            }}
          >
            <Feather name="send" size={24} color="#667080" />
          </Send>
        );
      }}
      user={{
        _id: id,
        name: email,
        avatar: photoURL,
      }}
    />
  );
}
