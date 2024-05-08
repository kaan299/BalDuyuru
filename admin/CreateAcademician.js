import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import {adminUserKey, apiURL, departmentType, facultyType, generalType} from "../constants";
import {collection, getDocs, query, where, addDoc, Timestamp} from "firebase/firestore";
import {database} from "../firebase";
import Toast from "react-native-toast-message";
import {bolumRole, fakulteRole} from "../roles";

export default function CreateAcademician({navigation}) {
    const dropdownRef = useRef();
    const [user, setUser] = useState();
    const [faculties, setFaculties] = useState();
    const [departments, setDepartments] = useState();
    const [selectedFaculty, setSelectedFaculty] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    //ekrandaki seçim ve girdilere göre duyuru oluşturulur
    //yöneticilerde fakülte seçimi zorunlu değil. bölüm seçimi yapamıyor. admin bölüm bazında duyuru gösteremez.
    //eğer seçerse duyuru fakülte özelinde duyuru kaydedilir.
    //duyuru başlık ve içerik girilmediğinde uyarı verir.
    //fakülte seçilirle tipi fakülte olur.
    //seçilmezse tipi general olur.
    const onSave = () => {
        if (!selectedFaculty) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Fakülte seçin'
            });
            return;
        }

        if (!displayName) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Ad soyad girin'
            });
            return;
        }

        if (!email) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Eposta girin'
            });
            return;
        }

        if (!password) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Şifre girin'
            });
            return;
        }

        const data = {
            displayName: displayName,
            email: email,
            password: password,
            facultyId: selectedFaculty.id
        };

        if (selectedFaculty) {
            data.role = fakulteRole;
        }

        if (selectedDepartment) {
            data.departmentId = selectedDepartment.id;
            data.role = bolumRole;
        }

        fetch(apiURL + "/academicians", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            setSelectedFaculty(null);
            setDisplayName(null);
            setEmail(null);
            setPassword(null);
            dropdownRef.current.reset();

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Akademisyen başarıyla eklendi.'
            });
        }).catch(error => console.log(error));
    }

    //fakülteler listelenir
    const getFaculties = () => {
        const q = query(collection(database, 'faculties'));
        getDocs(q).then(snapshot => {
            const faculties = snapshot.docs.map(x => x.data());
            setFaculties(faculties);
            getDepartments(faculties[0].id);
        });
    }

    //fakülteye bağlı bölümler listelenir
    const getDepartments = (facultyId) => {
        const q = query(collection(database, 'departments'),
            where("facultyId", "==", facultyId));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setDepartments(data);
        });
    }

    //login olan yönetici bilgisini cihaz hafızasından getirir
    useEffect(() => {
        AsyncStorage.getItem(adminUserKey, (user) => {
        }).then((user) => {
            setUser(JSON.parse(user));
        });

        getFaculties();
    }, []);

    //fakülte seçimini state'te saklanır
    //bölüm listesi önceden fakülte seçilmişse temizlenir
    //seçilen fakülteye göre bölümler tekrar getirilir
    const onSelectFaculty = (selectedItem) => {
        setSelectedFaculty(selectedItem);
        setDepartments(undefined);
        getDepartments(selectedItem.id);
    }

    //seçilen bölüm bilgisi state'de saklanır
    const onSelectDepartment = (selectedItem) => {
        setSelectedDepartment(selectedItem);
    }

    return (
        <View style={styles.container}>
            <SelectDropdown
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.dropdownButton}
                data={faculties}
                defaultValueByIndex={0}
                defaultValue={selectedFaculty}
                onSelect={(selectedItem, index) => {
                    onSelectFaculty(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => item.name}
                defaultButtonText={"Fakülte Seçin"}
            />
            <SelectDropdown
                ref={dropdownRef}
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.dropdownButton}
                data={departments}
                disabled={!selectedFaculty}
                defaultValueByIndex={0}
                defaultValue={selectedDepartment}
                onSelect={(selectedItem, index) => {
                    onSelectDepartment(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => item.name}
                defaultButtonText={"Bölüm Seçin"}
            />
            <Text style={{textAlign: 'center', width: '80%', marginBottom: 15, marginTop: 5}}>
                Bölüm seçilmemesi durumunda akademisyen fakülte yetkilisi olacaktır.
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    defaultValue={displayName}
                    placeholder="Ad soyad"
                    onChangeText={(text) => setDisplayName(text)}
                    placeholderTextColor="#003f5c"/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    defaultValue={email}
                    placeholder="Eposta"
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#003f5c"/>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    defaultValue={password}
                    placeholder="Şifre"
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#003f5c"/>
            </View>
            <TouchableOpacity
                onPress={onSave}
                style={styles.saveBtn}>
                <Text style={styles.btnTxt}>Kaydet</Text>
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
        marginTop: 20,
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
    btnTxt: {
        color: "white",
        fontSize: 14
    },
});