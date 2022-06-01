import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import AppText from "../components/Text";

export default function ChatList({ data, callBack }) {
  const handleClickCard = () => {};
  return (
    <View style={styles.area}>
      {([...data, ...data] || []).map((prop, key) => {
        return (
          <TouchableOpacity onPress={handleClickCard}>
            <View style={styles.form}>
              <View
                style={{
                  flex: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/delivery-boy.png")}
                />
              </View>
              <View
                style={{ flex: 8, marginLeft: 10, justifyContent: "center" }}
              >
                <AppText style={styles.name}>Shipper</AppText>
                <AppText style={styles.text}>Where are you bro?</AppText>
              </View>
              <View style={{ flex: 2 }}>
                <AppText style={styles.time}>3m ago</AppText>
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
    backgroundColor: "tomato",
    width: 60,
    height: 60,
    borderRadius: 50,
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
