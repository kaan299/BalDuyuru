import {FlatList, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import {facultyType, studentUserKey} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({title}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemTitle}>{title}</Text>
        </View>
    )
}

export default function FacultyAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [facultyDepartment, setFacultyDepartment] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem(studentUserKey, (data) => {
        }).then((data) => {
            setFacultyDepartment(JSON.parse(data));
        });
    }, []);

    const getAnnouncements = () => {
        const q = query(collection(database, 'announcement'),
            where('type', '==', facultyType), where("facultyId", "==", facultyDepartment.facultyId));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setAnnouncements(data);
        });
    }

    useEffect(() => {
        if (facultyDepartment) {
            getAnnouncements();
        }
    }, [facultyDepartment]);

    return (
        <View style={styles.container}>
            {facultyDepartment && <Text style={styles.tabHeader}>{facultyDepartment.facultyName}</Text>}
            {!announcements && <Text style={{marginTop: 10}}>Yükleniyor...</Text>}
            {announcements &&
                <>
                    {announcements.length === 0 && <Text style={{marginTop: 10}}>Duyuru bulunamadı...</Text>}
                    <FlatList data={announcements}
                              renderItem={({item}) => <Item style={styles.item} title={item.title}
                                                            createdDate={item.createdDate}/>}
                              keyExtractor={item => item.id}
                              contentContainerStyle={styles.flatListContent}
                    />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
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
        color: "white"
    },
    btnTxt: {
        color: "white",
        fontSize: 14
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
    item: {
        width: '100%',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemTitle: {
        fontSize: 15,
    },
    flatListContent: {
        width: '100%',
        height: '80%'
    },
    line: {
        padding: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabHeader: {
        backgroundColor: "#008884",
        color: "white",
        width: '100%',
        textAlign: 'center',
        padding: 10,
        fontWeight: "400"
    }
});