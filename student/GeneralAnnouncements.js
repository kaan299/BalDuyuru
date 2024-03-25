import {FlatList, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../firebase";
import {generalType} from "../constants";
import Item from "../Item";

export default function GeneralAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getAnnouncements = () => {
        const q = query(collection(database, 'announcement'),
            where('type', '==', generalType));
        getDocs(q).then(snapshot => {
            const data = snapshot.docs.map(x => x.data());
            setAnnouncements(data);
            setIsRefreshing(false);
        });
    }

    useEffect(() => {
        getAnnouncements();
    });

    const onRefresh = () => {
        setIsRefreshing(true)
        getAnnouncements();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tabHeader}>Genel Duyurular</Text>
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