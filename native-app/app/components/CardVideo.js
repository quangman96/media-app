import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
// import VideoPlayer from "expo-video-player";
import YoutubePlayer from "react-native-youtube-iframe";
import ChipList from "../components/ChipList";
import AppText from "../components/Text";
// import VideoPlayer from "react-native-video-player";

export default function CardVideo({ cardObj, pauseAnotherVideo }) {
  const timerRef = useRef(null);
  const refVideo = useRef(null);
  const [showPoster, setShowPoster] = useState(false);
  const [statusPlay, setStatusPlay] = React.useState({});
  const [playingYoutube, setPlayingYoutube] = useState(cardObj["isPlaying"]);

  useEffect(() => {
    if (!cardObj["isPlaying"]) {
      refVideo?.current?.pauseAsync();
      setPlayingYoutube(false);
    }
  }, [cardObj["isPlaying"]]);

  useEffect(() => {
    if (statusPlay.isPlaying) pauseAnotherVideo(cardObj["id"]);
  }, [statusPlay.isPlaying]);

  useEffect(() => {
    if (playingYoutube) {
      pauseAnotherVideo(cardObj["id"]);
    }
  }, [playingYoutube]);

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

  const validateYoutubeUrl = (url) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(regex);
  };

  const handleOnPressInVideo = () => {
    setShowPoster(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowPoster(true);
    }, 3000);
  };

  const handleOnPressVideo = () => {
    if (statusPlay.isPlaying) {
      refVideo.current.stopAsync();
    } else {
      refVideo.current.playAsync();
    }
  };

  const handleOnPlayChange = (status) => {
    setDisplayPoster(status);
    setStatusPlay(status);
  };

  const handleOnReadyForDisplay = () => {
    setDisplayPoster(statusPlay);
  };

  const setDisplayPoster = (status) => {
    clearTimeout(timerRef.current);
    if (status.isPlaying) {
      setShowPoster(false);
    } else {
      timerRef.current = setTimeout(() => {
        setShowPoster(true);
      }, 3000);
    }
  };

  const handleOnFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    if (fullscreenUpdate == 3 && !statusPlay.isPlaying) setShowPoster(false);
  };

  const handleOnStateYoutubeChange = (state) => {
    if (state == "paused") setPlayingYoutube(false);
    else setPlayingYoutube(true);
  };

  const renderPoster = () => {
    return (
      showPoster && (
        <Image
          style={styles.videoPoster}
          source={require(`../../assets/images/button-icon-png-21060.png`)}
          resizeMode="contain"
        />
      )
    );
  };

  return (
    <TouchableOpacity style={styles.area}>
      <View style={styles.form}>
        {validateYoutubeUrl(cardObj["url"]) ? (
          <View>
            <YoutubePlayer
              height={220}
              play={playingYoutube}
              videoId={getYouTubeGetID(cardObj["url"])}
              onChangeState={handleOnStateYoutubeChange}
            />
          </View>
        ) : (
          <TouchableWithoutFeedback
            onPressIn={handleOnPressInVideo}
            onPress={handleOnPressVideo}
          >
            <View style={styles.videoComponent}>
              <Video
                style={styles.nativeVideoControls}
                source={{ uri: cardObj["url"] }}
                resizeMode="contain"
                isLooping
                ref={refVideo}
                useNativeControls
                ignoreSilentSwitch="ignore"
                onReadyForDisplay={handleOnReadyForDisplay}
                onPlaybackStatusUpdate={handleOnPlayChange}
                onFullscreenUpdate={handleOnFullscreenUpdate}
              />
              {renderPoster()}
            </View>
          </TouchableWithoutFeedback>
        )}

        <View style={styles.content}>
          <AppText style={styles.time}>
            {calculateTime(cardObj["create_at"])}
          </AppText>

          <AppText numberOfLines={2} style={styles.title}>
            {cardObj["title"]}
          </AppText>

          <View style={styles.footer}>
            <ChipList
              isFull={true}
              customStyles={styles.categories}
              key={cardObj.id}
              data={cardObj["categories"]}
            ></ChipList>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nativeVideoControls: {
    top: 0,
    height: "100%",
  },
  videoComponent: {
    width: "100%",
    height: "auto",
    minWidth: "100%",
    aspectRatio: 16 / 9,
  },
  videoContainer: {
    height: "auto",
  },
  videoPoster: {
    position: "absolute",
    alignSelf: "center",
    top: 0,
    bottom: "-5%",
    width: "20%",
    minWidth: "20%",
    height: "auto",
    aspectRatio: 16 / 9,
  },
  area: {
    width: "100%",
  },
  form: {
    position: "relative",
    width: "100%",
    flex: 1,
    minHeight: 170,
  },
  content: {
    margin: 15,
  },
  title: {
    color: "#667080",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginBottom: 5,
  },
  footer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  categories: {
    flexWrap: "wrap",
    marginTop: 5,
  },
  time: {
    alignSelf: "flex-end",
    marginTop: -10,
    color: "#F6CA56",
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 22,
  },
});
