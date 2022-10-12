import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function Reply({ route }) {
  const { id, to, subject } = route.params;
  const [reply, setReply] = useState("");
  const [emailSubject, setEmailSubject] = useState("Re:" + subject);

  const navigation = useNavigation();

  function handleSendReply() {
    ToastAndroid.show("Sent successfully", ToastAndroid.SHORT);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>To: {to}</Text>
        </View>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Subject:</Text>
          <TextInput
            style={styles.headerInput}
            onChangeText={(text) => setEmailSubject(text)}
            value={emailSubject}
          />
        </View>
      </View>

      <View style={styles.body}>
        <TextInput
          multiline
          onChangeText={(text) => setReply(text)}
          numberOfLines={10}
          value={reply}
          style={styles.input}
          editable
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleSendReply}
          style={styles.touchableIcon}
        >
          <FontAwesome name="send" size={24} color="#6b727f" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const borderColor = "#e5e7eb";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: "#f3f4f6",
  },
  header: {
    height: 80,
    backgroundColor: "#ffffff",
    padding: 10,
    borderColor: borderColor,
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerInput: {
    flex: 1,
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f3f4f6",
  },
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: borderColor,
  },
  input: {
    padding: 20,
    flex: 1,
    textAlignVertical: "top",
  },
  footer: {
    height: 60,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: borderColor,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableIcon: {
    padding: 18,
  },
});
