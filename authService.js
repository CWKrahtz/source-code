import { auth } from "./firebase";
import {  signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase";
import { child, getDatabase, set, ref } from 'firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authenticate } from "./store/authSlice";

//SignUp - video code
// export const SignUp = (fullName, email, password) => {
//     return async (dispatch) => {
//         const app = getFirebaseApp();
//         const auth = getAuth(app);

//         try {
//             const result = await createUserWithEmailAndPassword(auth, email, password);

//             const { uid, stsTokenManager } = result.user;
//             const { accessToken, expirationTime } = stsTokenManager;
//             const expiryDate = new Date(expirationTime);

//             const userData = await createUser(fullName, email, uid);

//             dispatch(authenticate({ token: accessToken, userData }));

//             //Save user data and token to storage
//             saveToDataStorage(accessToken, uid, expiryDate)

//         } catch (error) {

//             console.log(error);

//             const errorCode = error.code;
//             let message = "Something went wrong (authServices.js)"
            
//             if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
//                 message = "wrong email or password"
//             }

//             throw new Error(message);
            
//         }
//     }
// }

// const createUser =async (fullName, email, userId) => {
//     const userData = {
//         fullName,
//         email,
//         userId,
//         signUpDate: new Date().toString(),
//     }

//     const dbRef = ref(getDatabase());
//     const childRef = child(dbRef, `user/${userId}`)
//     await set(childRef, userData);
//     return userData;
// };

// const saveToDataStorage = ( token, userId, expiryDate ) => {
//     AsyncStorage.setItem(
//         'userData',
//         JSON.stringify({
//             token,
//             userId,
//             expireDate: expiryDate.toISOString(),
//         })
//     )
// }

// Create Firebase Auth Functionality
//original code
export const handleLogin = (email, password) => {
    console.log(email + " " + password)
    // const app = getFirebaseApp();
    // const auth = getAuth(app);
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

//Create user (SignUp)

export const handleSignUp = (email, password) => {
    // const app = getFirebaseApp();
    // const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        console.log("User Created " + user.email)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    })

    
}

//Sign user Out
export const handleSignOut = () =>{
    // const app = getFirebaseApp();
    // const auth = getAuth(app);
    signOut(auth).then((userCredit) => {
        const user = userCredit.user
        console.log("Signing out: " + user.email)
    })
}