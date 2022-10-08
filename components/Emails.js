import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Emails() {
    const [emails, setEmails] = useState([]);

    useEffect(function () {
        async function getData() {
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails');
            const emails = await response.json();
            setEmails(emails);
        }

        getData();

    }, []);

    function renderItem({ item }) {
        return (
            <View style={styles.email}>
                <View style={styles.img}>
                </View>
                <View style={styles.info}>
                    <Text style={styles.from}>{item.to}</Text>
                    <Text style={styles.title}>{item.tittle}</Text>
                </View>
                <View style={styles.time}>
                    <Text>{item.time}</Text>
                    <FontAwesome5 name="star" size={16} color={item.star ? "yellow" : "black"} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.emails}>
            <Text>Caixa de Entrada</Text>
            <FlatList
                data={emails}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    emails: {
        flex: 1,
        backgroundColor: '#cecece',
        padding: 5
    },
    email: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#999',
        padding: 5,
        borderRadius: 10,
        marginVertical: 2,
        marginHorizontal: 5
    },
    img: {

        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    info: {
        backgroundColor: '#f0f',
        flex: 1,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        justifyContent: "space-between",
    },
    time: {
        width: 50,
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: '#f0f',
    },
    from: {
        fontSize:18
    },
    title:{
        fontSize: 15
    }
});
