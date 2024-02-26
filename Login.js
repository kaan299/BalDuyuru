import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}) {
    AsyncStorage.getItem("user", (user) => {
        navigation.navigate("CreateAnnouncement");
    }).then((user) => {
    });

    return (
        <View style={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logo}/>
            <Text style={styles.title}> BalDuyuru</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Announcements")}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Öğrenci Girişi</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("AcademicianLogin")}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Akademisyen Girişi</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#000",
        marginBottom: 20
    },
    inputView: {
        width: "80%",
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        backgroundColor: '#eee'
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgotAndSignUpText: {
        color: "black",
        fontSize: 14
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#0bbe8a",
        borderRadius: 5,
        color: "white",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
});
