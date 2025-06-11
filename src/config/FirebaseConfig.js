// config/FirebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD5nbb4q5rWllwKRB2fMDmXuzn8rTnMWtI",
    authDomain: "ourhome-55e00.firebaseapp.com",
    projectId: "ourhome-55e00",
    storageBucket: "ourhome-55e00.firebasestorage.app",
    messagingSenderId: "793571385559",
    appId: "1:793571385559:web:a4c8218e4f74b0cf2bd092",
    measurementId: "G-JXR10S9C4D"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { app, auth, firebase };