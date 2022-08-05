import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AccountScreen from "./src/screens/AccountScreen";
import GroupsScreen from "./src/screens/AllGroupsScreen";
import { Ionicons } from "@expo/vector-icons";
import Blank from "./src/screens/blank";
import { StatusBar } from "expo-status-bar";
import CreatePOstScreen from "./src/screens/CreatePostScreen";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Loading from "./src/screens/loadingScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyGroupsScreen from "./src/screens/MyGroupsScreen";
import ChatScreen from "./src/screens/ChatScreen";
import DetailScreen from "./src/screens/DetailsScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   version: 3,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: "#3498db",
//     secondary: "#f1c40f",
//     tertiary: "#a1b2c3",
//   },
// };
const HomeTab = () => {
  //FIXME: I don't know how to style the words on each tab. Or make it go away. Will it look better without the labels?
  return (
    <Tab.Navigator
      activeTintColor="#black"
      inactiveTintColor="white"
      tabBarLabelStyle={{ color: "white" }}
      barStyle={{ backgroundColor: "#30bfbf", margin: 10 }}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "planet-outline";
            color = focused ? "#0079fd" : "#7a7a7a";
          } else if (route.name === "Accounts") {
            iconName = "person-circle-outline";
            color = focused ? "#0079fd" : "#7a7a7a";
          } else if (route.name === "Groups") {
            iconName = "people-circle-outline";
            color = focused ? "#0079fd" : "#7a7a7a";
          } else if (route.name === "Chat") {
            iconName = "chatbubbles-outline";
            color = focused ? "#0079fd" : "#7a7a7a";
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupTabs}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

function GroupTabs() {
  return (
    <TopTab.Navigator>
      <Tab.Screen
        name=" "
        component={GroupsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="  "
        component={MyGroupsScreen}
        options={{ headerShown: false }}
      />
    </TopTab.Navigator>
  );
}

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen
            name="Sign In"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Blank"
            component={Blank}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Create Post"
            component={CreatePOstScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
