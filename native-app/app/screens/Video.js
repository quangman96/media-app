import {
  StyleSheet,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import HorizontalList from "../components/HorizontalList";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import {
  getMasterData,
  getAll,
  getArticles,
  getUserId,
  getDocsLazyLoading,
} from "../../firebase";
import CustomFlatList from "../components/CustomFlatList";
import { example } from "../mock/videoData";

export default function VideoScreen({ value }) {
  const user_id = getUserId();
  const [buttons, setButtons] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articlesDF, setArticlesDF] = useState([]);
  const [articlesHorizontal, setArticlesHorizontal] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [loadCnt, setLoadCnt] = useState(0);
  const [isFilterCategories, setIsFilterCategories] = useState(false);
  const isHaveChild = (arr1, arr2) => arr1.some((e) => ~arr2.indexOf(e));

  async function getArticleList(lastItemId = null) {
    setIsLoadMore(true);
    const { data: articleList, lastDocId } = await getArticles(
      user_id,
      isFilterCategories ? null : lastItemId,
      isFilterCategories ? 0 : 3
    );

    const prevData = isFilterCategories ? [] : articles;
    const resIdList = articleList.map((e) => e.id);
    const dataIdList = prevData.map((e) => e.id);
    const isFound = dataIdList.some((e) => resIdList.includes(e));
    const newList = isFound ? articles : [...articles, ...articleList];
    setLastId(lastDocId);
    setArticlesDF(newList);
    filterArticleList([...newList]);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoadMore(false);
    }, 0);
  }

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

    async function getCategoryList() {
      const res = await getAll("categories");
      setCategories(res);
      getArticleList();
    }
    getButtonList();
    getCategoryList();
  }, []);

  useEffect(() => setIsFilterCategories(!isFilterCategories), [value]);

  const filterArticleList = (arrList) => {
    const arr = [];
    (value || []).forEach((e) => {
      if (e["focus"]) {
        arr.push(e.name);
      }
    });

    if (arr.length > 0) {
      const newArr = arrList.filter((e) => isHaveChild(arr, e.categories));
      const filtered = newArr.slice(0, loadCnt * 3 + 3);
      setArticles(filtered);
      if (filtered.length > 1) {
        setHorizontalList(filtered);
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

  const handleOnEndReached = async () => {
    await getArticleList(lastId);
    setLoadCnt(loadCnt + 1);
  };

  const renderLoader = () => {
    return isLoadMore ? (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          style={{ opacity: 0.5 }}
          animating={true}
          size={70}
          color="tomato"
        />
      </View>
    ) : null;

    //  isLoadMore ? (
    //   <View style={styles.loaderStyle}>
    //     <ActivityIndicator size="large" color="#aaa" />
    //   </View>
    // ) : null;
  };

  if (isLoading) {
    return renderLoader();
  } else {
    return (
      <CustomFlatList
        style={styles.customFlatList}
        isVideoPage={true}
        data={example}
        // callBack={handleOnUnSaved}
        // onEndReachedThreshold={0}
        // onEndReached={handleOnEndReached}
        ListFooterComponent={renderLoader}
      ></CustomFlatList>
    );
  }
}

const styles = StyleSheet.create({
  customFlatList: {
    marginTop: 20,
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
