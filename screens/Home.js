import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import Emails from "../components/Emails";

export default function Home({navigation}){
    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Emails/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight
    }
  });