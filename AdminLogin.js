import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {database} from "./firebase";
import {collection, where, query, getDocs} from 'firebase/firestore'

export default function AdminLogin({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onPressLogin = () => {
        console.log('database', database);
        const q = query(collection(database, "admins"),
            where('email', '==', email),
            where('password', '==', password));
        getDocs(q).then(docs => {
            console.log(docs.docs);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Yönetici Girişi</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Eposta"
                    placeholderTextColor="#003f5c"
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoCompleteType='email'
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
                onPress={onPressLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Giriş Yap</Text>
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
        backgroundColor: "#30b8be",
        borderRadius: 5,
        color: "white",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20
    },
    loginText: {
        color: "white"
    }
});