import { Video } from "expo-av";
import React, { useRef } from "react";
import { Image, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";
import ChipList from "../components/ChipList";
import Screen from "../components/Screens";
import AppText from "../components/Text";

export default function Detail({ route }) {
  const video = useRef(null);
  const data = route?.params?.data;
  const { width } = useWindowDimensions();

  return (
    <ScrollView contentContainerStyle={styles.grow}>
      <Screen>
        <View style={styles.container}>
          <View style={{ margin: -20 }}></View>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={
                data["image"]
                  ? {
                      uri: data["image"],
                    }
                  : require("../../assets/images/inf.png")
              }
            ></Image>
          </View>
          <View style={styles.body}>
            <View style={styles.area}>
              <View style={styles.chip}>
                <ChipList data={data.categories || []} size="big"></ChipList>
              </View>
              <Text style={styles.title}>{data.title}</Text>
              <AppText style={styles.text}>{data.description}</AppText>
              {data?.video?.length > 0 && (
                <View style={styles.videoArea}>
                  <Video
                    ref={video}
                    style={styles.video}
                    source={{
                      uri: data["video"],
                    }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    shouldPlay
                  />
                </View>
              )}
              <RenderHtml
                contentWidth={width}
                source={{ html: `${data.content}` }}
              />
            </View>
          </View>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grow: { flexGrow: 1 },
  container: {
    flex: 1,
  },
  area: {
    marginLeft: 20,
    marginRight: 20,
  },
  owner: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#667080",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginBottom: 5,
  },
  header: {
    marginTop: 30,
  },
  chip: {
    marginTop: 10,
    marginBottom: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: 220,
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    marginTop: 10,
    color: "#667080",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 15,
  },
  videoArea: {
    marginLeft: 0,
    marginTop: 10,
    marginRight: 5,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
});
