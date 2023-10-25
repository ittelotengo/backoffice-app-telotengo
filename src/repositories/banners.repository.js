import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

export const detailBanner= async (id) => {
  try {
      const docRef = await getDoc(doc(db, "banners", id))
      
      
      if (docRef.exists()) {
        return docRef.data()
      } else {
        return {}
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const updateBanner = async (id, payload) => {
    try {
        const docRef = await updateDoc(doc(db, "banners", id), payload)
      
        return docRef
      } catch (e) {
        console.error("Error update document: ", e);
      }
}

export const deleteBanner = async (id, payload) => {
    try {
        const docRef = await deleteDoc(doc(db, "banners", id), payload);
      
        return docRef
      } catch (e) {
        console.error("Error delete document: ", e);
      }
}

export const uploadFileStorage = async (file, id, path) => {
  // Create a root reference
  const storage = getStorage();

  const storageRef = ref(storage, `${path}/${id}`);

  try {
    const uploadFile = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(uploadFile.ref);

    return url;
  } catch (error) {
    console.log(error);
  }
}

export const removeFileStorage = async (file, id, path) => {
  // Create a root reference
  const storage = getStorage();

  const desertRef = ref(storage, `${path}/${id}`);

  try {
    const uploadFile = await deleteObject(desertRef);

    return uploadFile;
  } catch (error) {
    console.log(error);
  }
}