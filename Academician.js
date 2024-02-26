import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import Toast from "react-native-toast-message";
import {auth} from './firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AcademicianLogin({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onPressLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userInfo = JSON.stringify({email: user.email, name: user.displayName});
                AsyncStorage.setItem("user", userInfo).then(() => {
                    navigation.navigate("CreateAnnouncement");
                });
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: 'E-posta geçersiz'
                    });
                }

                if (error.code === 'auth/missing-password') {
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: 'Şifre geçersiz'
                    });
                }

                if (error.code === 'auth/invalid-credential') {
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: 'Kullanıcı bulunamadı'
                    });
                }
                console.log(error);
            });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}> Akademisyen Girişi</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Eposta"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setEmail(text)}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Şifre"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)}/>
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
        marginBottom: 20,
        marginTop: 20
    },
});