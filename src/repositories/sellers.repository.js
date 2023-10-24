import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

export const getSellers = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "sellers"));
    querySnapshot.forEach((doc) => {
        list.push({
            ...doc.data(),
            id: doc.id
        })
    });
    return list
}

export const createSeller = async (payload) => {
    try {
        const docRef = await addDoc(collection(db, "sellers"), payload);
      
        return docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const detailSeller = async (id) => {
  try {
      const docRef = await getDoc(doc(db, "sellers", id))
      
      
      if (docRef.exists()) {
        return docRef.data()
      } else {
        return {}
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const updateSeller = async (id, payload) => {
    try {
        const docRef = await updateDoc(doc(db, "sellers", id), payload)
      
        return docRef.id
      } catch (e) {
        console.error("Error update document: ", e);
      }
}

export const deleteSeller = async (id) => {
    try {
        const docRef = await deleteDoc(doc(db, "sellers", id));
      
        return docRef.id
      } catch (e) {
        console.error("Error delete document: ", e);
      }
}
