import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import defaultStyles from "../config/styles";
import * as ImagePicker from "expo-image-picker";

export default function Editor({ value, callback }) {
  const [htmlData, setHtmlData] = useState("");
  const _editor = React.createRef();

  useEffect(() => {
    (async () => {
      if (!value || value == "") {
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
  }, [value]);

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
        htmlData.length,
        "image",
        `data:image/jpeg;base64,${result.base64}`
      );
    }
  };

  const handleSelectionChange = async (data) => {
    const { range } = data;
    if (range) {
      if (range.length === 0) {
        console.log("User cursor is on", range.index);
      } else {
        var text = await this._editor.current?.getText(
          range.index,
          range.length
        );
        console.log("User has highlighted", text);
      }
    } else {
      console.log("Cursor not in the editor");
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <QuillToolbar
        styles={customStyles}
        editor={_editor}
        options="full"
        theme="light"
        custom={{
          handler: customHandler,
          actions: ["image"],
        }}
      />

      <View style={styles.viewInner}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
          contentContainerStyle={{flexGrow: 1}}
        >
          <QuillEditor
            style={styles.editor}
            theme={{ placeholder: defaultStyles.colors.placeholder }}
            quill={{
              placeholder: "Type content...",
              modules: {
                toolbar: false,
                // toolbar: [
                //   { font: [] },
                //   { header: [1, 2, 3, 4, 5, 6, false] },
                //   "bold",
                //   "italic",
                //   "underline",
                //   "strike",
                //   "blockquote",
                //   "code-block",
                //   { color: [] },
                //   { background: [] },
                //   { align: [] },
                //   "link",
                //   "image",
                //   "video",
                //   { list: "ordered" },
                //   { list: "bullet" },
                //   { script: "sub" },
                //   { script: "super" },
                //   { indent: "-1" },
                //   { indent: "+1" },
                //   { direction: "rtl" },
                //   { size: ["small", false, "large", "huge"] },
                // ],
              },
            }}
            container={true}
            ref={_editor}
            onHtmlChange={handleOnHtmlChange}
            onSelectionChange={handleSelectionChange}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    width: "100%",
    borderColor: "#979797",
    borderWidth: 1,
    backgroundColor: "red",
    height: 200
  },

  viewInner: {
    marginTop: 30,
    flex: 1,
    // width: "100%",
  },
  
  editor: {
    flex: 1,
    minHeight: 200,
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




























































// import React, { useState, useEffect } from "react";
// import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
// import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
// import defaultStyles from "../config/styles";
// import * as ImagePicker from "expo-image-picker";
// import {CustomContainer} from './CustomContainer';



// export default function Editor({ value, callback }) {
//   const [htmlData, setHtmlData] = useState("");
//   const _editor = React.createRef();
//   const [disabled, setDisabled] = useState(false);

//   useEffect(() => {
//     (async () => {
//       if (!value || value == "") {
//         _editor.current?.deleteText(0, htmlData.length);
//       }
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, [value]);

//   const handleOnHtmlChange = ({ html }) => {
//     setHtmlData(html);
//     callback(html);
//   };

//   const customHandler = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       quality: 1,
//       base64: true,
//     });
//     if (!result.cancelled) {
//       _editor.current?.insertEmbed(
//         htmlData.length,
//         "image",
//         `data:image/jpeg;base64,${result.base64}`
//       );
//     }
//   };

//   const handleSelectionChange = async (data) => {
//     const { range } = data;
//     if (range) {
//       if (range.length === 0) {
//         console.log("User cursor is on", range.index);
//       } else {
//         var text = await this._editor.current?.getText(
//           range.index,
//           range.length
//         );
//         console.log("User has highlighted", text);
//       }
//     } else {
//       console.log("Cursor not in the editor");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <QuillToolbar
//         styles={customStyles}
//         editor={_editor}
//         options="full"
//         theme="light"
//         custom={{
//           handler: customHandler,
//           actions: ["image"],
//         }}
//       />

//       <View style={styles.viewInner}>
//         <ScrollView
//           nestedScrollEnabled={true}
//           showsVerticalScrollIndicator={true}
//           persistentScrollbar={true}
//           contentContainerStyle={{flexGrow: 1}}
//         >
//           <QuillEditor
//             style={styles.editor}
//             theme={{ placeholder: defaultStyles.colors.placeholder }}
//             quill={{
//               placeholder: "Type content...",
//               modules: {
//                 toolbar: false,
//                 // toolbar: [
//                 //   { font: [] },
//                 //   { header: [1, 2, 3, 4, 5, 6, false] },
//                 //   "bold",
//                 //   "italic",
//                 //   "underline",
//                 //   "strike",
//                 //   "blockquote",
//                 //   "code-block",
//                 //   { color: [] },
//                 //   { background: [] },
//                 //   { align: [] },
//                 //   "link",
//                 //   "image",
//                 //   "video",
//                 //   { list: "ordered" },
//                 //   { list: "bullet" },
//                 //   { script: "sub" },
//                 //   { script: "super" },
//                 //   { indent: "-1" },
//                 //   { indent: "+1" },
//                 //   { direction: "rtl" },
//                 //   { size: ["small", false, "large", "huge"] },
//                 // ],
//               },
//             }}
//             container={true}
//             ref={_editor}
//             onHtmlChange={handleOnHtmlChange}
//             onSelectionChange={handleSelectionChange}
//           />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontWeight: "bold",
//     alignSelf: "center",
//     paddingVertical: 10,
//   },
//   root: {
//     flex: 1,
//     width: "100%",
//     borderColor: "#979797",
//     borderWidth: 1,
//     backgroundColor: "red",
//     height: 200
//   },

//   viewInner: {
//     marginTop: 30,
//     flex: 1,
//     // width: "100%",
//   },
  
//   editor: {
//     flex: 1,
//     minHeight: 200,
//     borderColor: "#979797",
//     borderWidth: 0.3,
//   },
// });

// const customStyles = {
//   toolbar: {
//     provider: (provided) => ({
//       ...provided,
//       borderColor: "#979797",
//       borderTopWidth: 0,
//       borderLeftWidth: 0,
//     }),
//     root: (provided) => ({
//       ...provided,
//       backgroundColor: defaultStyles.colors.white,
//       width: "100%",
//     }),
//   },
// };
