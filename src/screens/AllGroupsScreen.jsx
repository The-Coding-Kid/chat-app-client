import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Title, Button, Subheading } from "react-native-paper";
import axios from "axios";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase_init";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const AllGroupsScreen = ({ navigation: { navigate } }) => {
  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState("hey");
  const [user, setUser] = useState("");

  const getDaOtherInfo = () => {
    axios
      .post("https://ed58-98-37-209-152.ngrok.io/api/user", {
        email: auth.currentUser.email,
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.groups_joined);
        // console.log(user);
      });
  };
  const joinDaGroup = (theID, theName) => {
    axios
      .post("https://ed58-98-37-209-152.ngrok.io/api/groups/join", {
        email: auth.currentUser.email,
        group_id: theID,
        group_name: theName,
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.groups_joined);
        // console.log(user);
      });
  };

  console.log(user);

  useEffect(() => {
    querryDataBase();
    getDaOtherInfo();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(750).then(() => setRefreshing(false));
    querryDataBase();
  }, []);

  const querryDataBase = () => {
    axios
      .post("https://ed58-98-37-209-152.ngrok.io/api/groups/notjoined", {
        email: auth.currentUser.email,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        // console.log(posts);
      });
  };

  const renderItem = ({ item }) => {
    const theID = item._id;
    const theName = item.name;
    // const doesItInclude = user.includes(theName);

    // console.log(doesItInclude);

    // console.log(item.posts);
    return (
      <View>
        <Card mode={"elevated"} style={styles.post}>
          <ImageBackground
            source={{
              uri: item.background,
            }}
            style={{ height: 100, borderRadius: 100 }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                  marginLeft: 10,
                }}
              >
                {item.name}
              </Text>
              {/* <Ionicons
                style={{ marginLeft: "50%" }}
                name={"chevron-forward-outline"}
                size={60}
              /> */}
            </View>
          </ImageBackground>
          <Button
            style={{
              marginTop: 20,
              backgroundColor: "#3c65a0",
              width: 200,
              alignSelf: "center",
            }}
            mode={"contained"}
            onPress={() => {
              try {
                joinDaGroup(theID, theName);
                navigate("Details", {
                  posts: item.posts,
                  id: item._id,
                });
              } catch {
                console.log("bob");
              }
            }}
          >
            Join
          </Button>
        </Card>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // onScroll={onScroll}
    >
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        {/* <Title style={{ fontSize: 30 }}>Public Groups</Title> */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={5} // Reduce initial render amount
          maxToRenderPerBatch={2} // Reduce number in each render batch
          windowSize={11} // Reduce the window size
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  post: {
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
    paddingBottom: 20,
    width: "95%",
    height: 200,
  },
});

export default AllGroupsScreen;
