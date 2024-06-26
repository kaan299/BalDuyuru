import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import Toast from "react-native-toast-message";
import {auth, database} from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, getDocs, query, where} from "firebase/firestore";
import {bolumRole, fakulteRole} from "../roles";
import {academicianUserKey} from "../constants";
import Spinner from "react-native-loading-spinner-overlay";

export default function AcademicianLogin({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    //eposta ve şifre ile giriş yapılır
    //giriş yapılan bilgiler bulunamazsa ilgili hata mesajı gösterilir.(örn. şifre geçersiz, eposta geçersiz, kullanıcı bulunamadı)
    //giriş yapan kişinin yetkisi fakülte veya bölüm yetkilisi değişse uyarı mesajı gösterir
    //giriş başarılı ve yetki geçerli ise ilgili sayfaya yönlendirilir
    const onPressLogin = () => {
        setShowSpinner(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                const q = query(collection(database, 'roles'), where('userId', '==', user.uid));
                getDocs(q).then(snapshot => {
                    const userRole = snapshot.docs[0].data();
                    if (userRole.roles.includes(fakulteRole) || userRole.roles.includes(bolumRole)) {
                        const userInfo = JSON.stringify({
                            id: user.uid,
                            email: user.email,
                            name: user.displayName,
                            roles: userRole.roles,
                            facultyId: userRole.facultyId,
                            departmentId: userRole.departmentId
                        });
                        AsyncStorage.setItem(academicianUserKey, userInfo).then(() => {
                            setShowSpinner(false);
                            navigation.navigate("Academician");
                        });
                    } else {
                        setShowSpinner(false);
                        Toast.show({
                            type: 'error',
                            position: 'bottom',
                            text1: 'Yetki bulunamadı'
                        });
                    }
                }).catch(error => {
                    setShowSpinner(false);
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text1: 'Yetki bulunamadı'
                    });
                });
            })
            .catch((error) => {
                setShowSpinner(false);
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
            });
    };

    return (
        <View style={styles.container}>
            <Spinner
                visible={showSpinner}
                textContent={'Lütfen bekleyin...'}
            />
            <Text style={styles.title}> Akademisyen Girişi</Text>
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