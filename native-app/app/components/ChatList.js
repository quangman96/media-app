import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import AppText from "../components/Text";
import { setChatTitle } from "../../firebase";

export default function ChatList({ data, profile }) {
  const navigation = useNavigation();
  const handleClickCard = (prop) => {
    setChatTitle(prop.name);
    setTimeout(() => {
      navigation.navigate("ChatDetail", { data: prop, profile });
    }, 0);
  };
  return (
    <View style={styles.area}>
      {(data || []).map((prop, key) => {
        return (
          <TouchableOpacity onPress={() => handleClickCard(prop)}>
            <View style={styles.form}>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Image style={styles.avatar} source={{ uri: prop.avatar }} />
              </View>
              <View
                style={{ flex: 7, marginLeft: 10, justifyContent: "center" }}
              >
                <AppText numberOfLines={1} style={styles.name}>
                  {prop.name || prop.email}
                </AppText>
                <AppText numberOfLines={1} style={styles.text}>
                  {prop.lastMessage}
                </AppText>
              </View>
              <View style={{ flex: 3 }}>
                <AppText style={styles.time}>{prop.time}</AppText>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    width: "100%",
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
  avatar: {
    backgroundColor: "whitesmoke",
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "thistle",
  },
  name: {
    color: "#667080",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 30,
    marginBottom: 10,
  },
  text: {
    color: "#667080",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 15,
  },
  time: {
    color: "#F6CA56",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 15,
  },
});
