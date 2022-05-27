import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getAll, getArticles, getUserId } from "../../firebase";
import CustomFlatList from "../components/CustomFlatList";

export default function FilteredArticles(props) {
  const { value } = props?.route?.params;
  const user_id = getUserId();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [loadCnt, setLoadCnt] = useState(0);
  const isHaveChild = (arr1, arr2) => arr1.some((e) => ~arr2.indexOf(e));

  async function getArticleList() {
    setIsLoadMore(true);
    const { data: articleList } = await getArticles(user_id, null, 0);
    filterArticleList(articleList);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoadMore(false);
    }, 0);
  }

  useEffect(() => {
    const title = value.find((element) => element["focus"]).name;
    props?.navigation.setOptions({ title: title });

    getArticleList();
  }, []);

  const filterArticleList = (arrList) => {
    const arr = [];
    (value || []).forEach((e) => {
      if (e["focus"]) {
        arr.push(e.name);
      }
    });

    if (arr.length > 0) {
      const newArr = arrList.filter((e) => isHaveChild(arr, e.categories));
      const filtered = newArr.slice(0, loadCnt * 4 + 4);
      setArticles(filtered);
    } else {
      setArticles(arrList);
    }
  };

  const handleOnEndReached = async () => {
    await getArticleList();
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
        style={styles.flatList}
        data={articles}
        onEndReachedThreshold={0}
        onEndReached={handleOnEndReached}
        ListFooterComponent={renderLoader}
      ></CustomFlatList>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    marginTop: 20,
    width: '100%'
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
