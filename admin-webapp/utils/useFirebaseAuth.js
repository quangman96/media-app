// import { useState, useEffect } from "react";
// import firebase from "./firebase";
// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signInWithRedirect,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { useRouter } from 'next/router';

// const formatAuthUser = (user) => ({
//   uid: user.uid,
//   email: user.email,
// });


// export default function useFirebaseAuth() {
//   const [authUser, setAuthUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const authStateChanged = async (authState) => {
//     if (!authState) {
//       setAuthUser(null)
//       setLoading(false)
//       return;
//     }

//     setLoading(true)
//     var formattedUser = formatAuthUser(authState);
//     setAuthUser(formattedUser);    
//     setLoading(false);
//   };
  
//   const clear = () => {
//     setAuthUser(null);
//     setLoading(true);
//   };

//   const signInWithEmailAndPassword = (email, password) =>
//     firebase.auth.signInWithEmailAndPassword(email, password);

//   const signInWithEmailAndPassword2 = (email, password) =>{
//       const route = useRouter();
//       console.log("signInWithEmailAndPassword")
//       signInWithEmailAndPassword(firebase.auth, email, password).then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);
//           route.push("/articles")
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log(errorCode);
//           console.log(errorMessage);
//         });
//     }

//   const createUserWithEmailAndPassword = (email, password) =>
//     firebase.auth.createUserWithEmailAndPassword(email, password);

//   const signOut = () =>
//     firebase.auth.signOut().then(clear);

//   useEffect(() => {
//     // const unsubscribe = firebase.auth.onAuthStateChanged(authStateChanged);
//     return () => unsubscribe();
//   }, []);

//   return {
//     authUser,
//     loading,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     signOut
//   };
// }
