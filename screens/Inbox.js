import React from "react";
//import { StatusBar } from "expo-status-bar";
//import Constants from "expo-constants";

import { View, StyleSheet, StatusBar } from "react-native";
import Emails from "../components/Emails";

export default function Inbox({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Emails navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
});
