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
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

const CreatePOstScreen = ({ navigation: { navigate } }) => {
  const [item, setItem] = useState("Public");
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = useState(false);

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
          contentContainerStyle={containerStyle}
          style={{ height: "90%" }}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <TouchableWithoutFeedback keyboardShouldPersistTaps="always">
        <View style={[styles.container, styles.horizontal]}>
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
                    name="add-circle-outline"
                    color="#3c65a0"
                    style={{ marginLeft: 10, marginTop: 1.5 }}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={{ height: 200, marginTop: 10 }}
                multiline
                placeholder="Something cooking?"
              ></TextInput>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
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
