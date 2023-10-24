import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

export const getSections = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "sections"));
    querySnapshot.forEach((doc) => {
        list.push({
            ...doc.data(),
            // id: doc.id
        })
    });
    return list
}