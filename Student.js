import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import Toast from 'react-native-toast-message';
import {auth} from './firebase'
import {signInWithEmailAndPassword} from "firebase/auth";

export default function StudentLogin({navigation}) {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");

    const onPressLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Giriş başarılı'
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
            <Text style={styles.title}> Öğrenci Girişi</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Eposta"
                    placeholderTextColor="#003f5c"
                    autoCapitalize='none'
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
        height: 50
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