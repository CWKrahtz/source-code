import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, doc, setDoc } from "firebase/firestore";

// Function to handle user login
export const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            console.log("Logged in user:", user.email);
            // Handle further actions upon successful login
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });
};

// Function to handle user sign-up
export const handleSignUp = async (email, password, fullName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
        id: user.uid,
        fullName: fullName,
        email: email,
        signUpDate: new Date().toString(),
    };

    try {
        // Save user data to Realtime Database
        // await set(ref(db, `users/${user.uid}`), userData);
        await setDoc(doc(db, 'users', userData.id), userData);

        return user; // Return the user object if needed
    } catch (error) {
        throw error;
    }
};

// Function to handle user sign-out
export const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
            // Handle further actions upon successful sign-out
        })
        .catch((error) => {
            console.error("Sign-out error:", error);
        });
};