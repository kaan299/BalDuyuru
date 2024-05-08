import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

//google firebase console'dan alınan uygulama ayarları 
const firebaseConfig = {
    apiKey: "AIzaSyBwVSLfUncI06W7aNWR46rs1Zztkum6CM0",
    authDomain: "balduyuru.firebaseapp.com",
    projectId: "balduyuru",
    storageBucket: "balduyuru.appspot.com",
    messagingSenderId: "974071828909",
    appId: "1:974071828909:web:178518ca0f9825f7629124",
    measurementId: "G-YQLGHVL8G8"
};

//firebase app oluşturulur, firestore ve login kullanımı için gerekli
const app = initializeApp(firebaseConfig);

//login işlemleri için auth oluşturulur
const auth = getAuth(app);

//verilere erişim sağlayan database nesnesi oluşturulur
const database = getFirestore();

export {auth, database}
