import React, {useState} from "react";
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Toast from "react-native-toast-message";
import {apiURL} from "./constants";

const ConfirmModal = ({visible, onConfirm, onCancel}) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text>Silmek istediğinize emin misiniz?</Text>
                    <View style={styles.buttonRow}>
                        <Button title="Sil" color="red" onPress={onConfirm}/>
                        <Button title="İptal" onPress={onCancel}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default function AcademicianItem({user, deleteCallback}) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleDelete = () => {
        fetch(apiURL + "/academicians/" + user.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'Akademisyen silindi.'
            });
            setIsModalVisible(false);
            deleteCallback();
        }).catch(err => {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Akademisyen silinirken bir hata oluştu.'
            });
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <ConfirmModal
                visible={isModalVisible}
                onConfirm={handleDelete}
                onCancel={handleCancel}
            />
            <View style={styles.item}>
                <Text style={styles.itemTitle}>{user.displayName} - {user.email}</Text>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setIsModalVisible(true)}
                >
                    <Text style={styles.btnTxt}>Sil</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#ef1e1e",
        borderRadius: 5,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        color: 'white'
    },
    btnTxt: {
        color: "white",
        fontSize: 14
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    item: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center",
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arka planı koyulaştırır
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        minWidth: 200,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});