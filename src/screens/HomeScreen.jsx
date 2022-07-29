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
} from "react-native";
import { Title, Button, Searchbar, Card, Text } from "react-native-paper";
import { db, auth } from "../../firebase_init";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
const mongoose = require("mongoose");
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { decode as atob, encode as btoa } from "base-64";

const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
};

const HomeScreen = ({ navigation: { navigate } }) => {
  const [heart, setHeart] = useState("heart-outline");
  const [color, setColor] = useState("black");
  const [DATA, setPosts] = useState("");

  const getData = async () => {
    const response = await axios(
      "https://e285-98-37-209-152.ngrok.io/api/posts"
    );
    setPosts(response.data);
    // console.log(response.data[0].image.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // const DATA = [
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     username: "Aravindkrishna A",
  //     title: "First Item",
  //     profilePhoto:
  //       "https://atripco.net/wp-content/uploads/2021/12/Profile-testimonal-1.jpg",
  //     datePosted: "06.10.2022",
  //     description:
  //       "I went to Starr Park and saw Bonnie and Stu/ I also saw the stunt show. Woohoo!",
  //     image:
  //       "https://blog.brawlstars.com/uploaded-images/954008081_1655279220.jpg?mtime=20220615074700",
  //     heart: "heart-outline",
  //   },
  //   {
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     title: "Second Item",
  //     username: "Rohit V",
  //     profilePhoto:
  //       "https://atripco.net/wp-content/uploads/2021/12/Profile-testimonal-1.jpg",
  //     datePosted: "01.08.2022",
  //     description:
  //       "I played brawl stars for 26 hours in a day! Look at all the brawlers I got.",
  //     image:
  //       "https://www.ginx.tv/uploads2/Various/Brawl_Stars/Brawl_Stars_cover.jpg",
  //   },
  //   {
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     title: "Third Item",
  //     username: "Da Boss",
  //     profilePhoto:
  //       "https://atripco.net/wp-content/uploads/2021/12/Profile-testimonal-1.jpg",
  //     datePosted: "01.08.2022",
  //     description:
  //       "I played brawl stars for 26 hours in a day! Look at all the brawlers I got.",
  //     image:
  //       "https://www.ginx.tv/uploads2/Various/Brawl_Stars/Brawl_Stars_cover.jpg",
  //   },
  // ];

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
    var base64Flag = "data:image/jpeg;base64,";
    var imageStr = arrayBufferToBase64(item.image.data.data);
    var image = base64Flag + imageStr;
    return (
      <View>
        <Card mode={"elevated"} style={styles.post}>
          <TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.tinyLogo}
                source={{ uri: item.profilePhoto }}
              />
              <View style={{ marginTop: 15, marginLeft: 5 }}>
                <Text style={{ fontWeight: "bold" }}>{item.createdByName}</Text>
                <Text style={{ marginTop: 5, color: "#cdcccf" }}>
                  {item.createdAt}
                </Text>
              </View>
            </View>
            <Text style={{ marginTop: 10, marginLeft: 10 }}>
              {item.content}
            </Text>
            <Image style={styles.image} source={{ uri: image }} />
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
    <View style={styles.container}>
      <View style={styles.stuff}>
        <Searchbar style={styles.searchbar} />
        <ScrollView style={{ marginTop: 10 }}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  searchbar: {
    width: "90%",
    marginTop: "5%",
    marginLeft: "5%",
  },
  stuff: {
    marginTop: 30,
  },
  post: {
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
    height: 375,
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
  },
});

export default HomeScreen;
