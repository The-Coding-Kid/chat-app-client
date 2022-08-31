import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import {
  Title,
  Button,
  Searchbar,
  Card,
  Text,
  AnimatedFAB,
} from "react-native-paper";
import ExpoFastImage from "expo-fast-image";
import { Ionicons } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const DetailScreen = ({ route, navigation: { navigate, goBack } }) => {
  const { posts, id } = route.params;
  const [newPosts, setNewPosts] = useState("");
  const [data, setData2] = useState("");
  const [heart, setHeart] = useState("heart-outline");
  const [color, setColor] = useState("black");

  const liked = (item) => {
    if (item == "heart-outline") {
      setHeart("heart");
      setColor("red");
    } else {
      setHeart("heart-outline");
      setColor("black");
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(750).then(() => setRefreshing(false));
    getData();
  }, []);

  const getDaInfo = () => {
    axios
      .post("https://ed58-98-37-209-152.ngrok.io/api/posts/getlist", {
        id: posts,
      })
      .then((res) => {
        // console.log(res.data);
        setNewPosts(res.data);
        // console.log(data);
      });
  };

  useEffect(() => {
    getDaInfo();
  }, []);

  const renderItem = ({ item }) => {
    console.log(item);

    const theEmail = item.createdByEmail;
    // console.log(theEmail);

    const getDaOtherInfo = () => {
      axios
        .post("https://ed58-98-37-209-152.ngrok.io/api/user", {
          email: theEmail,
        })
        .then((res) => {
          // console.log(res.data);
          setData2(res.data.profile_picture);
          // console.log(data);
        });
    };

    getDaOtherInfo();

    return (
      <View>
        <Card mode={"elevated"} style={styles.post}>
          <TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <ExpoFastImage
                style={styles.tinyLogo}
                cacheKey="item._id"
                source={{ uri: data }}
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

  //   console.log(newPosts);
  return (
    <SafeAreaView backgroundColor={"white"}>
      <TouchableOpacity onPress={() => goBack()}>
        <Ionicons
          name="arrow-back-outline"
          size={25}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      <FlatList
        data={newPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={5} // Reduce initial render amount
        maxToRenderPerBatch={2} // Reduce number in each render batch
        windowSize={11} // Reduce the window size
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

export default DetailScreen;
