import {NavigationContainer} from '@react-navigation/native';
import ForgotPassword from "./academician/ForgotPassword";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./Login";
import Announcements from "./student/Announcements";
import AcademicianLogin from "./academician/AcademicianLogin";
import Toast from 'react-native-toast-message';
import AdminCreateAnnouncement from "./admin/CreateAnnouncement";
import AcademicianCreateAnnouncement from "./academician/CreateAnnouncement";
import Administrator from "./admin/Administrator";
import AdminLogin from "./admin/AdminLogin";
import ChooseFacultyDepartment from "./student/ChooseFacultyDepartment";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Giriş Yap',
                        headerShown: false
                    }}
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
                <Stack.Screen name="AdminCreateAnnouncement"
                              component={AdminCreateAnnouncement}
                              options={{title: 'Duyuru Ekle'}}
                />
                <Stack.Screen name="AcademicianCreateAnnouncement"
                              component={AcademicianCreateAnnouncement}
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
                <Stack.Screen name="ChooseFacultyDepartment"
                              component={ChooseFacultyDepartment}
                              options={{title: 'Fakülte/Bölüm Seçimi'}}
                />
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
}

export default App;