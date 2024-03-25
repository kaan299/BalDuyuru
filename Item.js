import React, {useState} from "react";
import {Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function Item({title, content}) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.item}>
                    <Text style={styles.itemTitle}>{title}</Text>
                </View>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <ScrollView style={styles.modalText}>
                            <Text>{content}</Text>
                        </ScrollView>
                        <Pressable
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Kapat</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        backgroundColor: 'rgba(101,99,99,0.44)'
    },
    modalView: {
        width: '80%',
        maxHeight: '80%',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        maxHeight: '85%'
    },
    button: {
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        elevation: 2,
        backgroundColor: "#008884",
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
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
    line: {
        padding: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
});