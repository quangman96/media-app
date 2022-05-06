// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHmHrFuHJuyzex74mgycMI79BCgFIAHlQ",
  authDomain: "new-app-97a36.firebaseapp.com",
  projectId: "new-app-97a36",
  storageBucket: "new-app-97a36.appspot.com",
  messagingSenderId: "764737355711",
  appId: "1:764737355711:web:e79cbb3584d7c2c4deeb0a",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = getFirestore(app);

const getTableRef = (table) => {
  return collection(db, table);
};

const getAll = async (table) => {
  const ref = getTableRef(table);
  const snapshot = await getDocs(ref);
  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};

const updateOne = async (table, record) => {
  const ref = doc(db, table, record["id"]);
  const snapshot = await updateDoc(ref, record).then((res) => console.log(res));
};

const getMasterData = async (classCode) => {
  const q = query(getTableRef("master_data"), where("class", "==", classCode));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export { auth, db, getAll, getMasterData, updateOne };
