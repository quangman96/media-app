import React from "react";
import { StyleSheet, View, Image } from "react-native";
import AppText from "../components/Text";
import ChipList from "../components/ChipList";
import { FontAwesome } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function Card({ icon, cardObj }) {
  const image = `../../assets/images/${cardObj["image"]}`;
  return (
    <View style={styles.form}>
      <View style={styles.header}>
        <AppText style={styles.label}>{cardObj["label"]}</AppText>
        {
          <FontAwesome
            name={"bookmark"}
            size={24}
            color={
              !!cardObj["is_saved"] ? "#0386D0" : defaultStyles.colors.icon
            }
            style={styles.icon}
          />
        }
      </View>
      <View style={styles.body}>
        <AppText style={styles.description}>{cardObj["description"]}</AppText>
        <Image
          style={styles.image}
          source={require(`../../assets/images/pic.png`)}
        />
      </View>
      <View style={styles.footer}>
        <ChipList data={cardObj["category"]}></ChipList>
        <AppText style={styles.time}>2 days ago</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    position: "relative",
    width: "100%",
    // height: 150,
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    textAlign: "center",
  },
  header: {
    justifyContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  body: {
    flex: 2,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 30,
  },
  description: {
    flex: 3.5,
    color: "#667080",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 15,
  },
  image: {
    flex: 2,
    width: "100%",
    height: "100%",
  },
  icon: {
    alignSelf: "center",
  },
  time: {
    alignSelf: "center",
    position: "absolute",
    right: 0,
    color: "#F6CA56",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 22,
  },
});

export default Card;
