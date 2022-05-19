import { StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import ChipList from "../components/ChipList";
import { useWindowDimensions } from "react-native";
import AppText from "../components/Text";
import { useNavigation } from "@react-navigation/core";

export default function CustomCard({ cardObj }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const handleClickCard = () => {
    navigation.navigate("Detail", { data: cardObj });
  };
  return (
    <TouchableOpacity onPress={handleClickCard}>
      <ImageBackground
        source={
          cardObj["image"]
            ? {
                uri: cardObj["image"],
              }
            : require("../../assets/images/inf.png")
        }
        imageStyle={{ borderRadius: 20 }}
        resizeMode="cover"
        style={[styles.container, { width: width - 90 }]}
      >
        <ChipList key={cardObj.id} data={cardObj["categories"]}></ChipList>
        <AppText numberOfLines={3} style={styles.label}>
          {cardObj["title"]}
        </AppText>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    width: 220,
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 20,
  },
  container: {
    minHeight: 180,
    marginRight: 20,
    flex: 1,
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
  },
});
