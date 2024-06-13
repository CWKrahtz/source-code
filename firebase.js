// Original

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY58mCrdtrApkhnZnvChTM7M5g2D9yvkE",
    authDomain: "source-code-c1b3c.firebaseapp.com",
    projectId: "source-code-c1b3c",
    storageBucket: "source-code-c1b3c.appspot.com",
    messagingSenderId: "185669019668",
    appId: "1:185669019668:web:865adeee86e0482c175f01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export var db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// TODO:Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

//New

// import { getApp, getApps, initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// let firebaseApp;

// export const getFirebaseApp = () => {
//   if (firebaseApp) {
//     return firebaseApp;
//   }

//   // Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyDY58mCrdtrApkhnZnvChTM7M5g2D9yvkE",
//     authDomain: "source-code-c1b3c.firebaseapp.com",
//     projectId: "source-code-c1b3c",
//     storageBucket: "source-code-c1b3c.appspot.com",
//     messagingSenderId: "185669019668",
//     appId: "1:185669019668:web:865adeee86e0482c175f01"
//   };

//   const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

//   // Initialize Firebase Auth with React Native Persistence
//   initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
//   });

//   firebaseApp = app;

//   return app; //<-- auth functionality
// }

// //dupliace above return dan die firebase app