//All of our Firestore functionality
import { collection, getDocs, addDoc, query, orderBy, where, getFirestore, Firestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
// import { db } from "../firebase";

//comment out and in to make work 
const db = getFirestore(Firestore)

//GET ALL COMPATITIONS
//TODO: Get all list item function
export const getMyCompList = async () => {
    console.log("getMyCompList: function enter")
    // console.log("getMyCompList: db " + db)
    //Making a custom query to add order by or limit to our querying data
    var q = query( collection(db, "competitions"), orderBy('title', "desc") )//, where("priority", "==", false)

    console.log("getMyCompList: logging q -> " + q)

    const querySnapshot = await getDocs(q);
    var allitems = []//array we want to return
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        allitems.push({ ...doc.data(), id: doc.id }) 
        //push each doc's data to the array I want to return
    });

    console.log(allitems)
    console.log("help")
    return allitems

    //cant just use query snapshot as the array of items - need  to access .data()
}

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