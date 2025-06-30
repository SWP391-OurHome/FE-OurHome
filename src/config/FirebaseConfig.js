// config/FirebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDFXOWHYctBvMoBcaY331u0iUGyWTMQTxE",
    authDomain: "ourhome-45c19.firebaseapp.com",
    projectId: "ourhome-45c19",
    storageBucket: "ourhome-45c19.firebasestorage.app",
    messagingSenderId: "790453700928",
    appId: "1:790453700928:web:7f115abb1b3e728325d2a5",
    measurementId: "G-KK48L3C3C2"
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { app, auth, firebase };