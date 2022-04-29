// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
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

export { auth };
