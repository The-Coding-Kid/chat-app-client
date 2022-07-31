import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase_init";
import { db } from "../../firebase_init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
import urid from "urid";

const SignUpScreen = ({ navigation: { navigate } }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // <-- add this line
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const image = "https://pbs.twimg.com/media/Ev8RQYqXMAAqwGj.jpg";

  const createUser = async () => {
    let formData = new FormData();

    let string = "";

    let file_name = " ";
    //@ts-ignore
    for (let i = 0; i < image.length; i++) {
      //@ts-ignore
      let substr = string.substring(i, image.length);
      if (!substr.includes("/")) {
        file_name = substr;
        break;
      }
    }
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: file_name + Date.now(),
    });
    console.log(image.uri);

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);

    // await fetch("https://e285-98-37-209-152.ngrok.io/api/posts/create", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }).then((res) => console.log(res));

    let res = await fetch("https://e285-98-37-209-152.ngrok.io/api/register", {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response: ", res);
  };

  const CreateNewUser = async () => {
    const docData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      user_id: urid(),
    };
    const NameCollectionRef = collection(db, "users");
    await addDoc(NameCollectionRef, { docData });
  };

  const handleSignUp = async () => {
    await createUser();
    navigate("Blank");
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials.user;
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Title style={{ marginTop: 100, fontSize: 30, alignSelf: "center" }}>
          Sign up for [insert name here]
        </Title>
        <Image
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
            marginTop: 20,
            cache: "only-if-cached",
          }}
          source={{
            uri: "https://hershey-montessori.org/wp-content/uploads/2020/03/facebook-logo.png",
          }}
        />
        <TextInput
          style={{ marginTop: 20, width: 300, alignSelf: "center" }}
          value={firstName}
          onChangeText={setFirstName}
          left={
            <TextInput.Icon
              name={() => <Ionicons name="person-outline" size={25} />}
            />
          }
          label={"First Name"}
          mode="outlined"
          theme={{
            roundness: 20,
            colors: {
              primary: "#3c65a0",
              underlineColor: "transparent",
            },
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{ marginTop: 20, width: 300, alignSelf: "center" }}
          value={lastName}
          onChangeText={setLastName}
          keyboardType="email-address"
          left={
            <TextInput.Icon
              name={() => <Ionicons name="person-outline" size={25} />}
            />
          }
          label={"Last Name"}
          mode="outlined"
          theme={{
            roundness: 20,
            colors: {
              primary: "#3c65a0",
              underlineColor: "transparent",
            },
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{ marginTop: 20, width: 300, alignSelf: "center" }}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          left={
            <TextInput.Icon
              name={() => <Ionicons name="mail-outline" size={25} />}
            />
          }
          label={"Email"}
          mode="outlined"
          theme={{
            roundness: 20,
            colors: {
              primary: "#3c65a0",
              underlineColor: "transparent",
            },
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{ marginTop: 20, width: 300, alignSelf: "center" }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          keyboardType="email-address"
          left={
            <TextInput.Icon
              name={() => <Ionicons name="key-outline" size={25} />}
            />
          }
          label={"Password"}
          mode="outlined"
          theme={{
            roundness: 20,
            colors: {
              primary: "#3c65a0",
              underlineColor: "transparent",
            },
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          labelStyle={{ color: "#3c65a0" }}
          mode="text"
          onPress={() => navigate("Sign In")}
        >
          Have an account? Sign in instead
        </Button>
        <Button
          style={{
            marginTop: 10,
            backgroundColor: "#3c65a0",
            width: 200,
            alignSelf: "center",
          }}
          mode={"contained"}
          onPress={() => {
            handleSignUp();
          }}
        >
          Sign up
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
