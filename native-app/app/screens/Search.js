import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getAll, getArticles, getMasterData, getUserId } from "../../firebase";
import CustomFlatList from "../components/CustomFlatList";
import AppText from "../components/Text";

export default function Search({ value }) {
  const user_id = getUserId();
  const [buttons, setButtons] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [loadCnt, setLoadCnt] = useState(0);

  async function getArticleList(lastItemId = null) {
    const numItemLoad = 3;
    setIsLoadMore(true);

    if (value) {
      const { data: articleList } = await getArticles(user_id);
      const temp = articleList.filter((e) =>
        e.title.toLowerCase().includes(value.toLowerCase())
      );
      const filtered = temp.slice(0, loadCnt * numItemLoad + numItemLoad);
      setArticles(filtered);
    } else {
      const { data: articleList, lastDocId } = await getArticles(
        user_id,
        lastItemId,
        numItemLoad
      );

      const resIdList = articleList.map((e) => e.id);
      const dataIdList = articles.map((e) => e.id);
      const isFound = dataIdList.some((e) => resIdList.includes(e));
      const newList = isFound ? articles : [...articles, ...articleList];
      setArticles(newList);
      setLastId(lastDocId);
    }

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
          <View style={styles.result}>
            <AppText>Result: {articles?.length || 0}</AppText>
          </View>
        }
        ListFooterComponent={renderLoader}
      ></CustomFlatList>
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
    marginTop: 10,
    marginBottom: 10,
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
