import React, { useState, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { auth, db } from "../../firebase_init";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

const CreatePOstScreen = ({ navigation: { navigate } }) => {
  const [item, setItem] = useState("Public");
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [image, setData] = useState(null);
  const [text, setText] = useState("");
  const [character, setCharacter] = useState(0);
  const [uri, setUri] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [email1, setEmail1] = useState(auth.currentUser.email);
  const [data, setData2] = useState("");

  const getUserInfo = () => {
    // console.log("Email:" + email1);
    axios
      .post("https://e285-98-37-209-152.ngrok.io/api/user", {
        email: email1,
      })
      .then((res) => {
        // console.log(res.data);
        setData2(res.data);
      });
  };

  const whenTyping = (event) => {
    setText(event);
    if (text.length != 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const compressImage = async (image) => {
    const manipResult = await manipulateAsync(image.localUri || image.uri, {
      compress: 0.0000000000000000000000000000000000000000001,
      format: SaveFormat.JPEG,
    });
    setUri(manipResult);
  };

  const uploadPhoto = async () => {
    let formData = new FormData();

    let string = image.uri;

    // setUri(image.uri);

    compressImage(image);

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
    console.log(image.uri);

    formData.append("content", text);
    formData.append("createdByName", data.first_name + " " + data.last_name);
    formData.append("createdByEmail", data.email);

    // await fetch("https://e285-98-37-209-152.ngrok.io/api/posts/create", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }).then((res) => console.log(res));

    let res = await fetch(
      "https://e285-98-37-209-152.ngrok.io/api/posts/create",
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
  useEffect(() => {
    getUserInfo();
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setData(null);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const showModal = () => {
    Keyboard.dismiss();
    setVisible(true);
  };
  const hideModal = () => setVisible(false);

  const showModalForCamera = () => {
    Keyboard.dismiss();
    setVisible2(true);
  };
  const hideModalForCamera = () => setVisible2(false);
  const containerStyle = {
    backgroundColor: "white",
    height: "65%",
    marginTop: "90%",
    padding: 10,
    borderRadius: 10,
  };

  const containerCameraStyle = {
    backgroundColor: "white",
    height: "90%",
    marginTop: "50%",
    borderRadius: 10,
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.0000000001,
    });

    if (result.cancelled === false) {
      //@ts-ignore
      setData(result);
    }
  };

  return (
    <Provider>
      <Portal>
        <Modal
          animationType="slide"
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ height: "90%" }}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          animationType="slide"
          visible={visible2}
          onDismiss={hideModalForCamera}
          contentContainerStyle={containerCameraStyle}
          style={{ height: "90%" }}
        >
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              setCameraRef(ref);
            }}
            ratio="0.474:0.266"
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={40}
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>
              <Ionicons
                name="ellipse-outline"
                color="white"
                size={75}
                style={{
                  position: "absolute",
                  marginTop: "140%",
                  marginLeft: "41%",
                }}
                onPress={async () => {
                  if (cameraRef) {
                    let photo = await cameraRef.takePictureAsync();
                    setData(photo);
                    console.log(photo);
                    hideModalForCamera();
                  }
                }}
              />
            </View>
          </Camera>
        </Modal>
      </Portal>
      <TouchableWithoutFeedback keyboardShouldPersistTaps="always">
        <View style={[styles.container, styles.horizontal]}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <Button onPress={() => navigate("HomeTab")}>
                <Text style={{ color: "black" }}>Cancel</Text>
              </Button>
              <Button
                style={{
                  marginTop: 10,
                  backgroundColor: "#3c65a0",
                  alignSelf: "center",
                  marginRight: 10,
                  borderRadius: 100,
                }}
                disabled={disabled}
                mode="contained"
                onPress={async () => {
                  navigate("Loading");
                  await uploadPhoto();
                }}
              >
                Send
              </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: "https://media.brawltime.ninja/brawlers/bonnie/pins/Pin-Phew.png?size=160",
                  cache: "only-if-cached",
                }}
              />
              <View style={{ marginLeft: 30, marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      height: 30,
                      width: 100,
                      alignItems: "center",
                      borderWidth: 1,
                      justifyContent: "center",
                      borderRadius: 100,
                      borderColor: "#3c65a0",
                    }}
                    onPress={showModal}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#3c65a0" }}>{item}</Text>
                      <Text> </Text>
                      <Ionicons
                        name={"chevron-down-outline"}
                        size={17.5}
                        color={"#3c65a0"}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={showModalForCamera}>
                    <Ionicons
                      name="camera-outline"
                      color="#3c65a0"
                      style={{ marginLeft: 10, marginTop: 1.5 }}
                      size={25}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={pickImage}>
                    <Ionicons
                      name="image-outline"
                      color="#3c65a0"
                      style={{ marginLeft: 10, marginTop: 1.5 }}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={{
                    height: 200,
                    marginTop: 10,
                    width: 275,
                  }}
                  multiline
                  placeholder="Something cooking?"
                  onChangeText={(event) => {
                    whenTyping(event);
                  }}
                  maxLength={200}
                ></TextInput>
                <Text style={{ color: "gray" }}>{text.length}/200</Text>
              </View>
            </View>
            {image && (
              <Image
                //@ts-ignore
                source={{ uri: image.uri, cache: "only-if-cached" }}
                style={styles.imageStyle}
              />
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexGrow: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  camera: {
    height: "100%",
  },
  imageStyle: {
    width: "73.5%",
    height: 300 * 1.5,
    margin: 7.5,
    marginTop: 30,
    borderRadius: 20,
    marginLeft: "13.25%",
  },
});

export default CreatePOstScreen;
