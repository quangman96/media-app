import { StyleSheet, ActivityIndicator, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import HorizontalList from "../components/HorizontalList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import { getMasterData, getAll, getArticles, getUserId } from "../../firebase";
import {useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const user_id = getUserId();
  const [buttons, setButtons] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articlesHorizontal, setsetArticlesHorizontal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
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
        const articleList = await getArticles(user_id, true);
        setArticles(articleList);
        const newArticleList = [...articleList].reverse();
        setsetArticlesHorizontal(newArticleList.slice(0, 4));
  
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
    }, [])
  );


  // useEffect(() => {
  //   async function getButtonList() {
  //     const res = await getMasterData("CATEGORY");
  //     const buttonList = [];
  //     res.forEach((e, i) => {
  //       if (i === 0) {
  //         buttonList.push({
  //           name: e["name"],
  //           theme: "dark",
  //         });
  //       } else {
  //         buttonList.push({
  //           name: e["name"],
  //           theme: "light",
  //         });
  //       }
  //     });
  //     setButtons(buttonList);
  //   }

  //   async function getArticleList() {
  //     const articleList = await getArticles(user_id, true);
  //     setArticles(articleList);
  //     const newArticleList = [...articleList].reverse();
  //     setsetArticlesHorizontal(newArticleList.slice(0, 4));

  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 0);
  //   }

  //   async function getCategoryList() {
  //     const res = await getAll("categories");
  //     setCategories(res);
  //     getArticleList();
  //   }
  //   getButtonList();
  //   getCategoryList();
  // }, []);

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
