// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore/lite";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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
let userId = "";
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
export const auth = firebase.auth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const setUserId = (id) => (userId = id);
export const getUserId = () => userId;
export const getTableRef = (table) => {
  return collection(db, table);
};

export const getDocRef = (table, id) => {
  return doc(db, table, id);
};

export async function uploadImageAsync(uri, callBack) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const storagePath = `uploads/${`image-${new Date().getTime()}`}`;
  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, blob);

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
        callBack(downloadURL);
      });
    }
  );

  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export const getAll = async (table) => {
  const ref = getTableRef(table);
  const q = query(ref, where("is_delete", "==", false));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};

export const getUserProfile = async () => {
  const ref = getTableRef("user_profile");
  const q = query(ref, where("id", "==", userId));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};

export const updateOne = async (table, record) => {
  const ref = doc(db, table, record["id"]);
  const snapshot = await updateDoc(ref, record);
};

export const createUser = async (data) => {
  const saveData = {
    ...data,
    create_at: new Date().getTime(),
    create_by: userId,
    change_at: new Date().getTime(),
    change_by: userId,
    id_delete: false,
  };
  const tableRef = getTableRef("user_profile");
  return await addDoc(tableRef, saveData);
};

const create = async (table, data) => {
  const tableRef = getTableRef(table);
  return await addDoc(tableRef, data);
};

export const getMasterData = async (classCode) => {
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

export const getSavedData = async (user_id) => {
  const q = query(getTableRef("user_saved"), where("user_id", "==", user_id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getUserByUserId = async (user_id) => {
  const q = query(getTableRef("user_profile"), where("id", "==", user_id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getArticles = async (user_id) => {
  const articles = await getAll("articles");
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
  return resultData;
};

export const getSavedDataByUser = async (user_id) => {
  const savedData = await getSavedData(user_id);
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

  return resultData;
};

export const createSavedData = async (user_id, articles_id) => {
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

export const softDelete = async (table, id) => {
  const docRef = getDocRef(table, id);
  await deleteDoc(docRef).catch((e) => {
    console.log("No such document exist!");
  });
};

export const updateById = async (table, data, id) => {
  const docRef = getDocRef(table, id);
  await updateDoc(docRef, data).catch((e) => {
    console.log("No such document exist!");
  });
};

export const deleteSavedData = async (saved_id) => {
  softDelete("user_saved", saved_id);
};

export const tranferCategory = (list, categoryList) => {
  const array = [];
  (list || []).forEach((e) => {
    const obj = categoryList.find((z) => z.id === e);
    if (obj) {
      array.push(obj["name"]);
    }
  });
  return array;
};
