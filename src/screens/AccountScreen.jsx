import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { Title, Button } from "react-native-paper";
import { auth, db } from "../../firebase_init";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { Video, AVPlaybackStatus } from "expo-av";
import axios from "axios";

const AccountScreen = ({ navigation: { navigate } }) => {
  const [firstName, setFirstName] = useState("");
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [email1, setEmail1] = useState(auth.currentUser.email);
  const [data, setData] = useState([]);

  const getUserInfo = () => {
    console.log("Email:" + email1);
    axios
      .post("https://e285-98-37-209-152.ngrok.io/api/user", {
        email: email1,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    const _ = () => {
      getUserInfo();
    };
    _();
    console.log(data);
  }, []);

  const SignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
        navigate("Sign In");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const ref = collection(db, "users");
  // console.log(ref);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stuff}>
        {/* <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://storage.googleapis.com/chat-app-storage/IMG_6629.MOV",
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        /> */}
        <Title>
          Welcome {data.first_name} {data.last_name}
        </Title>
        <Image
          source={{
            uri: data.profile_picture,
          }}
          style={styles.tinyLogo}
        />
        <Text>Email: {data.email}</Text>
        <Button
          style={{
            marginTop: 10,
            backgroundColor: "#3c65a0",
            width: 200,
            alignSelf: "center",
          }}
          mode={"contained"}
          onPress={SignOut}
        >
          Sign out
        </Button>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          Hello
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  stuff: {
    marginTop: 30,
    alignItems: "center",
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default AccountScreen;
