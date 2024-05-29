// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

// TODO:Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);