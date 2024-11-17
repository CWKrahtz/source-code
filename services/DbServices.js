//All of our Firestore functionality
import { collection, getDocs, addDoc, query, orderBy, where, getFirestore, Firestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";

//comment out and in to make work 
const db = getFirestore(Firestore)

//GET ALL COMPATITIONS
export const getMyCompList = async () => {
    console.log("getMyCompList: function enter")
    
    var q = query( collection(db, "competitions"), orderBy('title', "desc") )

    console.log("getMyCompList: logging q -> " + q)

    const querySnapshot = await getDocs(q);
    var allitems = []
    querySnapshot.forEach((doc) => {
        allitems.push({ ...doc.data(), id: doc.id }) 
    });

    console.log(allitems)
    console.log("help")
    return allitems
}



//get Profile Information
export const getMyProfile = async () => {
    console.log("getMyProfile: function enter");

    try {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const profileData = userDoc.data();
                console.log("Profile", profileData);
                return profileData;
            } else {
                console.log("No such document!");
                return null;
            }
        } else {
            console.log("No user logged in");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};