import {StyleSheet} from "react-native";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FacultyAnnouncements from "./FacultyAnnouncements";
import GeneralAnnouncements from "./GeneralAnnouncements";
import DepartmentAnnouncements from "./DepartmentAnnouncements";
import React from "react";

const Tab = createMaterialTopTabNavigator();

//sayfada gösterilecek bölümler oluşturulur, genel, fakülte, bölüm gibi navigation bar ögeleri
export default function Announcements() {
    return (
        <>
            <Tab.Navigator>
                <Tab.Screen name="Genel" component={GeneralAnnouncements}/>
                <Tab.Screen name="Fakülte" component={FacultyAnnouncements}/>
                <Tab.Screen name="Bölüm" component={DepartmentAnnouncements}/>
            </Tab.Navigator>
        </>
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