// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import * as firebase from "firebase/compat";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  ref as firebaseDatabaseRef,
  set as firebaseSet,
  child,
  get,
  onValue,
} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHmHrFuHJuyzex74mgycMI79BCgFIAHlQ",
  authDomain: "new-app-97a36.firebaseapp.com",
  projectId: "new-app-97a36",
  storageBucket: "new-app-97a36.appspot.com",
  messagingSenderId: "764737355711",
  appId: "1:764737355711:web:e79cbb3584d7c2c4deeb0a",
  measurementId: "G-DSZW3M6PGV",
  databaseURL:
    "https://new-app-97a36-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
let app;
let userId = "";
let chatTitle = "";
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const firebaseDatabase = getDatabase();
const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = getFirestore(app);
const storage = getStorage(app);

const getUserId = () => auth.currentUser?.uid;
const setChatTitle = (name) => (chatTitle = name);
const getChatTitle = () => chatTitle;
const getTableRef = (table) => {
  return collection(db, table);
};

const getDocRef = (table, id) => {
  return doc(db, table, id);
};

const uploadFileAsync = async (uri, callBack, type = "image") => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (e) => {
      reject(new TypeError(e));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const storagePath = `uploads/${`${type}-${new Date().getTime()}`}`;
  const storageRef = ref(storage, storagePath);

  uploadBytes(storageRef, blob).then((snap) =>
    getDownloadURL(snap.ref)
      .then((downloadURL) => callBack(downloadURL, type))
      .catch((e) => console.log(e))
  );
  blob.close();
};

const getAll = async (table) => {
  const ref = getTableRef(table);
  const q = query(ref, where("is_delete", "==", false));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};

const getUserProfile = async () => {
  const userUid = getUserId();
  const ref = getTableRef("user_profile");
  const q = query(ref, where("user_id", "==", userUid));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};

const updateOne = async (table, record) => {
  const ref = doc(db, table, record["id"]);
  const snapshot = await updateDoc(ref, record);
};

const createUser = async (data) => {
  const saveData = {
    ...data,
    create_at: new Date().getTime(),
    create_by: userId,
    change_at: new Date().getTime(),
    change_by: userId,
    is_delete: false,
  };
  const tableRef = getTableRef("user_profile");
  return await addDoc(tableRef, saveData);
};

const create = async (table, data) => {
  const tableRef = getTableRef(table);
  return await addDoc(tableRef, data);
};

