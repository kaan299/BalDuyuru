import {initializeApp} from 'firebase/app';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwVSLfUncI06W7aNWR46rs1Zztkum6CM0",
    authDomain: "balduyuru.firebaseapp.com",
    projectId: "balduyuru",
    storageBucket: "balduyuru.appspot.com",
    messagingSenderId: "974071828909",
    appId: "1:974071828909:web:178518ca0f9825f7629124",
    measurementId: "G-YQLGHVL8G8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}
