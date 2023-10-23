import { addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

export const getBanners = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "banners"));
    querySnapshot.forEach((doc) => {
        list.push({
            ...doc.data(),
            id: doc.id
        })
    });
    return list
}

export const createBanner = async (payload) => {
    try {
        const docRef = await addDoc(collection(db, "banners"), payload);
      
        return docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const updateBanner = async (id, payload) => {
    try {
        const docRef = await updateDoc(doc(db, "banners", id), payload)
      
        return docRef.id
      } catch (e) {
        console.error("Error update document: ", e);
      }
}

export const deleteBanner = async (id, payload) => {
    try {
        const docRef = await deleteDoc(doc(db, "banners", id), payload);
      
        return docRef.id
      } catch (e) {
        console.error("Error delete document: ", e);
      }
}