import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {studentUserKey} from "../constants";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import SelectDropdown from "react-native-select-dropdown";
import Toast from "react-native-toast-message";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

function handleRegistrationError(errorMessage) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
    }
    const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
    if (!projectId) {
        handleRegistrationError('Project ID not found');
    }
    try {
        const pushTokenString = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
    } catch (e) {
        handleRegistrationError(`${e}`);
    }
}

export default function ChooseFacultyDepartment({navigation}) {
    const notificationListener = useRef();
    const responseListener = useRef();

    const [faculties, setFaculties] = useState();
    const [departments, setDepartments] = useState();
    const [selectedFaculty, setSelectedFaculty] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();

    //öğrencinin seçmesi için fakülte listesi getirir
    const getFaculties = () => {
        const q = query(collection(database, 'faculties'));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setFaculties(data);
        });
    }

    //öğrencinin seçmesi için fakülte listesini sayfa yüklendiğinde getirir
    useEffect(() => {
        getFaculties();
    }, []);

    //öğrencinin seçmesi için bölüm listesi getirir
    const getDepartments = (facultyId) => {
        const q = query(collection(database, 'departments'),
            where("facultyId", "==", facultyId));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setDepartments(data);
        });
    }

    //seçilen fakülteyle ilişkili bölümleri getirir ve seçilen fakülteyi state'de saklar
    // önceden seçilmiş fakülte varsa seçilen fakülte değişeceği için bölüm listesini boşaltır
    const onSelectFaculty = (selectedItem) => {
        setSelectedFaculty(selectedItem);
        setDepartments(undefined);
        getDepartments(selectedItem.id);
    }

    //seçilen bölümünü state'de saklar
    const onSelectDepartment = (selectedItem) => {
        setSelectedDepartment(selectedItem);
    }

    //seçilen fakülte ve bölümü telefona kaydeder
    //bölüm ve fakülte seçimini yapılmadıysa uyarı gösteririr
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

        registerForPushNotificationsAsync()
            .then((token) => {
                const deviceData = {
                    token: token,
                    facultyId: selectedFaculty.id,
                    departmentId: selectedDepartment.id
                }
                addDoc(collection(database, "devices"), deviceData).then(() => {
                    AsyncStorage.setItem(studentUserKey, JSON.stringify(data)).then(() => {
                        navigation.navigate("Announcements");
                    });
                });
            })
            .catch((error) => handleRegistrationError(`${error}`));

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
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
