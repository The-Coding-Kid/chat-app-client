import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
} from "react-native";
import { Title, Button } from "react-native-paper";
import axios from "axios";

// querryDataBase();

const GroupsScreen = ({ navigation: { navigate } }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    querryDataBase();
  }, []);

  const querryDataBase = async () => {
    const response = await axios(
      "https://e285-98-37-209-152.ngrok.io/api/groups"
    );
    setData(response.data);
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={{}}>
          <Text>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Title>Public Groups</Title>
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
});

export default GroupsScreen;
