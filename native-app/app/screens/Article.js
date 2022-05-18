import React, { useState, useEffect } from "react";
import Screen from "../components/Screens";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";
import {
  getAll,
  getUserProfile,
  getMasterData,
  updateOne,
  createUser,
  uploadImageAsync,
  getUserId,
  auth,
  createArticle,
} from "../../firebase";
import DropDownPicker from "react-native-dropdown-picker";
import AppText from "../components/Text";
import * as ImagePicker from "expo-image-picker";
import Editor from "../components/Editor";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().required("Title is required"),
});

export default function Article() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [statusItems, setStatusItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setImageLoading] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState([]);
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [defaultArticle, setDefaultArticle] = useState({});
  const [contentHtml, setContentHtml] = useState("");
  const [article, setArticle] = useState({
    title: "",
    description: "",
    categories: [],
    status: "",
    image: "",
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

      setCategoriesItems(categoriesData);
      setCategoryValue([categoriesData[0].value]);

      setStatusItems(statusData);
      setStatusValue(statusData[0].value);
      const data = {
        title: "",
        description: "",
        categories: [categoriesData[0].value],
        status: statusData[0].value,
        image: "",
        content: "",
      };
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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      setImageLoading(true);
      if (!result.cancelled) {
        uploadImageAsync(result.uri, handleUpload);
      } else {
        setImageLoading(false);
      }
      setImageLoading(false);
    } catch (e) {
      setImageLoading(false);
    }
  };

  const handleUpload = (result) => {
    if (result) {
      setArticle({ ...article, image: result });
    }
    setImageLoading(false);
  };

  const handleUpdate = async (values, { setStatus, resetForm }) => {
    const data = {
      categories: categoryValue,
      title: values["title"],
      description: values["description"],
      content: contentHtml,
      image: article.image,
      is_delete: false,
      sort_no: "",
      status: values["status"],
    };
    await createArticle(data);
    resetForm({});
    setStatus({ success: true });
    setArticle({
      title: null,
      description: null,
      categories: [defaultArticle["categories"][0]],
      status: defaultArticle["status"],
      image: null,
      content: null,
    });
    setCategoryValue([defaultArticle["categories"][0]]);
    setStatusValue(defaultArticle["status"]);
    setContentHtml("");
    ToastAndroid.show("Create article successfully !!!", ToastAndroid.SHORT);
  };

  const handleOnEditorChange = (html) => {
    setContentHtml(html);
  }

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
            <AppForm
              initialValues={article}
              onSubmit={handleUpdate}
              validationSchema={validationSchema}
            >
              <AppFormField
                label="Title"
                autoCapitalize="none"
                autoCorrect={false}
                name="title"
                placeholder="Input text"
                initValues={article["title"]}
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
                height={76}
              />

              {/* <View style={styles.inline}> */}
              <View style={styles.dropdown}>
                <AppText style={styles.label}>Category</AppText>
                <DropDownPicker
                  open={categoryOpen}
                  value={categoryValue}
                  items={categoriesItems}
                  setOpen={setCategoryOpen}
                  setValue={setCategoryValue}
                  setItems={setCategoriesItems}
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
                />
              </View>

              <View style={[styles.dropdown, { marginTop: 10 }]}>
                <AppText style={styles.label}>Status</AppText>
                <DropDownPicker
                  style={{
                    borderColor: "#979797",
                  }}
                  zIndex={1}
                  open={statusOpen}
                  value={statusValue}
                  items={statusItems}
                  setOpen={setStatusOpen}
                  setValue={setStatusValue}
                  setItems={setStatusItems}
                  listMode="SCROLLVIEW"
                />
              </View>
              {/* </View> */}

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

              {/* <Editor style={{width: "100%", borderColor: "#979797", borderWidth: 1}} /> */}
              <Editor value={article['content']} callback={handleOnEditorChange} />
              <View style={{ padding: 5 }}></View>
              <SubmitButton title="Create" />
              <View style={{ paddingBottom: 30 }}></View>
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
  inline: {
    position: "relative",
    width: "100%",
    padding: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    width: 330,
    height: 200,
    marginBottom: 20,
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
  dropdown: {
    width: "100%",
  },
  label: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 10,
  },
});
