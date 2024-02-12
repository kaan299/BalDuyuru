import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";

export default function Login({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Giriş Yap</Text>
            <TouchableOpacity
                onPress={()=> navigation.navigate("StudentLogin")}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Öğrenci Girişi</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> navigation.navigate("AcademicianLogin")}
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
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#000",
        marginBottom: 40,
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
        backgroundColor: "#fb5b5a",
        borderRadius: 5,
        color: "white",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20
    },
});
