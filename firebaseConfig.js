import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAdV5-txDMjYkoKm0qYo1Sh2aEs1h-0HBs",
    authDomain: "telotengo-4d75e.firebaseapp.com",
    projectId: "telotengo-4d75e",
    storageBucket: "telotengo-4d75e.appspot.com",
    messagingSenderId: "361534171128",
    appId: "1:361534171128:web:882d22013a10c30a76d80d",
    storageBucket: "gs://telotengo-4d75e.appspot.com"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
