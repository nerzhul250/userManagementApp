import firebase from "firebase/app";
require('firebase/firestore')

const config = {
    apiKey: "AIzaSyBDI4y4WnvKIMOjj5DVcmQ-tjZbkdhXV80",
    authDomain: "otavez-46bfe.firebaseapp.com",
    databaseURL: "https://otavez-46bfe.firebaseio.com",
    projectId: "otavez-46bfe",
    storageBucket: "otavez-46bfe.appspot.com",
    messagingSenderId: "834523069440",
    appId: "1:834523069440:web:9a811d0c3b1f8ae3b56ce5"
};

firebase.initializeApp(config);

export const db = firebase.firestore();