import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import Toast from "react-native-toast-message";
import {auth} from './firebase'

export default function Signup() {
    var [displayName, setDisplayName] = useState("");
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");

    const onPressSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: displayName
                });
                console.log(user);
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Kayıt başarılı'
                })
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: 'Bu kullanıcı zaten mevcut'
                    });
                }

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
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Hesap Oluştur</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Ad soyad"
                    placeholderTextColor="#003f5c"
                    autoCapitalize='none'
                    onChangeText={text => setDisplayName(text)}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Eposta"
                    placeholderTextColor="#003f5c"
                    autoCapitalize='none'
                    secureTextEntry={false}
                    onChangeText={text => setEmail(text)}/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry={true}
                    placeholder="Şifre"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)}/>
            </View>
            <TouchableOpacity
                onPress={onPressSignup}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Hesap Oluştur</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Signin")}>
                <Text style={styles.forgotAndSignUpText}>Giriş Yap</Text>
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