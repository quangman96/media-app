import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as Analytics from "expo-firebase-analytics";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text, TextInput, ToastAndroid, TouchableOpacity,
  useWindowDimensions, View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth, getAll } from "../../firebase";
import AppText from "../components/Text";



export default function Header({ title, passInput, passCategory }) {
  const [text, onChangeText] = useState("");
  const [buttons, setButtons] = useState([]);
  const { width } = useWindowDimensions();
  const name = title === "User" ? "Profile" : title;
  const navigation = useNavigation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      passInput(text);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [text]);

  useEffect(() => {
    async function getCategoryList() {
      const res = await getAll("categories");
      if (res.length > 0) {
        const temp = res.map((e) =>
          Object.assign({ name: e.name, focus: false })
        );
        setButtons(temp);
      }
    }
    getCategoryList();
  }, []);

  const showToast = () => {
    ToastAndroid.show("Logout successfully !!!", ToastAndroid.SHORT);
  };
  const handleSignOut = () => {
    const { uid, email } = auth.currentUser;
    auth
      .signOut()
      .then(() => {
        Analytics.logEvent("logout", { uid, email, time: new Date() });
        navigation.replace("Login");
        showToast();
      })
      .catch((e) => console.log(e));
  };

  const handleCreateArticle = () => {
    navigation.navigate("AddArticle", { data: null });
  };

  const handleCreateVideo = () => {
    navigation.navigate("CreateVideo", { data: null });
  };

  const handleClickCard = (index) => {
    const temp = [...buttons];
    // temp[index]["focus"] = !temp[index]["focus"];
    // setButtons(temp);
    // passCategory(temp);
    temp.forEach((btn) => (btn["focus"] = false));
    temp[index]["focus"] = true;
    navigation.navigate("FilteredArticles", { value: temp });
  };

  return (
    <View style={[styles.header, { width: width }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {title !== "Search" && title !== "Home" && (
          <Text style={[styles.title]}>{name}</Text>
        )}
        {title === "User" && (
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              alignSelf: "flex-end",
              marginRight: "12%",
            }}
          >
            {<Feather name={"log-out"} size={30} color={"#0386D0"} />}
          </TouchableOpacity>
        )}
        {title === "My Article" && (
          <TouchableOpacity
            onPress={handleCreateArticle}
            style={{
              alignSelf: "flex-end",
              marginRight: "12%",
            }}
          >
            {<Feather name={"file-plus"} size={30} color={"#0386D0"} />}
          </TouchableOpacity>
        )}
        {title === "Video" && (
          <TouchableOpacity
            onPress={handleCreateVideo}
            style={{
              alignSelf: "flex-end",
              marginRight: "12%",
            }}
          >
            {<Feather name={"file-plus"} size={30} color={"#0386D0"} />}
          </TouchableOpacity>
        )}
        {title === "Search" && (
          <View>
            <View style={styles.custom}>
              <Text style={styles.title}>Explore</Text>
            </View>
            <View style={[styles.search, { width: width - 40 }]}>
              <Feather
                style={styles.icon}
                name={"search"}
                size={25}
                color={"#979797"}
              />
              <TextInput
                style={{ width: width - 100 }}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Enter the keyword"}
              />
            </View>
            <View style={{ marginLeft: 20, marginBottom: 12 }}></View>
          </View>
        )}
        {title === "Home" && (
          <View styles={styles.view}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ marginTop: 10 }}></View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.chips}></View>
                <View style={styles.chipBody}>
                  {(buttons || []).map((prop, key) => {
                    return (
                      <TouchableOpacity
                        disabled={false}
                        onPress={() => handleClickCard(key)}
                      >
                        <View
                          style={[
                            styles.theme,
                            {
                              backgroundColor: "#EEF1F4",
                            },
                          ]}
                        >
                          <AppText style={styles["fontLight"]}>
                            {prop["name"]}
                          </AppText>
                        </View>
                      </TouchableOpacity>
                      // key < 4 && (
                      //   <TouchableOpacity
                      //     disabled={false}
                      //     onPress={() => handleClickCard(key)}
                      //   >
                      //     <View
                      //       style={[
                      //         styles.theme,
                      //         {
                      //           // backgroundColor: prop["focus"]
                      //           //   ? "#667080"
                      //           //   : "#EEF1F4",
                      //           backgroundColor: "#EEF1F4",
                      //         },
                      //       ]}
                      //     >
                      //       <AppText
                      //         style={
                      //           // styles[prop["focus"] ? "fontDark" : "fontLight"]
                      //           styles["fontLight"]
                      //         }
                      //       >
                      //         {prop["name"]}
                      //       </AppText>
                      //     </View>
                      //   </TouchableOpacity>
                      // )
                    );
                  })}
                </View>
              </View>
            </ScrollView>
            <View style={{ marginTop: 20 }}></View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: { marginBottom: -10 },
  search: {
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: "white",
    position: "relative",
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    marginVertical: 10,
    borderColor: "#979797",
    borderWidth: 1,
    paddingLeft: 15,
    marginTop: 30,
  },
  custom: {
    marginBottom: -15,
  },
  header: {
    position: "absolute",
    bottom: 0,
    minHeight: 100,
    backgroundColor: "white",
  },
  body: {
    alignItems: "center",
    margin: 20,
  },
  title: {
    color: "#667080",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 36,
    marginTop: 40,
    marginLeft: 20,
  },
  chips: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
  },
  icon: {
    marginTop: 10,
    marginRight: 10,
  },
  chipBody: {
    flexDirection: "row",
  },
  theme: {
    paddingRight: 10,
    paddingLeft: 10,
    height: 40,
    minWidth: 100,
    justifyContent: "center",
    backgroundColor: "#EEF1F4",
    borderRadius: 20,
    marginRight: 20,
  },
  fontLight: {
    alignSelf: "center",
    color: "#667080",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
  },
  fontDark: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
  },
});
