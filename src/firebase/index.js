import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: process.env.VUE_APP_PROJECTID,
    storageBucket: process.env.VUE_APP_STORAGEBUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
    appId: process.env.VUE_APP_APPID,
    measurementId: process.env.VUE_APP_MEASUREMENTID
};
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    export const db = firebase.firestore();
    export const storage = firebase.storage();