import {Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FacultyAnnouncements from "./FacultyAnnouncements";
import DepartmentAnnouncements from "./DepartmentAnnouncements";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {academicianUserKey} from "../constants";
import {bolumRole, fakulteRole} from "../roles";

const Tab = createMaterialTopTabNavigator();

export default function Academician({navigation}) {
    const [user, setUser] = useState(null);

    //telefonun hafızasından akademisyen bilgisini getirir
    useEffect(() => {
        AsyncStorage.getItem(academicianUserKey, (user) => {
        }).then((user) => {
            setUser(JSON.parse(user));
            console.log(user);
        });
    }, []);

    //telefondan user bilgisini siler giriş yapa yönlendirir
    const onLogout = () => {
        AsyncStorage.removeItem(academicianUserKey).then(() => {
            navigation.navigate("Login");
        });
    }

    return (
        <>
            {user != null &&
                <>
                    <View style={styles.pageHeader}>
                        <Text style={styles.headerTxt}>Akademisyen: {user.email}</Text>
                        <TouchableOpacity
                            onPress={onLogout}
                            style={styles.logoutBtn}
                        >
                            <Text style={styles.btnTxt}>Çıkış Yap</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => navigation.navigate('AcademicianCreateAnnouncement')}
                        >
                            <Text style={styles.btnTxt}>Yeni Duyuru Ekle</Text>
                        </TouchableOpacity>
                        <View style={styles.line}/>
                    </View>
                </>
            }
            {user != null && user.roles.includes(fakulteRole) &&
                <Tab.Navigator>
                    <Tab.Screen name="Fakülte" component={FacultyAnnouncements}/>
                    <Tab.Screen name="Bölüm" component={DepartmentAnnouncements}/>
                </Tab.Navigator>
            }
            {user != null && user.roles.includes(bolumRole) &&
                <Tab.Navigator>
                    <Tab.Screen name="Duyurularım" component={DepartmentAnnouncements}/>
                </Tab.Navigator>
            }
        </>
    );
}

const styles = StyleSheet.create({
    btnTxt: {
        color: "white",
        fontSize: 14
    },
    logoutBtn: {
        width: 100,
        backgroundColor: "#008884",
        borderRadius: 5,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        marginTop: 10
    },
    pageHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headerTxt: {
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 15
    },
    btn: {
        width: '80%',
        backgroundColor: "#008884",
        borderRadius: 5,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    line: {
        padding: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});
