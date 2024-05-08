import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {adminUserKey, apiURL} from "../constants";
import AcademicianItem from "../AcademicianItem";

export default function AcademicianManagement({navigation}) {
    const [user, setUser] = useState();
    const [academicians, setAcademicians] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false)

    //telefon hafızasından admin bilgisini getirir state'de saklar
    useEffect(() => {
        AsyncStorage.getItem(adminUserKey, (user) => {
        }).then((user) => {
            setUser(JSON.parse(user));
        });
    }, []);

    //akademisyenleri listeler
    const getAcademicians = () => {
        fetch(apiURL + "/academicians", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(response => {
                setAcademicians(response);
                setIsRefreshing(false);
            });
    }

    useEffect(() => {
        if (user) {
            getAcademicians();
        }
    }, [user]);

    const onRefresh = () => {
        setIsRefreshing(true);
        getAcademicians();
    }

    const deleteCallback = () => {
        setIsRefreshing(true);
        getAcademicians();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('CreateAcademician')}
            >
                <Text style={styles.btnTxt}>Akademisyen Ekle</Text>
            </TouchableOpacity>
            <View style={styles.line}/>
            {!academicians && <Text style={{marginTop: 10}}>Yükleniyor...</Text>}
            {academicians &&
                <>
                    {academicians.length === 0 && <Text style={{marginTop: 10}}>Akademisyen bulunamadı...</Text>}
                    <FlatList data={academicians}
                              onRefresh={onRefresh}
                              refreshing={isRefreshing}
                              renderItem={({item}) => <AcademicianItem 
                                  user={item}
                                  deleteCallback={deleteCallback}
                              />}
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
