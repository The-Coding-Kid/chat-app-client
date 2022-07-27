import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
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

const AccountScreen = ({ navigation: { navigate } }) => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    getFirstName();
  }, []);

  function getFirstName() {
    const ref = collection(db, "users");
    getDocs(ref)
      .then((response) => {
        const firstname = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setFirstName(firstname);
      })
      .catch((error) => console.log(error.message));
  }

  console.log(firstName);

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
        <Title>Account</Title>
        <Text>Email: {auth.currentUser?.email}</Text>
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
  },
});

export default AccountScreen;
