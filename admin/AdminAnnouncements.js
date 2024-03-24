import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {adminUserKey} from "../constants";

const Item = ({title}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.itemTitle}>{title}</Text>
        </View>
    )
}

export default function AdminAnnouncements({navigation}) {
    const [user, setUser] = useState();
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem(adminUserKey, (user) => {
        }).then((user) => {
            setUser(JSON.parse(user));
        });
    }, []);

    const getAnnouncements = () => {
        const q = query(collection(database, 'announcement'),
            where('userId', '==', user.id));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setAnnouncements(data);
        });
    }

    useEffect(() => {
        if (user) {
            getAnnouncements();
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('AdminCreateAnnouncement')}
            >
                <Text style={styles.btnTxt}>Yeni Duyuru Ekle</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            {announcements.length === 0 && <Text>Yükleniyor...</Text>}
            {!announcements && <Text>Yükleniyor...</Text>}
            {announcements &&
                <>
                    <FlatList data={announcements}
                              renderItem={({item}) => <Item style={styles.item} title={item.title}
                                                            createdDate={item.createdDate}/>}
                              keyExtractor={item => item.id}
                              contentContainerStyle={styles.flatListContent}
                    />
                    {announcements.length === 0 && <Text>Duyuru bulunamadı...</Text>}
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
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
    }
});
