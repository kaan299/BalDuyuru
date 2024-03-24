import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import {academicianUserKey, departmentType, facultyType} from "../constants";
import {collection, getDocs, query, where, addDoc, Timestamp} from "firebase/firestore";
import {database} from "../firebase";
import Toast from "react-native-toast-message";
import {bolumRole, fakulteRole} from "../roles";

export default function CreateAnnouncement({navigation}) {
    const dropdownRef = useRef();
    const [faculties, setFaculties] = useState();
    const [departments, setDepartments] = useState();
    const [selectedFaculty, setSelectedFaculty] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [user, setUser] = useState();

    const onSave = () => {
        if (!title) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Başlık girin'
            });
            return;
        }

        if (!content) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'İçerik girin'
            });
            return;
        }

        const data = {
            title: title,
            content: content,
            createdDate: Timestamp.fromDate(new Date()),
            userId: user.id
        };

        if (selectedFaculty) {
            data.facultyId = selectedFaculty.id;
            data.type = facultyType;
        }

        if (selectedDepartment) {
            data.facultyId = selectedFaculty.id;
            data.departmentId = selectedDepartment.id;
            data.type = departmentType;
        }

        addDoc(collection(database, "announcement"), data).then(() => {
            setSelectedFaculty(null);
            setTitle(null);
            setContent(null);
            dropdownRef.current.reset();

            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Duyuru Başarıyla Gönderildi'
            });
        });
    }

    const getFaculties = () => {
        const q = query(collection(database, 'faculties'));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            const faculties = data.filter(f => f.id == user.facultyId);
            setFaculties(faculties);
            setSelectedFaculty(faculties[0]);
            getDepartments(faculties[0].id);
        });
    }

    const getDepartments = (facultyId) => {
        const q = query(collection(database, 'departments'),
            where("facultyId", "==", facultyId));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            if (user.roles.includes(bolumRole)) {
                const departments = data.filter(d => d.id == user.departmentId);
                setDepartments(departments);
                setSelectedDepartment(departments[0]);
            } else if (user.roles.includes(fakulteRole)) {
                setDepartments(data);
            }
        });
    }

    useEffect(() => {
        AsyncStorage.getItem(academicianUserKey, (user) => {
        }).then((user) => {
            setUser(JSON.parse(user));
        });
    }, []);

    useEffect(() => {
        if (user) {
            getFaculties();
        }
    }, [user]);

    const onLogout = () => {
        AsyncStorage.removeItem(academicianUserKey).then(() => {
            navigation.navigate("Login");
        });
    }

    const onSelectFaculty = (selectedItem) => {
        setSelectedFaculty(selectedItem);
        setDepartments(undefined);
        getDepartments(selectedItem.id);
    }

    const onSelectDepartment = (selectedItem) => {
        setSelectedDepartment(selectedItem);
    }

    return (
        <View style={styles.container}>
            <SelectDropdown
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.dropdownButton}
                data={faculties}
                disabled={true}
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
                disabled={(user && user.roles.includes(bolumRole)) || !selectedFaculty}
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
                Bölüm seçilmemesi durumunda duyurunuz fakülte duyurusu olacaktır.
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    defaultValue={title}
                    placeholder="Başlık"
                    onChangeText={(text) => setTitle(text)}
                    placeholderTextColor="#003f5c"/>
            </View>
            <View style={styles.inputMultiLineView}>
                <TextInput
                    style={styles.multiLineTextInput}
                    placeholder="İçerik"
                    defaultValue={content}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={(text) => setContent(text)}
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
});