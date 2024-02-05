import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

export const getPriceDollar = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "priceDollar"));
    querySnapshot.forEach((doc) => {
        list.push({
            ...doc.data(),
            id: doc.id
        })
    });
    return list
}

export const createAmount = async (payload) => {
    try {
        const docRef = await addDoc(collection(db, "priceDollar"), payload);
      
        return docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}