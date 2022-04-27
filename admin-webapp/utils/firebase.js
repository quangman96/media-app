// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
  } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyAHmHrFuHJuyzex74mgycMI79BCgFIAHlQ",
//   authDomain: "new-app-97a36.firebaseapp.com",
//   projectId: "new-app-97a36",
//   storageBucket: "new-app-97a36.appspot.com",
//   messagingSenderId: "764737355711",
//   appId: "1:764737355711:web:e79cbb3584d7c2c4deeb0a"
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getTableRef = (table) => {
    return collection(db, table);
};
  
const getAll = async (table) => {
    const tableRef = getTableRef(table);
    const tableSnapshot = await getDocs(tableRef);
    const tableData = tableSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return tableData;
};

const auth = getAuth();
export default {db, getAll, auth};