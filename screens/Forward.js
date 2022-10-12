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

export default function Forward({ route }) {
  const { email } = route.params;
  const [emailBody, setEmailBody] = useState(forwardHeader(email));
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("Fwd:" + email.tittle);

  const navigation = useNavigation();

  function forwardHeader(email) {
    return (
      "\n\n" +
      "---------- Forwarded message ---------\n" +
      `From: ${email.from}\n` +
      `Date: ${email.time}\n` +
      `Subject: ${email.tittle}\n` +
      `To: ${email.to}\n` +
      email.body +
      "\n"
    );
  }

  function hSendReply() {
    ToastAndroid.show("Sent successfully", ToastAndroid.SHORT);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>To:</Text>
          <TextInput
            style={styles.headerInput}
            onChangeText={(text) => setEmailTo(text)}
            value={emailTo}
          />
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
          onChangeText={(text) => setEmailBody(text)}
          numberOfLines={50}
          value={emailBody}
          style={styles.input}
          editable
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={hSendReply} style={styles.touchableIcon}>
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
  subject: {
    color: "#6b727f",
    fontSize: 18,
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
