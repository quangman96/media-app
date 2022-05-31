import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as Analytics from "expo-firebase-analytics";
import React, { useState } from "react";
import {
  Alert, Image, StyleSheet, ToastAndroid, TouchableOpacity, View
} from "react-native";
import {
  auth, createSavedData,
  deleteSavedData,
  getUserId,
  softDelete
} from "../../firebase";
import ChipList from "../components/ChipList";
import AppText from "../components/Text";
import defaultStyles from "../config/styles";


export default function Card({ cardObj, isSavedPage, isMyListPage, callBack }) {
  const { uid, email } = auth.currentUser;
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
        ToastAndroid.show("Save Article", ToastAndroid.SHORT);
        if (!isSavedPage) {
          cardObj["savedId"] = res?.id || "";
        }
      });
    } else {
      ToastAndroid.show("Unsave Article", ToastAndroid.SHORT);
      deleteSavedData(cardObj.savedId);
      setTimeout(() => {
        isSavedPage && setIsDelete(true);
      }, 100);
      if (typeof callBack == "function") callBack();
    }
    setSaved(!isSaved);
  };

  const handleClickCard = () => {
    Analytics.logEvent("article_view", {
      uid,
      email,
      article_id: cardObj.id,
      time: new Date(),
    });

    navigation.navigate("Detail", { data: cardObj });
  };

  const handleClickEditButton = () => {
    navigation.navigate("EditArticle", { data: cardObj });
  };

  const handleClickDeleteButton = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
      },
      { text: "OK", onPress: () => handleOnOkDelete() },
    ]);
  };

  const handleOnOkDelete = async () => {
    await softDelete("articles", cardObj["id"]);
    setIsDelete(true);
    ToastAndroid.show("Delete article successfully !!!", ToastAndroid.SHORT);
    if (typeof callBack == "function") callBack();
  };

  return (
    !isDelete && (
      <TouchableOpacity style={styles.area} onPress={handleClickCard}>
        <View style={styles.form}>
          <View style={styles.header}>
            <AppText numberOfLines={2} style={styles.label}>
              {cardObj["title"]}
            </AppText>
            {isMyListPage && (
              <View style={styles.iconGroup}>
                <TouchableOpacity onPress={() => handleClickEditButton()}>
                  <Feather
                    name={"edit"}
                    size={22}
                    color={defaultStyles.colors.icon}
                    style={styles.iconInGroup}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClickDeleteButton()}>
                  <Feather
                    name={"trash"}
                    size={22}
                    color={defaultStyles.colors.icon}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
            {isSaved && !isMyListPage && (
              <TouchableOpacity onPress={() => handleClickButton(false)}>
                <Feather
                  name={"bookmark"}
                  size={22}
                  color={!!isSaved ? "#0386D0" : defaultStyles.colors.icon}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {!isSaved && !isMyListPage && (
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
            <Image
              style={styles.image}
              source={
                cardObj["image"]
                  ? {
                      uri: cardObj["image"],
                    }
                  : require("../../assets/images/inf.png")
              }
            />
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
  },
  body: {
    flex: 2,
    flexDirection: "row",
    marginTop: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    width: 260,
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
  iconInGroup: {
    alignSelf: "center",
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
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
  iconGroup: {
    flex: 1,
    flexDirection: "row",
  },
});
