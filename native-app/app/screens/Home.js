import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getAll, getArticles, getMasterData, getUserId } from "../../firebase";
import CustomFlatList from "../components/CustomFlatList";
import HorizontalList from "../components/HorizontalList";

export default function Home({ value }) {
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
  const isHaveChild = (arr1, arr2) => arr1.some((e) => ~arr2.indexOf(e));

  async function getArticleList(lastItemId = null) {
    setIsLoadMore(true);
    const { data: articleList, lastDocId } = await getArticles(
      user_id,
      lastItemId,
      3
    );

    const resIdList = articleList.map((e) => e.id);
    const dataIdList = articles.map((e) => e.id);
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
  };

  if (isLoading) {
    return renderLoader();
  } else {
    return (
      <CustomFlatList
        data={articles}
        onEndReachedThreshold={0}
        onEndReached={handleOnEndReached}
        ListHeaderComponent={
          <HorizontalList data={articlesHorizontal}></HorizontalList>
        }
        ListFooterComponent={renderLoader}
      ></CustomFlatList>
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
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
