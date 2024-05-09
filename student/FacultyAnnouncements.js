import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import {facultyType, studentUserKey} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "../Item";

export default function FacultyAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [facultyDepartment, setFacultyDepartment] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false)
    
    //uygulamayı ilk yüklediğinde öğrenci fakülte ve bölüm seçer,
    //bu seçilen bölüm ve fakülte bilgisini cihaz hafızasından getirir
    useEffect(() => {
        AsyncStorage.getItem(studentUserKey, (data) => {
        }).then((data) => {
            setFacultyDepartment(JSON.parse(data));
        });
    }, []);

    //öğrencinin fakültesine göre fakülte tipindeki duyuruları getirir
    const getAnnouncements = () => {
        const q = query(collection(database, 'announcement'),
            where('type', '==', facultyType), where("facultyId", "==", facultyDepartment.facultyId));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setAnnouncements(data);
            setIsRefreshing(false);
        });
    }

    //öğrenci fakülte ve bölüm bilgisi alındıktan sonra duyuruları getirir
    useEffect(() => {
        if (facultyDepartment) {
            getAnnouncements();
        }
    }, [facultyDepartment]);

    const onRefresh = () => {
        setIsRefreshing(true)
        getAnnouncements();
    }

    return (
        <View style={styles.container}>
            {facultyDepartment && <Text style={styles.tabHeader}>{facultyDepartment.facultyName}</Text>}
            {!announcements && <Text style={{marginTop: 10}}>Yükleniyor...</Text>}
            {announcements &&
                <ScrollView>
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
                </ScrollView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: "100%"
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#000",
        marginBottom: 40,
    },
    itemTitle: {
        fontSize: 15,
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
    }
});