import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getArticleByUser, getUserId } from "../../firebase";
import CustomFlatList from "../components/CustomFlatList";
import AppText from "../components/Text";

export default function MyList() {
  const user_id = getUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cntDelete, setCntDelete] = useState(0);
  const [lastId, setLastId] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);

  async function getSavedData(id, lastItemId = null) {
    setIsLoadMore(true);
    const { data: res, lastDocId } = await getArticleByUser(
      id,
      lastItemId,
      3,
      true
    );
    res.forEach((e) => (e["is_saved"] = true));
    const resIdList = res.map((e) => e.id);
    const dataIdList = data.map((e) => e.id);
    const isFound = dataIdList.some((e) => resIdList.includes(e));
    const newList = isFound ? data : [...data, ...res];
    setLastId(lastDocId);
    setData(newList);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoadMore(false);
    }, 0);
  }

  useEffect(() => {
    getSavedData(user_id);
  }, []);

  const handleOnDeleteArticle = () => {
    setCntDelete(cntDelete + 1);
  };

  const handleOnEndReached = async () => {
    await getSavedData(user_id, lastId);
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
        isMyListPage={true}
        data={data}
        callBack={handleOnDeleteArticle}
        onEndReachedThreshold={0}
        onEndReached={handleOnEndReached}
        ListHeaderComponent={
          <View style={styles.result}>
            <AppText>Result: {data?.length - cntDelete || 0}</AppText>
          </View>
        }
        ListFooterComponent={renderLoader}
      ></CustomFlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  result: {
    marginTop: 10,
    marginBottom: 10,
  },
});
