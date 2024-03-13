import {NavigationContainer} from '@react-navigation/native';
import ForgotPassword from "./ForgotPassword";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./Login";
import Announcements from "./Announcements";
import AcademicianLogin from "./AcademicianLogin";
import Toast from 'react-native-toast-message';
import CreateAnnouncement from "./CreateAnnouncement";
import Administrator from "./Administrator";
import AdminLogin from "./AdminLogin";

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
                    name="Announcements"
                    component={Announcements}
                    options={{title: 'Duyurular'}}
                />
                <Stack.Screen
                    name="AcademicianLogin"
                    component={AcademicianLogin}
                    options={{title: 'Akademisyen'}}
                />
                <Stack.Screen name="ForgotPassword"
                              component={ForgotPassword}
                              options={{title: 'Şife Sıfırlama'}}
                />
                <Stack.Screen name="CreateAnnouncement"
                              component={CreateAnnouncement}
                              options={{title: 'Duyuru Ekle'}}
                />
                <Stack.Screen name="Administrator"
                              component={Administrator}
                              options={{title: 'Yönetici'}}
                />
                <Stack.Screen name="AdminLogin"
                              component={AdminLogin}
                              options={{title: 'Admin Girişi'}}
                />
                    
                
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
}

export default App;