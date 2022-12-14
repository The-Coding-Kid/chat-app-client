import React, { useState, useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Loading = ({ navigation: { navigate } }) => {
  const refresh = React.useCallback(() => {
    wait(5000).then(() => navigate("HomeTab"));
  }, []);

  refresh();
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Loading;
