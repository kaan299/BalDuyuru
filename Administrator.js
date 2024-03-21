import {Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AdminAnnouncements from "./AdminAnnouncements";
import AcademicianManagement from "./AcademicianManagement";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {adminUserKey} from "./constants";

const Tab = createMaterialTopTabNavigator();

export default function Administrator({navigation}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem(adminUserKey, (user) => {
        }).then((user) => {
            setUser(JSON.parse(user));
        });
    }, []);

    const onLogout = () => {
        AsyncStorage.removeItem(adminUserKey).then(() => {
            navigation.navigate("Login");
        });
    }

    return (
        <>
            {user != null &&
                <View style={styles.pageHeader}>
                    <Text style={styles.headerTxt}>Yönetici: {user.email}</Text>
                    <TouchableOpacity
                        onPress={onLogout}
                        style={styles.logoutBtn}
                    >
                        <Text style={styles.btnTxt}>Çıkış Yap</Text>
                    </TouchableOpacity>
                </View>
            }
            <Tab.Navigator>
                <Tab.Screen name="Duyurular" component={AdminAnnouncements}/>
                <Tab.Screen name="Akademisyenler" component={AcademicianManagement}/>
            </Tab.Navigator>
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
    }
});
