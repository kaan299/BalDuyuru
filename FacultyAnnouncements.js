import {StyleSheet, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";

const faculties = ["BURHANİYE UYGULAMALI BİLİMLER FAKÜLTESİ",
    "FEN-EDEBİYAT FAKÜLTESİ",
    "GÜZEL SANATLAR FAKÜLTESİ",
    "HUKUK FAKÜLTESİ",
    "İKTİSADİ VE İDARİ BİLİMLER FAKÜLTESİ",
    "İLAHİYAT FAKÜLTESİ",
    "MİMARLIK FAKÜLTESİ",
    "MÜHENDİSLİK FAKÜLTESİ",
    "NECATİBEY EĞİTİM FAKÜLTESİ",
    "SAĞLIK BİLİMLERİ FAKÜLTESİ",
    "SPOR BİLİMLERİ FAKÜLTESİ",
    "TIP FAKÜLTESİ",
    "TURİZM FAKÜLTESİ",
    "VETERİNER FAKÜLTESİ"];

export default function FacultyAnnouncements() {

    return (
        <View style={styles.container}>

            <SelectDropdown
                dropdownStyle={styles.dropdown}
                buttonStyle={styles.dropdownButton}
                data={faculties}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                defaultButtonText={"Fakülte Seçiniz"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    dropdown: {
        paddingLeft: 10,
        paddingRight: 10
    },
    dropdownButton: {
        marginTop: 30,
        width: '100%'
    }
});