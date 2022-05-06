import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import ChipList from "../components/ChipList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import { useNavigation } from "@react-navigation/core";
import { auth, getMasterData, getAll } from "../../firebase";

export default function Home() {
  const [buttons, setButtons] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getButtonList() {
      const res = await getMasterData("CATEGORY");
      const buttonList = [];
      res.forEach((e, i) => {
        if (i === 0) {
          buttonList.push({
            name: e["name"],
            theme: "dark",
          });
        } else {
          buttonList.push({
            name: e["name"],
            theme: "light",
          });
        }
      });
      setButtons(buttonList);
    }

    async function getArticleList() {
      const res = await getAll("articles");
      const articleList = [];

      res.forEach((e) => {
        const obj = {
          ...e,
          categories: tranferCategory(e["categories"]),
        };
        articleList.push(obj);
      });
      setArticles(articleList);
    }

    async function getCategoryList() {
      const res = await getAll("categories");
      setCategories(res);
      getArticleList();
    }
    getButtonList();
    getCategoryList();
  }, []);

  const tranferCategory = (list) => {
    const array = [];
    list.forEach((e) => {
      const obj = categories.find((z) => z.id === e);
      if (obj) {
        array.push(obj["name"]);
      }
    });
    return array;
  };

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <KeyBoardAvoidingWrapper>
      <Screen style={{ backgroundColor: "#EEF1F4" }}>
        {/* <View style={styles.header}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity
              onPress={handleSignOut}
              style={{
                alignSelf: "flex-end",
                marginRight: 20,
              }}
            >
              {<Feather name={"log-out"} size={30} color={"#0386D0"} />}
            </TouchableOpacity>
          </View>
          <View style={styles.chips}>
            <ChipList data={buttons} size="medium"></ChipList>
          </View>
        </View> */}
        <CardList data={articles}></CardList>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 145,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -10,
  },
  body: {
    alignItems: "center",
    margin: 20,
  },
  chips: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  title: {
    color: "#667080",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 40,
    marginLeft: 20,
  },
});
