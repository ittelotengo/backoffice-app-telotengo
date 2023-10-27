import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDHj17Fb4Br8geJ8qyE2A37he9lsVs6GvA",
    authDomain: "telotengo-7d2d0.firebaseapp.com",
    projectId: "telotengo-7d2d0",
    storageBucket: "telotengo-7d2d0.appspot.com",
    messagingSenderId: "848347261552",
    appId: "1:848347261552:web:20f80177c4e97202a022b5",
    // storageBucket: "gs://telotengo-7d2d0.appspot.com",
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);
