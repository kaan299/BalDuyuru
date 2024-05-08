import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {academicianUserKey, adminUserKey, studentUserKey} from "./constants";
import Academician from "./academician/Academician";

export default function Login({navigation}) {
    function getAcademicianCallback(user) {
        if (user === null) {
            navigation.navigate("AcademicianLogin");
        } else {
            navigation.navigate("Academician");
        }
    }

    const academicianLogin = () => {
        AsyncStorage.getItem(academicianUserKey).then(getAcademicianCallback);
    }

    function getAdminCallback(user) {
        if (user === null) {
            navigation.navigate("AdminLogin");
        } else {
            navigation.navigate("Administrator");
        }
    }

    const adminLogin = () => {
        AsyncStorage.getItem(adminUserKey).then(getAdminCallback);
    }

    function getStudentCallback(facultyDepartment) {
        if (facultyDepartment === null) {
            navigation.navigate("ChooseFacultyDepartment");
        } else {
            navigation.navigate("Announcements");
        }
    }

    const studentLogin = () => {
        AsyncStorage.getItem(studentUserKey).then(getStudentCallback);
    }

    return (
        <View style={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logo}/>
            <Text style={styles.title}> BalDuyuru</Text>
            <TouchableOpacity
                onPress={studentLogin}
                style={styles.studentLoginBtn}>
                <Text style={styles.loginText}>Öğrenci</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={academicianLogin}
                style={styles.academicianLoginBtn}>
                <Text style={styles.loginText}>Akademisyen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={adminLogin}
                style={styles.adminLoginBtn}>
                <Text style={styles.loginText}>Yönetici</Text>
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
    }
});
