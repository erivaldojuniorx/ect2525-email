import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Emails({ navigation }) {
  const [emails, setEmails] = useState([]);

  useEffect(function () {
    async function getData() {
      const response = await fetch("https://mobile.ect.ufrn.br:3002/emails");
      const emails = await response.json();
      setEmails(emails);
    }

    getData();
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.email}
        onPress={() => navigation.navigate("Email", { id: item.id })}
      >
        <Image
          style={styles.img}
          source={{
            uri: item.picture,
          }}
        />
        <View style={styles.center}>
          <Text style={styles.from}>
            {item.from} - {item.tittle}
          </Text>
          <Text style={styles.title}>{item.summary}</Text>
        </View>
        <View style={styles.end}>
          <Text>{item.time}</Text>
          <FontAwesome
            name="star"
            size={23}
            color={item.star ? "#facc15" : "#f3f4f6"}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          data={emails}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const borderColor = "#dfe3e7";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    backgroundColor: "#f3f4f6",
  },
  flatList: {
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor,
    //paddingVertical: 5,
  },
  email: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  end: {
    width: 50,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  from: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#282a36",
  },
  title: {
    fontSize: 15,
  },
});
