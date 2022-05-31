import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getVideos } from "../../firebase";
import CustomFlatList from "../components/CustomFlatList";

export default function VideoScreen() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [lastId, setLastId] = useState(null);

  async function getVideoList(lastItemId = null) {
    setIsLoadMore(true);
    const { data: videoList, lastDocId } = await getVideos(lastItemId, 3);

    const resIdList = videoList.map((e) => e.id);
    const dataIdList = videos.map((e) => e.id);
    const isFound = dataIdList.some((e) => resIdList.includes(e));
    const newList = isFound ? videos : [...videos, ...videoList];
    setLastId(lastDocId);
    newList.forEach((video) => {
      video["isPlaying"] = false;
    });
    setVideos(newList);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoadMore(false);
    }, 0);
  }

  useEffect(() => {
    getVideoList();
  }, []);

  const handleOnEndReached = async () => {
    await getVideoList(lastId);
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
        style={styles.customFlatList}
        isVideoPage={true}
        data={videos}
        onEndReachedThreshold={0}
        onEndReached={handleOnEndReached}
        ListFooterComponent={renderLoader}
      ></CustomFlatList>
    );
  }
}

const styles = StyleSheet.create({
  customFlatList: {},
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: 10,
  },
});
