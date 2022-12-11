import firebase from "firebase/compat";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBitf-bG99gkOXV6oWBxG2bfc3Btarm6UM",
    authDomain: "kanchat-d7798.firebaseapp.com",
    projectId: "kanchat-d7798",
    storageBucket: "kanchat-d7798.appspot.com",
    messagingSenderId: "400128596537",
    appId: "1:400128596537:web:85457c5e0a4641d4188be8",
    measurementId: "G-49T04V6ZJB",
    databaseURL: 'https://kanchat-d7798-default-rtdb.firebaseio.com/'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
