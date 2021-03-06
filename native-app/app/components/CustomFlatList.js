import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import Card from "./Card";
import CardVideo from "./CardVideo";

export default function CustomFlatList({
  data,
  isSavedPage = false,
  isMyListPage = false,
  isVideoPage = false,
  callBack,
  ...rest
}) {
  const handleOnPauseAnotherVideo = (id) => {
    data.forEach((video) => {
      video["isPlaying"] = video["id"] === id;
    });
  };

  return (
    <View style={[styles.body, isVideoPage ? styles.video : styles.normal]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.flatList}
        data={data}
        renderItem={({ item }) =>
          isVideoPage ? (
            <CardVideo
              cardObj={item}
              pauseAnotherVideo={handleOnPauseAnotherVideo}
            />
          ) : (
            <Card
              isSavedPage={isSavedPage}
              isMyListPage={isMyListPage}
              cardObj={item}
              callBack={callBack}
            ></Card>
          )
        }
        keyExtractor={(item) => item.id}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
  },
  normal: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  video: {
    backgroundColor: "white",
  },
  flatList: {
    width: "100%",
  },
});
