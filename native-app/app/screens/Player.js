import { StyleSheet, Button, View } from "react-native";
// import Video from "react-native-video";
// import VideoPlayer from "react-native-video-controls";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { uploadImageAsync } from "../../firebase";

export default function Player() {
  const video = React.useRef(null);
  const [videoUri, setVideoUri] = useState(
    "https://firebasestorage.googleapis.com/v0/b/new-app-97a36.appspot.com/o/uploads%2Fvideo-1652777632641?alt=media&token=a813fb17-1e1b-4245-98f5-56886176da30"
  );
  const [isImageLoading, setImageLoading] = useState(false);
  const [status, setStatus] = useState({});
  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        base64: true,
      });
      // return;
      setImageLoading(true);
      if (!result.cancelled) {
        setVideoUri(result.uri);
        return;
        try {
          uploadImageAsync(result.uri, handleUpload, "video");
        } catch (e) {
          console.log(e);
        }
      } else {
        setImageLoading(false);
      }
    } catch (e) {
      setImageLoading(false);
    }
  };
  const handleUpload = (result) => {
    if (result) {
      // setUser({ ...user, avatar: result });
      console.log(result);
    }
    setImageLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoUri,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <View style={styles.buttons}>
          <Button
            title={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
          <View style={{ margin: 50, marginTop: 0 }}></View>
          <Button title={"Select"} onPress={pickVideo} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
