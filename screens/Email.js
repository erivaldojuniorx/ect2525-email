import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { WebView } from "react-native-webview";
import { FontAwesome } from "@expo/vector-icons";

export default function Email({ route }) {
  const { id } = route.params;
  const [email, setEmail] = useState([]);

  useEffect(function () {
    async function getData() {
      const response = await fetch(
        "https://mobile.ect.ufrn.br:3002/emails/" + id
      );
      const email = await response.json();
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

  function fakeEmail(name) {
    if (!name) {
      return "";
    }

    const userName = name.toLowerCase().replace(" ", ".");
    return userName + "@email.com";
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.picture} source={{ uri: email.picture }} />
        <View style={styles.headerCenter}>
          <Text style={styles.from}>{email.from}</Text>
          <Text style={styles.subject}>{email.tittle}</Text>
          <Text style={styles.subject}>{fakeEmail(email.from)}</Text>
        </View>
        <View style={styles.headerEnd}>
          <Text style={styles.time}>{email.time}</Text>
          <FontAwesome
            name="star"
            size={25}
            color={email.star ? "#facc15" : "#f3f4f6"}
          />
        </View>
      </View>
      <View style={styles.body}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: htmlTemplate(email?.body) }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#ffffff",
    padding: 10,
    borderColor: "#e5e7eb",
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
    fontSize: 18,
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
    borderColor: "#e5e7eb",
  },
});
