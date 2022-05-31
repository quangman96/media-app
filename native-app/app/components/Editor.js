import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import defaultStyles from "../config/styles";
import AppText from "../components/Text";

export default function Editor({ value, callback, reset = false }) {
  const [htmlData, setHtmlData] = useState("");
  const _editor = React.createRef();
  const [editorHeight, setEditorHeight] = useState(400);
  const [cursorIndex, setCurSorIndex] = useState(0);

  useEffect(() => {
    (async () => {
      if (!value || value == "" || reset) {
        _editor.current?.deleteText(0, htmlData.length);
      }
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, [value, reset]);

  const handleOnHtmlChange = ({ html }) => {
    setHtmlData(html);
    callback(html);
  };

  const customHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      _editor.current?.insertEmbed(
        cursorIndex,
        "image",
        `data:image/jpeg;base64,${result.base64}`
      );
    }
  };

  const handleSelectionChange = async (data) => {
    const { range } = data;
    if (range && range.length === 0) {
      setCurSorIndex(range.index);
    }
  };

  const handleOnDimensionsChange = ({ height, width }) => {
    setEditorHeight(height);
  };

  const handleOnEditorChange = ({ name, args }) => {
    if (args[2] == "silent") {
      const { index } = args[0];
      setCurSorIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <AppText style={styles.label}>Content</AppText>
      <View style={styles.viewInnerParrent} onTouchStart={() => _editor.current?.blur()}>
        <QuillToolbar
          styles={customStyles}
          editor={_editor}
          theme="light"
          custom={{
            handler: customHandler,
            actions: ["image"],
          }}
          options={[
            "bold",
            { size: ["small", false, "large", "huge"] },
            { font: [] },
            { color: [] },
            { background: [] },
            { align: [] },
            "image",
            // "link",
            { list: "ordered" },
            { list: "bullet" },
            "blockquote",
            "code-block",
          ]}
        />

        <View style={styles.viewInner}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            persistentScrollbar={true}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <QuillEditor
              style={[styles.editor, { minHeight: editorHeight }]}
              theme={{ placeholder: defaultStyles.colors.placeholder }}
              quill={{
                placeholder: "Type content...",
                modules: {
                  toolbar: false,
                },
              }}
              initialHtml={value}
              container={true}
              ref={_editor}
              onHtmlChange={handleOnHtmlChange}
              onSelectionChange={handleSelectionChange}
              onDimensionsChange={handleOnDimensionsChange}
              onEditorChange={handleOnEditorChange}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },

  root: {
    flex: 1,
    width: "100%",
  },

  viewInnerParrent: {

    flex: 1,
    width: "100%",
    borderColor: "#979797",
    borderWidth: 1,
    height: 500,
  },

  viewInner: {
    flex: 1,
  },

  editor: {
    flex: 1,
    borderColor: "#979797",
    borderWidth: 0.3,
  },
});

const customStyles = {
  toolbar: {
    provider: (provided) => ({
      ...provided,
      borderColor: "#979797",
      borderTopWidth: 0,
      borderLeftWidth: 0,
    }),
    root: (provided) => ({
      ...provided,
      backgroundColor: defaultStyles.colors.white,
      width: "100%",
    }),
  },
};
