import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

export const getMethods = async () => {
    const list = []
    const querySnapshot = await getDocs(collection(db, "payment_methods"));
    querySnapshot.forEach((doc) => {
        list.push({
            ...doc.data(),
            id: doc.id
        })
    });
    return list
}

export const createMethods = async (payload) => {
    try {
        const docRef = await addDoc(collection(db, "payment_methods"), payload);

        return docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const detailMethods = async (id) => {
  try {
      const docRef = await getDoc(doc(db, "payment_methods", id))

      if (docRef.exists()) {
        return docRef.data()
      } else {
        return {}
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const updateMethods = async (id, payload) => {
    try {
        const docRef = await updateDoc(doc(db, "payment_methods", id), payload)

        return docRef
      } catch (e) {
        console.error("Error update document: ", e);
      }
}

export const deleteMethods = async (id) => {
    try {
        const docRef = await deleteDoc(doc(db, "payment_methods", id));

        return docRef
      } catch (e) {
        console.error("Error delete document: ", e);
      }
}
