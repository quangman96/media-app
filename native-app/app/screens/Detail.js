import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import AppText from "../components/Text";
import Screen from "../components/Screens";
import ChipList from "../components/ChipList";

import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

export default function Detail({ route }) {
  const data = route?.params?.data;
  const { width } = useWindowDimensions();
  const CHIP = [
    { name: "Category", theme: "light" },
    { name: "Category", theme: "light" },
    { name: "Category", theme: "light" },
  ];
  return (
    <ScrollView contentContainerStyle={styles.grow}>
      <Screen>
        <View style={styles.container}>
          <View style={{ margin: -20 }}></View>
          <View style={styles.header}>
            <Image style={styles.image} source={{ uri: data["image"] }}></Image>
          </View>
          <View style={styles.body}>
            <View style={styles.area}>
              <View style={styles.chip}>
                <ChipList data={CHIP} size="big"></ChipList>
              </View>
              <Text style={styles.title}>{data.title}</Text>
              <View style={styles.owner}>
                <Image
                  style={styles.avatar}
                  source={require(`../../assets/images/user.png`)}
                ></Image>
                <AppText>Nguyen Quang Man</AppText>
              </View>
              <AppText style={styles.text}>{data.description}</AppText>

              <RenderHtml
                contentWidth={width}
                source={{ html: `${data.content}` }}
              />
            </View>
          </View>
          <View style={{ margin: -15 }}></View>
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
});
