import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import AppText from "../components/Text";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import { getMasterData, getAll, getArticles, getUserId } from "../../firebase";

export default function Search({ value }) {
  const user_id = getUserId();
  const [buttons, setButtons] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      const articleList = await getArticles(user_id);
      if (value) {
        const temp = articleList.filter((e) =>
          e.title.toLowerCase().includes(value.toLowerCase())
        );
        setArticles(temp);
      } else {
        setArticles(articleList);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }

    async function getCategoryList() {
      const res = await getAll("categories");
      setCategories(res);
      getArticleList();
    }
    try {
      getButtonList();
      getCategoryList();
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
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
        <Screen style={{ backgroundColor: "#EEF1F4" }}>
          <View style={styles.result}>
            <AppText>Result: {articles?.length || 0}</AppText>
          </View>
          <CardList data={articles}></CardList>
        </Screen>
      </KeyBoardAvoidingWrapper>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -10,
  },
  search: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: -10,
  },
  body: {
    alignItems: "center",
    margin: 20,
  },
  result: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: -10,
  },
  title: {
    color: "#667080",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 40,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
