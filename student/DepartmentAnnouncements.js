import {FlatList, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import {departmentType, studentUserKey} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Item from "../Item";

export default function DepartmentAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [facultyDepartment, setFacultyDepartment] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem(studentUserKey, (data) => {
        }).then((data) => {
            setFacultyDepartment(JSON.parse(data));
        });
    }, []);

    const getAnnouncements = () => {
        const q = query(collection(database, 'announcement'),
            where('type', '==', departmentType), where("departmentId", "==", facultyDepartment.departmentId));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setAnnouncements(data);
            setIsRefreshing(false);
        });
    }

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
            {facultyDepartment && <Text style={styles.tabHeader}>{facultyDepartment.departmentName}</Text>}
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
    }
});