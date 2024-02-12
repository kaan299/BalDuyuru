import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Alert,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity, Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ForgotPassword from "./ForgotPassword";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./Login";
import Signup from "./Signup";
import StudentLogin from "./Student";
import AcademicianLogin from "./Academician";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{title: 'Giriş Yap'}}
                />
                <Stack.Screen
                    name="StudentLogin"
                    component={StudentLogin}
                    options={{title: 'Öğrenci Girişi'}}
                />
                <Stack.Screen
                    name="AcademicianLogin"
                    component={AcademicianLogin}
                    options={{title: 'Akademisyen Girişi'}}
                />
                <Stack.Screen name="ForgotPassword"
                              component={ForgotPassword}
                              options={{title: 'Şife Sıfırlama'}}
                />
                <Stack.Screen name="Signup"
                              component={Signup}
                              options={{title: 'Kayıt Ol'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;