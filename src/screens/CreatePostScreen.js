import React, { useState, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const CreatePOstScreen = ({ navigation: { navigate } }) => {
  return (
    <TouchableWithoutFeedback keyboardShouldPersistTaps="always">
      <SafeAreaView style={[styles.container, styles.horizontal]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
            mode="contained"
          >
            Send
          </Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://media.brawltime.ninja/brawlers/bonnie/pins/Pin-Phew.png?size=160",
            }}
          />
          <View style={{ marginLeft: 30, marginTop: 30 }}>
            <TextInput
              style={{ height: 200 }}
              multiline
              placeholder="Something cooking?"
            ></TextInput>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default CreatePOstScreen;
