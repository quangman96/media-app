// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, startAt, updateDoc
} from "firebase/firestore";
import {
  getDownloadURL, getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage";

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
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getTableRef = (table) => {
  return collection(db, table);
};

const getDocRef = (table, id) => {
  return doc(db, table, id);
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

const getById = async (table, id) => {
  const docRef = getDocRef(table, id);
  const snapshot = await getDoc(docRef);
  return snapshot.data();
};

const create = async (table, data) => {
  const tableRef = getTableRef(table);
  await addDoc(tableRef, data);
};

const auth = getAuth();
const storage = getStorage(app);

const uploadImg = async (file, callBack) => {
  const storagePath = `uploads/${file.name}`;
  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // progrss function ....
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      // error function ....
      console.log(error);
      return f;
    },
    () => {
      // complete function ....
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        callBack(downloadURL);
      });
    }
  );
};

const getByQuery = async (table, ...condition) => {
  const q = query(getTableRef(table), ...condition);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const softDelete = async (table, id) => {
  const docRef = getDocRef(table, id);
  await updateDoc(docRef, { is_delete: true }).catch((e) => {
    console.log("No such document exist!");
  });
};

const updateById = async (table, data, id) => {
  const docRef = getDocRef(table, id);
  await updateDoc(docRef, data).catch((e) => {
    console.log("No such document exist!");
  });
};


const pagination = async (table, where, pageIndex, pageSize, currentPage, orderField) => {
  const order = orderField ? orderBy(orderField.orderBy, orderField.order) : orderBy("create_at")
  const allData = await query(getTableRef(table), where, order);
  const documentSnapshots = await getDocs(allData);
  const lastVisible = documentSnapshots.docs[pageIndex];
  const next = query(getTableRef(table), where, order, startAt(lastVisible), limit(pageSize));

  const querySnapshot = await getDocs(next);
  let querySnapshotData = {
    data: [],
    pagination: {}
  };

  querySnapshotData["pagination"] = {
    pageTotal: Math.ceil(documentSnapshots.size / pageSize),
    itemsTotal: documentSnapshots.size,
    pageSize: pageSize,
    currentPage: currentPage
  };

  querySnapshotData["data"] = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

  return querySnapshotData;
};

const search = async (table, field, keyword, pageSize, currentPage, customFunction) => {
  const data = [];
  if(field === "all")
    data = await getAll(table);
  else
    data = await getByQuery(table, orderBy(field));
  let querySnapshotData = {
    data: [],
    pagination: {}
  };

  if(customFunction){
    data = await customFunction(data);
    querySnapshotData["formated"] = true;
  }

  if(field === "all")
    querySnapshotData["data"] = data.filter(obj => Object.values(obj).some(value => value.toString().toLowerCase().includes(keyword.toLowerCase())));
  else
    querySnapshotData["data"] = data.filter(child => child[field].toString().toLowerCase().includes(keyword.toLowerCase()));
    

  querySnapshotData["pagination"] = {
    pageTotal: Math.ceil(querySnapshotData["data"].length / pageSize),
    itemsTotal: querySnapshotData["data"].length,
    pageSize: pageSize,
    currentPage: currentPage
  };
  return querySnapshotData;
}

export default {
  db,
  getAll,
  create,
  auth,
  storage,
  uploadImg,
  getByQuery,
  pagination,
  softDelete,
  getById,
  updateById,
  search
};
