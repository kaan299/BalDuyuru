import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {studentUserKey} from "../constants";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import SelectDropdown from "react-native-select-dropdown";
import Toast from "react-native-toast-message";

export default function ChooseFacultyDepartment({navigation}) {
    const [faculties, setFaculties] = useState();
    const [departments, setDepartments] = useState();
    const [selectedFaculty, setSelectedFaculty] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();

    const getFaculties = () => {
        const q = query(collection(database, 'faculties'));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setFaculties(data);
        });
    }

    useEffect(() => {
        getFaculties();
    }, []);

    const getDepartments = (facultyId) => {
        const q = query(collection(database, 'departments'),
            where("facultyId", "==", facultyId));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setDepartments(data);
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

    const onSave = () => {
        if (!selectedFaculty) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Fakülte seçin'
            });
            return;
        }

        if (!selectedDepartment) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Bölüm seçin'
            });
            return;
        }
        const data = {
            facultyId: selectedFaculty.id,
            facultyName: selectedFaculty.name,
            departmentId: selectedDepartment.id,
            departmentName: selectedDepartment.name,
        };

        AsyncStorage.setItem(studentUserKey, JSON.stringify(data)).then(() => {
            navigation.navigate("Announcements");
        });
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <Text style={styles.title}> BalDuyuru</Text>
            <SelectDropdown
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.dropdownButton}
                data={faculties}
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
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.dropdownButton}
                data={departments}
                disabled={!selectedFaculty}
                onSelect={(selectedItem, index) => {
                    onSelectDepartment(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => item.name}
                defaultButtonText={"Bölüm Seçin"}
            />
            <TouchableOpacity
                onPress={onSave}
                style={styles.studentLoginBtn}>
                <Text style={styles.loginText}>Seçimleri Kaydet</Text>
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
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#000",
        marginBottom: 20
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
    studentLoginBtn: {
        width: "80%",
        backgroundColor: "#008884",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
    academicianLoginBtn: {
        width: "80%",
        backgroundColor: "#30b8be",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
    adminLoginBtn: {
        width: "80%",
        backgroundColor: "#2aabde",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
    loginText: {
        color: "white"
    },
    dropdown: {
        paddingLeft: 10,
        paddingRight: 10
    },
    dropdownButton: {
        marginBottom: 20,
        width: '80%'
    },
});
