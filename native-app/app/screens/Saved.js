import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import AppText from "../components/Text";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import { getSavedDataByUser, getUserId } from "../../firebase";
import CustomFlatList from "../components/CustomFlatList";

export default function Saved(props) {
  const user_id = getUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [cntUnSaved, setCntUnSaved] = useState(0);

  async function getSavedData(id, lastItemId = null) {
    // const res = await getSavedDataByUser(id);
    setIsLoadMore(true);
    const { data: res, lastDocId } = await getSavedDataByUser(
      id,
      lastItemId,
      3
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

  const handleOnUnSaved = () => {
    setCntUnSaved(cntUnSaved + 1);
  };

  if (isLoading) {
    return renderLoader();
  } else {
    return (
      <CustomFlatList
        isSavedPage={true}
        data={data}
        callBack={handleOnUnSaved}
        onEndReachedThreshold={0}
        onEndReached={handleOnEndReached}
        ListHeaderComponent={
          <View style={styles.result}>
            <AppText>Result: {data?.length - cntUnSaved || 0}</AppText>
          </View>
        }
        ListFooterComponent={renderLoader}
      ></CustomFlatList>

      // <KeyBoardAvoidingWrapper>
      //   <Screen style={{ backgroundColor: "#EEF1F4" }}>
      //     <View style={styles.result}>
      //       <AppText>Result: {data?.length || 0}</AppText>
      //     </View>
      //     <CardList isSavedPage={true} data={data}></CardList>
      //   </Screen>
      // </KeyBoardAvoidingWrapper>
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
    // marginLeft: 20,
    marginTop: 10,
    // marginBottom: -10,
    marginBottom: 10,
  },
});
