import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Screen from "../components/Screens";
import CardList from "../components/CardList";
import AppText from "../components/Text";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import { getArticleByUser, getUserId } from "../../firebase";

export default function MyList() {
  const user_id = getUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getSavedData(id) {
      const res = await getArticleByUser(id);
      res.forEach((e) => (e["is_saved"] = true));
      setData(res);
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
    getSavedData(user_id);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator
          style={{ opacity: 0.5 }}
          animating={true}
          size={70}
          color="tomato"
        />
      </View>
    );
  } else {
    return (
      <KeyBoardAvoidingWrapper>
        <Screen style={{ backgroundColor: "#EEF1F4" }}>
          <View style={styles.result}>
            <AppText>Result: {data?.length || 0}</AppText>
          </View>
          <CardList isMyListPage={true} data={data}></CardList>
        </Screen>
      </KeyBoardAvoidingWrapper>
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
    marginLeft: 20,
    marginTop: 10,
    marginBottom: -10,
  },
});
