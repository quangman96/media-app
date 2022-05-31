import { useNavigation } from "@react-navigation/core";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createByTable,
  getAll,
  getMasterData,
  updateById,
  uploadFileAsync,
  getUserId,
  auth,
} from "../../firebase";
import Editor from "../components/Editor";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppFormDropDown from "../components/forms/AppFormDropDown";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import Screen from "../components/Screens";
import AppText from "../components/Text";
import * as Analytics from "expo-firebase-analytics";

export default function Article({ route }) {
  const { uid, email } = auth.currentUser;
  const navigation = useNavigation();
  const video = useRef(null);
  const [statusItems, setStatusItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(false);
  const [isVideoLoading, setVideoLoading] = useState(false);
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [defaultArticle, setDefaultArticle] = useState({});
  const [contentHtml, setContentHtml] = useState("");
  const [categoriesErrors, setCategoriesErrors] = useState("");
  const [titleErrors, setTitleErrors] = useState("");
  const [reset, setReset] = useState(false);
  const [article, setArticle] = useState({
    title: "",
    description: "",
    categories: [],
    status: "",
    image: "",
    video: "",
    content: "",
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    async function getData() {
      const categories = await getAll("categories");
      const categoriesData = (categories || []).map((e) =>
        Object.assign({
          label: e["name"],
          value: e["id"],
        })
      );

      const status = await getMasterData("ARTICLES_STATUS");
      const statusData = (status || []).map((e) =>
        Object.assign({
          label: e["name"],
          value: e["id"],
        })
      );

      let data = {};
      const editData = route?.params?.data;
      setCategoriesItems(categoriesData);
      setStatusItems(statusData);
      if (editData) {
        const categoriesId = (editData?.categories || []).map(
          (child) => child.value
        );
        data = {
          id: editData["id"],
          title: editData["title"],
          description: editData["description"],
          categories: categoriesId,
          status: editData["status"],
          image: editData["image"],
          video: editData["video"],
          content: editData["content"],
        };
      } else {
        data = {
          title: "",
          description: "",
          categories: [categoriesData[0].value],
          status: statusData[0].value,
          image: "",
          content: "",
        };
      }

      setDefaultArticle(data);

      setArticle(data);

      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
    getData();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      setImageLoading(true);
      if (!result.cancelled) {
        uploadFileAsync(result.uri, handleUpload);
      } else {
        setImageLoading(false);
      }
      setImageLoading(false);
    } catch (e) {
      setImageLoading(false);
    }
  };

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
        base64: true,
      });
      setVideoLoading(true);
      if (!result.cancelled) {
        uploadFileAsync(result.uri, handleUpload, "video");
      } else {
        setVideoLoading(false);
      }
    } catch (e) {
      setVideoLoading(false);
    }
  };

  const handleUpload = (result, type = "image") => {
    if (result) {
      setArticle({ ...article, [type]: result });
    }
    setImageLoading(false);
    setVideoLoading(false);
  };

  const handleUpdate = async (values, { setStatus, resetForm }) => {
    setTitleErrors("");
    setCategoriesErrors("");
    let isError = false;
    setReset(false);
    if (!values["title"] || values["title"].length == 0) {
      isError = true;
      setTitleErrors("Title is required");
    }

    if (article["categories"].length == 0) {
      isError = true;
      setCategoriesErrors("Pick at least 1");
    }

    if (isError) return;

    const data = {
      categories: article["categories"],
      title: values["title"],
      description: values["description"],
      content: contentHtml,
      image: article.image,
      video: article.video || "",
      is_delete: false,
      sort_no: "",
      status: article["status"],
      user_id: await getUserId(),
    };

    if (article["id"]) {
      await updateById("articles", data, article["id"]);
      Analytics.logEvent("article_edit", {
        uid,
        email,
        article_id: article["id"],
        time: new Date(),
      });
      ToastAndroid.show("Edit article successfully !!!", ToastAndroid.SHORT);
      navigation.navigate("Main", { screen: "My Article" });
      return;
    } else await createByTable("articles", data);
    resetForm({});
    setStatus({ success: true });
    setArticle({
      ...article,
      categories: [defaultArticle["categories"][0]],
      status: defaultArticle["status"],
      image: null,
      video: null,
    });
    Analytics.logEvent("article_create", {
      uid,
      email,
      // article_id: article["id"],
      time: new Date(),
    });
    setReset(true);
    ToastAndroid.show("Create article successfully !!!", ToastAndroid.SHORT);
  };

  const handleOnEditorChange = (html) => {
    setContentHtml(html);
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
            height: "100%",
          }}
        >
          <View style={styles.body}>
            <AppForm initialValues={article} onSubmit={handleUpdate}>
              <AppFormField
                label="Title"
                autoCapitalize="none"
                autoCorrect={false}
                name="title"
                placeholder="Input text"
                initValues={article["title"]}
                customErrors={titleErrors}
                reset={reset}
              />

              <AppFormField
                label="Description"
                autoCapitalize="none"
                autoCorrect={false}
                name="description"
                placeholder="Enter a description..."
                initValues={article["description"]}
                numberOfLines={4}
                multiline={true}
                height={80}
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
                value={article["categories"]}
                items={categoriesItems}
                onChangeValue={(value) =>
                  setArticle({ ...article, categories: value })
                }
                errors={categoriesErrors}
              />

              <AppFormDropDown
                label="Status"
                style={{
                  borderColor: "#979797",
                }}
                styleView={styles.status}
                zIndex={1}
                listMode="SCROLLVIEW"
                value={article["status"]}
                items={statusItems}
                onChangeValue={(value) =>
                  setArticle({ ...article, status: value })
                }
              />

              <TouchableOpacity onPress={pickImage}>
                {isImageLoading && (
                  <View style={[styles.img, styles.horizontal]}>
                    <ActivityIndicator
                      size={70}
                      style={{ opacity: 0.5 }}
                      animating={true}
                      color="tomato"
                    />
                  </View>
                )}
                {!isImageLoading && (
                  <View style={{ marginTop: 10 }}>
                    <AppText style={styles.label}>Image</AppText>
                    <Image
                      style={styles.img}
                      source={
                        article["image"]
                          ? {
                              uri: article["image"],
                            }
                          : require("../../assets/images/image.png")
                      }
                    />
                  </View>
                )}
              </TouchableOpacity>

              <View style={{ width: "100%" }}>
                <AppText style={styles.label}>Video</AppText>
              </View>
              <TouchableOpacity onPress={pickVideo}>
                {isVideoLoading && (
                  <View style={[styles.img, styles.horizontal]}>
                    <ActivityIndicator
                      size={70}
                      style={{ opacity: 0.5 }}
                      animating={true}
                      color="tomato"
                    />
                  </View>
                )}
                {!isVideoLoading && (
                  <View>
                    {!article["video"] && (
                      <Image
                        style={styles.img}
                        source={require("../../assets/images/video.png")}
                      />
                    )}
                    {article["video"]?.length > 0 && (
                      <Video
                        ref={video}
                        style={styles.video}
                        source={{
                          uri: article["video"],
                        }}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                        shouldPlay
                      />
                    )}
                  </View>
                )}
              </TouchableOpacity>

              <Editor
                value={article["content"]}
                callback={handleOnEditorChange}
                reset={reset}
              />
              <View style={{ padding: 5 }}></View>
              <SubmitButton title={route?.params?.data ? "Edit" : "Create"} />
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
    alignItems: "center",
  },
  img: {
    width: 330,
    height: 200,
    marginBottom: 20,
    backgroundColor: "#F3F5F7",
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
  status: {
    marginTop: 10,
  },
  video: {
    alignSelf: "center",
    width: 330,
    height: 200,
  },
});
