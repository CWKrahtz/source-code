
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Create Firebase Auth Functionality

export const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Logged in user - " + user.email);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

//Sign user Out
export const handleSignOut = () =>{
    signOut(auth).then((userCredit) => {
        const user = userCredit.user
        console.log("Signing out: " + user.email)
    })
}