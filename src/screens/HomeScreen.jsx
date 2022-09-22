import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import {
  Title,
  Button,
  Searchbar,
  Card,
  Text,
  AnimatedFAB,
} from "react-native-paper";
import { auth } from "../../firebase_init";
import { StatusBar } from "expo-status-bar";
const mongoose = require("mongoose");
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { decode as atob, encode as btoa } from "base-64";
import ExpoFastImage from "expo-fast-image";
import * as ImageManipulator from "expo-image-manipulator";

const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = ({
  visible,
  animateFrom,
  style,
  navigation: { navigate },
}) => {
  const [heart, setHeart] = useState("heart-outline");
  const [color, setColor] = useState("black");
  const [DATA, setPosts] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [fabcolor, setFabColor] = useState("white");
  const [image, setImage] = useState("");

  const [isExtended, setIsExtended] = React.useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 5 };

  const getData = async () => {
    const response = await axios.post(
      "https://ed58-98-37-209-152.ngrok.io/api/posts",
      {
        email: auth.currentUser.email,
      }
    );
    setPosts(response.data);
    // console.log(response.data[0].image.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(750).then(() => setRefreshing(false));
    getData();
  }, []);

  const liked = (item) => {
    if (item == "heart-outline") {
      setHeart("heart");
      setColor("red");
    } else {
      setHeart("heart-outline");
      setColor("black");
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Card mode={"elevated"} style={styles.post}>
          <TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <ExpoFastImage
                style={styles.tinyLogo}
                cacheKey="item._id"
                uri={item.uri}
              />
              <View style={{ marginTop: 15, marginLeft: 5 }}>
                <Text style={{ fontWeight: "bold" }}>{item.createdByName}</Text>
                <Text style={{ marginTop: 5, color: "#cdcccf" }}>
                  {item.createdAt.slice(0, 10)}
                </Text>
              </View>
            </View>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>
              {item.content}
            </Text>
            <ExpoFastImage style={styles.image} source={{ uri: item.image }} />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              borderColor: "#cdcccf",
              borderWidth: 1,
              marginTop: 10,
            }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                liked(heart);
              }}
            >
              <Ionicons name={heart} size={25} color={color} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chatbox-outline" size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="arrow-redo-outline" size={25} />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stuff}>
        <Searchbar style={styles.searchbar} />
        <ScrollView
          style={{ marginTop: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={onScroll}
          scrollEventThrottle={20}
        >
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={5} // Reduce initial render amount
            maxToRenderPerBatch={2} // Reduce number in each render batch
            windowSize={11} // Reduce the window size
          />
        </ScrollView>
      </View>
      <AnimatedFAB
        icon={"plus"}
        label={"Create"}
        extended={isExtended}
        onPress={() => navigate("Create Post")}
        visible={visible}
        animateFrom={"right"}
        // iconMode={"static"}
        style={[styles.fabStyle, style, fabStyle]}
        // color={"#0079fd"}
        // fabStyle={{ backgroundColor: "blue" }}
        theme={{
          roundness: 20,
          colors: {
            primary: "#ffff",
            underlineColor: "transparent",
          },
          backgroundColor: {
            primary: "white",
          },
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  searchbar: {
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
  },
  stuff: {},
  post: {
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
    paddingBottom: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    width: "98%",
    height: 200,
    marginTop: 10,
    marginLeft: 2.5,
    borderRadius: 10,
    maxHeight: 700,
    maxWidth: 700,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
    // backgroundColor: "white",
  },
});

export default HomeScreen;
