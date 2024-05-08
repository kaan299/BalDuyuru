import {FlatList, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import {academicianUserKey, departmentType} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "../Item";

export default function DepartmentAnnouncements() {
    const [user, setUser] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false)

    //telefonun hafızasından akademisyen bilgisini getirir
    useEffect(() => {
        AsyncStorage.getItem(academicianUserKey, (data) => {
        }).then((data) => {
            setUser(JSON.parse(data));
        });
    }, []);

    //bölüm tipindeki ve akademisyenin oluşturduğu duyurular listelenir
    const getAnnouncements = () => {
        const q = query(collection(database, 'announcement'),
            where('type', '==', departmentType), where("userId", "==", user.id));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setAnnouncements(data);
            setIsRefreshing(false);
        });
    }

    useEffect(() => {
        if (user) {
            getAnnouncements();
        }
    }, [user]);

    const onRefresh = () => {
        setIsRefreshing(true)
        getAnnouncements();
    }

    return (
        <View style={styles.container}>
            {!announcements && <Text style={{marginTop: 10}}>Yükleniyor...</Text>}
            {announcements &&
                <>
                    {announcements.length === 0 && <Text style={{marginTop: 10}}>Duyuru bulunamadı...</Text>}
                    <FlatList data={announcements}
                              onRefresh={onRefresh}
                              refreshing={isRefreshing}
                              renderItem={({item}) => {
                                  return <Item title={item.title}
                                               content={item.content}
                                               createdDate={item.createdDate}
                                  />
                              }}
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
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#000",
        marginBottom: 40,
    },
    flatListContent: {
        width: '100%',
        height: '100%'
    },
    tabHeader: {
        backgroundColor: "#008884",
        color: "white",
        width: '100%',
        textAlign: 'center',
        padding: 10,
        fontWeight: "400"
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
    line: {
        padding: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});