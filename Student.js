import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";

export default function StudentLogin() {
    const onPressLogin = () => {

    };

    const onPressForgotPassword = () => {

    };

    const onPressSignUp = () => {

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Öğrenci Girişi</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Eposta"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState({email: text})}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Şifre"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState({password: text})}/>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotAndSignUpText}>Şifremi Unuttum</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.forgotAndSignUpText}>Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
    );
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
        fontSize: 30,
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