const getMasterData = async (classCode) => {
  const q = query(
    getTableRef("master_data"),
    where("class", "==", classCode),
    where("is_delete", "==", false)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getSavedData = async (user_id) => {
  const q = query(getTableRef("user_saved"), where("user_id", "==", user_id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getUserByUserId = async (user_id) => {
  const q = query(getTableRef("user_profile"), where("id", "==", user_id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getArticleByUserId = async (user_id) => {
  const q = query(
    getTableRef("articles"),
    where("user_id", "==", user_id),
    where("is_delete", "==", false)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getArticles = async (user_id, lastId, limitItems = 0) => {
  // const articles = await getAll("articles");
  const { docs: articles, lastDocId } = await getDocsLazyLoading(
    "articles",
    lastId,
    limitItems
  );

  const categoryList = await getAll("categories");
  const saved = await getSavedData(user_id);

  (saved || []).forEach((e) => {
    const index = articles.findIndex((z) => z.id === e.articles_id);
    if (~index) {
      articles[index]["is_saved"] = true;
      articles[index]["savedId"] = e.id;
    }
  });
  const resultData = [];
  articles.forEach((e) => {
    resultData.push({
      ...e,
      categories: tranferCategory(e["categories"], categoryList),
    });
  });
  return { data: resultData, lastDocId };
};

const getSavedDataByUser = async (user_id, lastId, limitItems = 0) => {
  // const savedData = await getSavedData(user_id);
  const { docs: savedData, lastDocId } = await getDocsLazyLoading(
    "user_saved",
    lastId,
    limitItems,
    where("user_id", "==", user_id)
  );
  const arrSaved = [];
  savedData.forEach((e) => {
    arrSaved.push({
      id: e["articles_id"],
      savedId: e["id"],
    });
  });
  const articleList = await getAll("articles");
  const categoryList = await getAll("categories");
  const resultData = [];

  arrSaved.forEach((e) => {
    const obj = articleList.find((z) => z.id === e.id && z.is_delete === false);
    if (obj) {
      resultData.push({
        ...obj,
        categories: tranferCategory(obj["categories"], categoryList),
        savedId: e.savedId,
      });
    }
  });

  return { data: resultData, lastDocId };
};

const getArticleByUser = async (
  user_id,
  lastId,
  limitItems = 0,
  keepCategoryId = false
) => {
  const { docs: articles, lastDocId } = await getDocsLazyLoading(
    "articles",
    lastId,
    limitItems,
    where("user_id", "==", user_id)
  );
  const categoryList = await getAll("categories");

  const resultData = [];
  articles.forEach((e) => {
    resultData.push({
      ...e,
      categories: tranferCategory(
        e["categories"],
        categoryList,
        keepCategoryId
      ),
    });
  });
  return { data: resultData, lastDocId };
};

const createSavedData = async (user_id, articles_id) => {
  const obj = {
    articles_id,
    user_id,
    create_by: user_id,
    change_by: user_id,
    create_at: new Date().getTime(),
    change_at: new Date().getTime(),
    is_delete: false,
  };

  return create("user_saved", obj);
};

const deleteById = async (table, id) => {
  const docRef = getDocRef(table, id);
  await deleteDoc(docRef).catch((e) => {
    console.log(e);
  });
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
    console.log(e);
  });
};

const deleteSavedData = async (saved_id) => {
  deleteById("user_saved", saved_id);
};

const tranferCategory = (list, categoryList, keepCategoryId = false) => {
  const array = [];
  (list || []).forEach((e) => {
    const obj = categoryList.find((z) => z.id === e);
    if (obj) {
      keepCategoryId
        ? array.push({ label: obj["name"], value: obj["id"] })
        : array.push(obj["name"]);
    }
  });
  return array;
};

const createByTable = async (table, data) => {
  const saveData = {
    ...data,
    create_at: new Date().getTime(),
    create_by: userId,
    change_at: new Date().getTime(),
    change_by: userId,
    is_delete: false,
  };

  return await create(table, saveData);
};

const getByQuery = async (table, ...condition) => {
  const q = query(getTableRef(table), ...condition);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

const getDocsLazyLoading = async (
  table,
  lastDocId,
  limitItems = 0,
  ...condition
) => {
  let docs = [];
  let newLastDocId = null;
  try {
    if (lastDocId) {
      const lastDoc = await getDoc(getDocRef(table, lastDocId));
      if (limitItems > 0)
        docs = await getByQuery(
          table,
          ...condition,
          where("is_delete", "==", false),
          orderBy("create_at", "desc"),
          startAfter(lastDoc),
          limit(limitItems)
        );
      else
        docs = await getByQuery(
          table,
          ...condition,
          where("is_delete", "==", false),
          orderBy("create_at", "desc"),
          startAfter(lastDoc)
        );
    } else {
      if (limitItems > 0)
        docs = await getByQuery(
          table,
          ...condition,
          where("is_delete", "==", false),
          orderBy("create_at", "desc"),
          limit(limitItems)
        );
      else
        docs = await getByQuery(
          table,
          ...condition,
          where("is_delete", "==", false),
          orderBy("create_at", "desc")
        );
    }
    newLastDocId = docs[docs.length - 1]?.id || null;
    return {
      docs,
      lastDocId: newLastDocId,
    };
  } catch (error) {
    console.log(error);
  }
};

const getVideos = async (lastId, limitItems = 0) => {
  const { docs: videos, lastDocId } = await getDocsLazyLoading(
    "videos",
    lastId,
    limitItems
  );
  const categoryList = await getAll("categories");
  const resultData = [];
  videos.forEach((e) => {
    resultData.push({
      ...e,
      categories: tranferCategory(e["categories"], categoryList),
    });
  });

  return { data: resultData, lastDocId };
};

const getLastMessage = async (path) => {
  const dbRef = firebaseDatabaseRef(firebaseDatabase);
  return get(child(dbRef, `chats/${path}`)).then(async (ss) => {
    if (ss.exists()) {
      const data = ss.val();
      const lastMessage = data[Object.keys(data)[Object.keys(data).length - 1]];
      return lastMessage;
    } else {
      return null;
    }
  });
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(key).then((res) => res);
  } catch (e) {
    console.log(e);
  }
};

export {
  analytics,
  auth,
  db,
  storage,
  firebaseDatabase,
  onAuthStateChanged,
  firebaseDatabaseRef,
  firebaseSet,
  onValue,
  child,
  get,
  getAll,
  getUserId,
  getDocRef,
  getTableRef,
  getUserProfile,
  getMasterData,
  getSavedData,
  getUserByUserId,
  getArticleByUserId,
  getArticles,
  getSavedDataByUser,
  getArticleByUser,
  uploadFileAsync,
  updateOne,
  createUser,
  createSavedData,
  deleteById,
  softDelete,
  updateById,
  deleteSavedData,
  tranferCategory,
  createByTable,
  getByQuery,
  getDocsLazyLoading,
  getVideos,
  getLastMessage,
  storeData,
  getData,
  setChatTitle,
  getChatTitle,
};
