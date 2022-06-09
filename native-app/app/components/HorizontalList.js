import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import CustomCard from "./CustomCard";
import { setChatTitle } from "../../firebase";
import AppText from "./Text";

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
                {/* <Image style={styles.avatar} source={{ uri: item.avatar }} /> */}

                {item.type !== "group" && (
                  <Image style={styles.avatar} source={{ uri: item.avatar }} />
                )}
                {item.type === "group" && (
                  <View
                    style={[
                      styles.avatar,
                      {
                        position: "relative",
                        borderWidth: 0,
                        backgroundColor: "white",
                      },
                    ]}
                  >
                    <Image
                      style={[
                        styles.avatar,
                        {
                          width: 50,
                          height: 50,
                          position: "absolute",
                          bottom: 0,
                          zIndex: 1,
                        },
                      ]}
                      source={{ uri: item.avatar1 }}
                    />

                    <Image
                      style={[
                        styles.avatar,
                        {
                          width: 40,
                          height: 40,
                          position: "absolute",
                          top: 0,
                          right: 0,
                        },
                      ]}
                      source={{ uri: item.avatar2 }}
                    />
                  </View>
                )}

                <AppText numberOfLines={1} style={styles.text}>
                  {item.name}
                </AppText>
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
    alignItems: "center",
    maxWidth: 90,
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
    width: 90,
  },
  avatar2: {
    backgroundColor: "whitesmoke",
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "thistle",
  },
});
