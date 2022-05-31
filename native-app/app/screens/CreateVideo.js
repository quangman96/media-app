import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { getAll } from "../../firebase";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppFormDropDown from "../components/forms/AppFormDropDown";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import Screen from "../components/Screens";
import { createByTable } from "../../firebase";

const ScreenHeight = Dimensions.get("window").height;

export default function CreateVideo({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [categoriesErrors, setCategoriesErrors] = useState("");
  const [titleErrors, setTitleErrors] = useState("");
  const [urlErrors, setUrlErrors] = useState("");
  const [video, setVideo] = useState({
    url: "",
    title: "",
    categories: [],
  });

  useEffect(() => {
    async function getData() {
      const categories = await getAll("categories");
      const categoriesData = (categories || []).map((e) =>
        Object.assign({
          label: e["name"],
          value: e["id"],
        })
      );
      setCategoriesItems(categoriesData);

      let data = {
        url: "",
        title: "",
        categories: [categoriesData[0].value],
      };
      setVideo(data);

      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
    getData();
  }, []);

  const handleUpdate = async (values, { setStatus, resetForm }) => {
    setTitleErrors("");
    setCategoriesErrors("");
    setUrlErrors("");
    let isError = false;
    setReset(false);
    if (!values["url"] || values["url"].length == 0) {
      isError = true;
      setUrlErrors("Url is required");
    }

    if (!values["title"] || values["title"].length == 0) {
      isError = true;
      setTitleErrors("Title is required");
    }

    if (video["categories"].length == 0) {
      isError = true;
      setCategoriesErrors("Pick at least 1");
    }

    if (isError) return;

    const data = {
      url: values["url"],
      title: values["title"],
      categories: video["categories"],
      is_delete: false,
    };

    await createByTable("videos", data);

    const initialValues = {
      ...video,
      categories: [categoriesItems[0].value],
    };
    resetForm({});
    setStatus({ success: true });
    setVideo(initialValues);
    setReset(true);

    ToastAndroid.show("Create video successfully !!!", ToastAndroid.SHORT);
  };

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
        <Screen
          style={{
            backgroundColor: "white",
            height: ScreenHeight - 61,
          }}
        >
          <View style={styles.body}>
            <AppForm initialValues={video} onSubmit={handleUpdate}>
              <AppFormField
                label="Url"
                autoCapitalize="none"
                autoCorrect={false}
                name="url"
                placeholder="Input url"
                initValues={video["url"]}
                customErrors={urlErrors}
                reset={reset}
              />

              <AppFormField
                label="Title"
                autoCapitalize="none"
                autoCorrect={false}
                name="title"
                placeholder="Enter a title..."
                initValues={video["title"]}
                numberOfLines={4}
                multiline={true}
                height={80}
                customErrors={titleErrors}
                reset={reset}
              />

              <AppFormDropDown
                label="Category"
                style={{
                  borderColor: "#979797",
                }}
                multiple={true}
                zIndex={2}
                mode="BADGE"
                badgeDotColors={[
                  "#e76f51",
                  "#00b4d8",
                  "#e9c46a",
                  "#e76f51",
                  "#8ac926",
                  "#00b4d8",
                  "#e9c46a",
                ]}
                value={video["categories"]}
                items={categoriesItems}
                onChangeValue={(value) =>
                  setVideo({ ...video, categories: value })
                }
                errors={categoriesErrors}
              />

              <View style={{ padding: 5 }}></View>
              <View style={styles.submitBtn}>
                <SubmitButton title={"Create"} />
              </View>
              <View style={{ paddingBottom: 15 }}></View>
            </AppForm>
          </View>
        </Screen>
      </KeyBoardAvoidingWrapper>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingRight: 30,
    paddingTop: 10,
    paddingLeft: 30,
    flex: 1,
  },
  submitBtn: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    bottom: "3%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  label: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 10,
  },
});
