import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import AppText from "../components/Text";
import Screen from "../components/Screens";
import ChipList from "../components/ChipList";

import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";

export default function Detail() {
  const CHIP = [
    { name: "Category", theme: "light" },
    { name: "Category", theme: "light" },
    { name: "Category", theme: "light" },
  ];
  return (
    <KeyBoardAvoidingWrapper>
      <Screen>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require(`../../assets/images/detail.png`)}
          ></Image>
        </View>
        <View style={styles.body}>
          <View style={styles.area}>
            <View style={styles.chip}>
              <ChipList data={CHIP} size="big"></ChipList>
            </View>
            <Text style={styles.title}>Lorem ipsum dolor sit amet</Text>
            <View style={styles.owner}>
              <Image
                style={styles.avatar}
                source={require(`../../assets/images/user.png`)}
              ></Image>
              <AppText>Nguyen Quang Man</AppText>
            </View>
            <AppText style={styles.text}>
              Fusce nec mauris lorem. Praesent sem magna, finibus non velit ac,
              tristique vestibulum felis. Ut feugiat sodales malesuada. Morbi
              imperdiet ex sit amet velit rutrum suscipit. Praesent posuere
              metus ut luctus vestibulum. Interdum et malesuada fames ac ante
              ipsum primis in faucibus. Quisque ligula ipsum, placerat vitae
              orci ut, pharetra consectetur augue. Cras tristique mi at mi
              pretium hendrerit. Praesent sed mi arcu. Cras a magna sit amet leo
              semper cursus eget at lacus. Pellentesque vestibulum orci viverra
              maximus consequat. Curabitur a magna ex. Integer aliquet viverra
              elementum. Cras id nibh maximus, commodo ex in, vehicula erat.
              Donec quam felis, tempor non facilisis dictum, auctor nec velit.
              In rutrum nisi id risus fermentum, in ullamcorper est dictum.
              Nulla facilisi. Proin quam dui, cursus eu tempus posuere, dictum a
              nulla. Suspendisse felis tortor, lacinia quis felis eget,
              vulputate elementum mi. Nunc elementum sapien sed quam blandit,
              nec ullamcorper lorem mattis. Etiam et cursus ante.
            </AppText>
          </View>
        </View>
      </Screen>
    </KeyBoardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
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
    height: Dimensions.get("window").height - 220,
    marginTop: -20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    marginTop: 10,
    color: "#667080",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 15,
  },
});
