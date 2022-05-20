import { StyleSheet, ActivityIndicator, View } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import HorizontalList from "../components/HorizontalList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import { getMasterData, getAll, getArticles, getUserId } from "../../firebase";

export default function Home({ value }) {
  const user_id = getUserId();
  const [buttons, setButtons] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articlesDF, setArticlesDF] = useState([]);
  const [articlesHorizontal, setArticlesHorizontal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isHaveChild = (arr1, arr2) => arr1.some((e) => ~arr2.indexOf(e));

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
      setArticlesDF(articleList);
      filterArticleList([...articleList]);

      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }

    async function getCategoryList() {
      const res = await getAll("categories");
      setCategories(res);
      getArticleList();
    }
    getButtonList();
    getCategoryList();
  }, []);

  useEffect(() => {}, [value]);

  const filterArticleList = (arrList) => {
    const arr = [];
    (value || []).forEach((e) => {
      if (e["focus"]) {
        arr.push(e.name);
      }
    });
    if (arr.length > 0) {
      const newArr = arrList.filter((e) => isHaveChild(arr, e.categories));
      setArticles(newArr);
      if (newArr.length > 1) {
        setHorizontalList(newArr);
      }
    } else {
      setArticles(arrList);
      if (arrList.length > 1) {
        setHorizontalList(arrList);
      }
    }
  };

  const setHorizontalList = (list) => {
    const newArticleList = [...list].reverse();
    setArticlesHorizontal(newArticleList.slice(0, 4));
  };

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
          <HorizontalList data={articlesHorizontal}></HorizontalList>
          <View style={{ marginTop: -15 }}></View>
          <CardList data={articles}></CardList>
        </Screen>
      </KeyBoardAvoidingWrapper>
    );
  }
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