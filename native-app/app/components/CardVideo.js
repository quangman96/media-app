import React, { useState, useRef, useCallback, createRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Button,
} from "react-native";
import AppText from "../components/Text";
import ChipList from "../components/ChipList";
import { Feather } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import { useNavigation } from "@react-navigation/core";
import {
  createSavedData,
  deleteSavedData,
  getUserId,
  softDelete,
} from "../../firebase";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import YoutubePlayer from "react-native-youtube-iframe";
// import VideoPlayer from "react-native-video-player";

export default function CardVideo({ cardObj }) {
  const refView = useRef(null);
  const refVideo = useRef(null);
  const calculateTime = (time) => {
    const date = Math.floor(Math.abs(new Date() - new Date(time)) / 86400000);
    let z = 0;
    if (date > 365) {
      z = `${Math.floor(date / 365)} years ago`;
    } else if (date > 30) {
      z = `${Math.floor(date / 30)} months ago`;
    } else {
      z = `${date} days ago`;
    }
    return z === `0 days ago` ? `just new` : z;
  };

  const getYouTubeGetID = (url) => {
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  };

  const handleOnPress = () => {
    console.log("aaaaaaa");
    // console.log(refView);
    // refView.current.focus();
    // refVideo.current.playAsync();
    // refVideo.current.stopAsync();
  };

  return (
    <TouchableOpacity style={styles.area} onPress={handleOnPress}>
      <View style={styles.form}>
        {cardObj["isYoutube"] ? (
          <View style={{ marginTop: 20 }}>
            {/* <YoutubePlayer height={190} videoId={"iee2TATGMyI"} /> */}
            <YoutubePlayer
              height={190}
              videoId={getYouTubeGetID(cardObj["video"])}
            />
          </View>
        ) : (
          // <VideoPlayer
          //   video={{
          //     uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          //   }}
          //   videoWidth={1600}
          //   videoHeight={900}
          //   thumbnail={{ uri: "https://picsum.photos/200/300" }}
          // />

          <Video
            style={styles.video}
            source={{
              uri: cardObj["video"],
            }}
            // posterSource={{ uri: "https://picsum.photos/200/300" }}
            // usePoster={true}
            useNativeControls
            resizeMode="contain"
            isLooping
            ref={refVideo}
          />

          // <View style={{ backgroundColor: "yellow" }} ref={refView}>
          //   <VideoPlayer
          //     videoProps={{
          //       shouldPlay: false,
          //       resizeMode: Video.RESIZE_MODE_CONTAIN,
          //       source: {
          //         uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          //       },
          //     }}
          //     style={{
          //       videoBackgroundColor: "transparent",
          //       controlsBackgroundColor: "red",
          //       height: 200,
          //     }}
          //   />
          //   <Video
          //     style={styles.video}
          //     source={{
          //       uri: cardObj["video"],
          //     }}
          //     // posterSource={{ uri: "https://picsum.photos/200/300" }}
          //     // usePoster={true}
          //     useNativeControls
          //     resizeMode="contain"
          //     isLooping
          //     ref={refVideo}
          //   />
          // </View>
        )}

        <AppText style={styles.time}>
          {calculateTime(cardObj["create_at"])}
        </AppText>

        <AppText numberOfLines={2} style={styles.title}>
          {cardObj["title"]}
        </AppText>

        <AppText numberOfLines={3} style={styles.description}>
          {cardObj["description"]}
        </AppText>

        <View style={styles.footer}>
          <ChipList
            isFull={true}
            customStyles={styles.categories}
            key={cardObj.id}
            data={cardObj["categories"]}
          ></ChipList>
          {/* <AppText style={styles.time}>
            {calculateTime(cardObj["create_at"])}
          </AppText> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  area: {
    width: "100%",
  },
  form: {
    position: "relative",
    width: "100%",
    flex: 1,
    minHeight: 170,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  title: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginBottom: 5,
  },
  description: {
    color: "#667080",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 15,
  },
  footer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    // marginTop: 5,
    marginBottom: 10,
  },
  categories: {
    flexWrap: "wrap",
    marginTop: 5,
    // width: '50%'
  },
  time: {
    alignSelf: "flex-end",
    marginTop: -10,
    // position: "absolute",
    // right: 0,
    color: "#F6CA56",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 22,
  },
});

// import React, { useState, useRef } from "react";
// import { View, StyleSheet, Button } from 'react-native';
// import { Video, AVPlaybackStatus } from 'expo-av';

// export default function CardVideo() {
//   const video = useRef(null);
//   const [status, setStatus] = useState({});
//   return (
//     <View>
//       <Video
//         ref={video}
//         style={styles.video}
//         source={{
//           uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//         }}
//         useNativeControls
//         resizeMode="contain"
//         isLooping
//         onPlaybackStatusUpdate={status => setStatus(() => status)}
//       />
//       <View style={styles.buttons}>
//         <Button
//           title={status.isPlaying ? 'Pause' : 'Play'}
//           onPress={() =>
//             status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
//           }
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//   },
// //   video: {
// //     alignSelf: 'center',
// //     width: 320,
// //     height: 200,
// //   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
