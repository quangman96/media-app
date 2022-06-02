import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import CustomCard from "./CustomCard";
import { setChatTitle } from "../../firebase";

export default function HorizontalList({ data, type = 0, profile = null }) {
  const navigation = useNavigation();
  const handleClickAvatar = (item) => {
    setChatTitle(item.name);
    setTimeout(() => {
      navigation.navigate("ChatDetail", { data: item, profile });
    }, 0);
  };
  if (type === 0) {
    return (
      <View style={styles.body1}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={data}
          renderItem={({ item }) => <CustomCard cardObj={item}></CustomCard>}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.body2}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClickAvatar(item)}>
              <View style={styles.area}>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <Text style={styles.text}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body1: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  body2: {
    marginTop: 5,
    marginBottom: -10,
    marginLeft: 20,
    height: 100,
    width: "100%",
  },
  area: {
    paddingRight: 20,
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: "whitesmoke",
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "thistle",
  },
  text: {
    textAlign: "center",
    color: "#667080",
    fontSize: 14,
  },
});
