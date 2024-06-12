//All of our Firestore functionality
import { collection, getDocs, addDoc, query, orderBy, where, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "../firebase";
// import { db } from "../firebase";

//comment out and in to make work 
const db = getFirestore(getFirebaseApp);

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