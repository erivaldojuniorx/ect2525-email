import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";

export default function Email({ route }) {
  const { id } = route.params;
  const [email, setEmail] = useState([]);
  const [star, setStar] = useState(false);
  const navigation = useNavigation();

  useEffect(function () {
    async function getData() {
      const response = await fetch(
        "https://mobile.ect.ufrn.br:3002/emails/" + id
      );
      const email = await response.json();
      setStar(email.star);
      setEmail(email);
    }

    getData();
  }, []);

  function htmlTemplate(body) {
    if (!body) {
      return "";
    }

    const css =
      "body{font-size:18pt; color:'black'; background-color: #ffffff}";

    const html =
      "<!DOCTYPE html>" +
      "<html>" +
      "<head>" +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />' +
      `<style>${css}</style>` +
      "</head>" +
      "<body>" +
      body +
      "</body>" +
      "</html>";
    return html;
  }

  function hStartEmail() {
    setStar(!star);
  }

  function hDeleteEmail() {
    Alert.alert("Confirmation", "Delete email?", [
      {
        text: "Cancelar",
      },
      {
        text: "Yes",
        onPress: () => {
          ToastAndroid.show("Email has been deleted", ToastAndroid.SHORT);
          navigation.goBack();
        },
      },
    ]);
  }

  function hArchiveEmail() {
    ToastAndroid.show("Email has been archived", ToastAndroid.SHORT);
    navigation.goBack();
  }

  function hReplyEmail() {
    navigation.navigate("Reply", {
      id: email.id,
      to: email.from,
      subject: email.tittle,
    });
  }

  function hForwardEmail() {
    navigation.navigate("Forward", { email });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.picture} source={{ uri: email.picture }} />
        <View style={styles.headerCenter}>
          <Text style={styles.from}>from: {email.from}</Text>
          <Text style={styles.from}>to: {email.to}</Text>
          <Text style={styles.subject}>{email.tittle}</Text>
        </View>
        <View style={styles.headerEnd}>
          <Text style={styles.time}>{email.time}</Text>
          <FontAwesome
            name="star"
            size={32}
            color={star ? "#facc15" : "#f3f4f6"}
            onPress={hStartEmail}
          />
        </View>
      </View>
      <View style={styles.body}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: htmlTemplate(email.body) }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={hDeleteEmail} style={styles.touchableIcon}>
          <FontAwesome name="trash" {...iconProps} />
        </TouchableOpacity>
        <TouchableOpacity onPress={hArchiveEmail} style={styles.touchableIcon}>
          <FontAwesome name="archive" {...iconProps} />
        </TouchableOpacity>
        <TouchableOpacity onPress={hReplyEmail} style={styles.touchableIcon}>
          <FontAwesome name="mail-reply" {...iconProps} />
        </TouchableOpacity>
        <TouchableOpacity onPress={hForwardEmail} style={styles.touchableIcon}>
          <FontAwesome name="mail-forward" {...iconProps} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const borderColor = "#e5e7eb";

const iconProps = {
  size: 24,
  color: "#6b727f",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#ffffff",
    padding: 10,
    borderColor: borderColor,
    borderWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  picture: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 30,
  },
  headerCenter: {
    paddingLeft: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  headerEnd: {
    width: 70,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  from: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subject: {
    color: "#6b727f",
    fontSize: 18,
  },
  time: {
    color: "#3736a0",
    fontSize: 14,
    backgroundColor: "#e0e8fe",
    borderRadius: 5,
    paddingHorizontal: 5,
    alignSelf: "flex-end",
  },
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: borderColor,
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
    justifyContent: "space-between",
  },
  touchableIcon: {
    padding: 18,
  },
});
