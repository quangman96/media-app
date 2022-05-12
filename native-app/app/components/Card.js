import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import AppText from "../components/Text";
import ChipList from "../components/ChipList";
import { Feather } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import { useNavigation } from "@react-navigation/core";
import { createSavedData, deleteSavedData, getUserId } from "../../firebase";

export default function Card({ icon, cardObj, isSavedPage }) {
  const user_id = getUserId();
  const [isSaved, setSaved] = useState(cardObj["is_saved"]);
  const [isDelete, setIsDelete] = useState(false);
  const navigation = useNavigation();
  const calculateTime = (time) => {
    const date = Math.floor(Math.abs(new Date() - new Date(time)) / 86400000);
    let z = 0;
    if (date > 365) {
      z = `${Math.floor(date / 365)} years ago`;
    } else if (date > 30) {
      z = `${Math.floor(date / 30)} months ago`;
    } else {
      z = `${date} days ago`;
    }
    return z === `0 days ago` ? `just new` : z;
  };
  const handleClickButton = (status) => {
    if (status) {
      createSavedData(user_id, cardObj.id).then((res) => {
        if (!isSavedPage) {
          cardObj["savedId"] = res?.id || "";
        }
      });
    } else {
      deleteSavedData(cardObj.savedId);
      setTimeout(() => {
        isSavedPage && setIsDelete(true);
      }, 100);
    }
    setSaved(!isSaved);
  };

  const handleClickCard = () => {
    navigation.navigate("Detail", { data: cardObj });
  };
  return (
    !isDelete && (
      <TouchableOpacity style={styles.area} onPress={handleClickCard}>
        <View style={styles.form}>
          <View style={styles.header}>
            <AppText numberOfLines={2} style={styles.label}>
              {cardObj["title"]}
            </AppText>
            {isSaved ? (
              <TouchableOpacity onPress={() => handleClickButton(false)}>
                <Feather
                  name={"bookmark"}
                  size={22}
                  color={!!isSaved ? "#0386D0" : defaultStyles.colors.icon}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleClickButton(true)}>
                <Feather
                  name={"bookmark"}
                  size={22}
                  color={!!isSaved ? "#0386D0" : defaultStyles.colors.icon}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.body}>
            <AppText numberOfLines={5} style={styles.description}>
              {cardObj["description"]}
            </AppText>
            <Image style={styles.image} source={{ uri: cardObj["image"] }} />
          </View>
          <View style={styles.footer}>
            <ChipList key={cardObj.id} data={cardObj["categories"]}></ChipList>
            <AppText style={styles.time}>
              {calculateTime(cardObj["create_at"])}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
}

const styles = StyleSheet.create({
  area: {
    width: "100%",
  },
  form: {
    position: "relative",
    width: "100%",
    minHeight: 170,
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
    flex: 0.5,
    marginTop: 10,
    // marginBottom: 5,
  },
  body: {
    flex: 2,
    flexDirection: "row",
    marginTop: 5,
    // paddingRight: 5,
    // marginBottom: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    // marginTop: 5,
    marginBottom: 10,
  },
  label: {
    width: 270,
    color: "#667080",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
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
    width: 120,
    height: 75,
  },
  icon: {
    alignSelf: "center",
    marginTop: 5,
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