import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Title, Button } from "react-native-paper";
import axios from "axios";

const querryDataBase = async () => {
  const response = await axios(
    "https://e717-98-37-181-150.ngrok.io/api/posts",
    { responseType: "blob" }
  );
  console.log(response);
};
// querryDataBase();

const MyGroupsScreen = ({ navigation: { navigate } }) => {
  useEffect(() => {
    querryDataBase();
  }, []);
  return (
    <View>
      <Title>My Groups</Title>
    </View>
  );
};

export default MyGroupsScreen;
