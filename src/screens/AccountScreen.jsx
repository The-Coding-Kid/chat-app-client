import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
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
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const AccountScreen = ({ navigation: { navigate } }) => {
  const [firstName, setFirstName] = useState("");
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [email1, setEmail1] = useState(auth.currentUser.email);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [uri, setUri] = useState(null);

  const uploadPhoto = async () => {
    let formData = new FormData();

    let string = image.uri;

    setUri(image.uri);

    // compressImage(image);

    let file_name = " ";
    //@ts-ignore
    for (let i = 0; i < image.uri.length; i++) {
      //@ts-ignore
      let substr = string.substring(i, image.uri.length);
      if (!substr.includes("/")) {
        file_name = substr;
        break;
      }
    }
    formData.append("file", {
      uri: image.uri,
      type: "image/jpeg",
      name: Date.now() + file_name,
    });

    console.log(data.profile_picture);

    formData.append("email", email1);

    // await fetch("https://e717-98-37-181-150.ngrok.io/api/posts/create", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }).then((res) => console.log(res));

    let res = await fetch(
      "https://e717-98-37-181-150.ngrok.io/api/profile/updatephoto",
      {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log("response: ", res);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.0000000001,
    });

    if (result.cancelled === false) {
      //@ts-ignore
      setImage(result);
    }
    uploadPhoto();
  };

  const getUserInfo = () => {
    console.log("Email:" + email1);
    axios
      .post("https://e717-98-37-181-150.ngrok.io/api/user", {
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
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            backgroundColor: "blue",
            position: "absolute",
            marginTop: -30,
            margnRight: 2500,
            zIndex: 0,
            marginTop: 150,
            backgroundColor: "#3c65a0",
          }}
          onPress={(event) => {
            pickImage(event);
          }}
        >
          <Ionicons
            name={"pencil"}
            size={25}
            style={{ marginLeft: 12.5, marginTop: 12.5 }}
            color={"white"}
          />
        </TouchableOpacity>
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
