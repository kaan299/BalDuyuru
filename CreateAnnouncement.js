import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";

const faculties = ["GENEL DUYURU",
    "BURHANİYE UYGULAMALI BİLİMLER FAKÜLTESİ",
    "FEN-EDEBİYAT FAKÜLTESİ",
    "GÜZEL SANATLAR FAKÜLTESİ",
    "HUKUK FAKÜLTESİ",
    "İKTİSADİ VE İDARİ BİLİMLER FAKÜLTESİ",
    "İLAHİYAT FAKÜLTESİ",
    "MİMARLIK FAKÜLTESİ",
    "MÜHENDİSLİK FAKÜLTESİ",
    "NECATİBEY EĞİTİM FAKÜLTESİ",
    "SAĞLIK BİLİMLERİ FAKÜLTESİ",
    "SPOR BİLİMLERİ FAKÜLTESİ",
    "TIP FAKÜLTESİ",
    "TURİZM FAKÜLTESİ",
    "VETERİNER FAKÜLTESİ"];

export default function CreateAnnouncement({navigation}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("user", (user) => {
        }).then((user) => {
            setUser(JSON.parse(user));
        });
    }, []);

    const onSave = () => {

    }

    const onLogout = () => {
        AsyncStorage.removeItem("user").then(() => {
            navigation.navigate("Login");
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Duyuru Ekle</Text>
            {user != null &&
                <Text style={{marginBottom: 20}}>Akademisyen: {user.email}</Text>
            }
            <SelectDropdown
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.dropdownButton}
                data={faculties}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                defaultButtonText={"Duyuru Yapılacak Yer"}
            />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Başlık"
                    placeholderTextColor="#003f5c"/>
            </View>
            <View style={styles.inputMultiLineView}>
                <TextInput
                    style={styles.multiLineTextInput}
                    secureTextEntry
                    placeholder="İçerik"
                    multiline={true}
                    numberOfLines={3}
                    placeholderTextColor="#003f5c"/>
            </View>
            <TouchableOpacity
                onPress={onSave}
                style={styles.saveBtn}>
                <Text style={styles.loginText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onLogout}>
                <Text style={styles.forgotAndSignUpText}>Çıkış Yap</Text>
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
    dropdown: {
        paddingLeft: 10,
        paddingRight: 10
    },
    dropdownButton: {
        marginBottom: 20,
        width: '80%'
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
    inputMultiLineView: {
        width: "80%",
        borderRadius: 5,
        height: 200,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        backgroundColor: '#eee'
    },
    inputText: {
        height: 50,
    },
    multiLineTextInput: {
        height: 200,
    },
    saveBtn: {
        width: "80%",
        backgroundColor: "#008884",
        borderRadius: 5,
        color: "white",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20
    },
});