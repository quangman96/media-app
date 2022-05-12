import { onAuthStateChanged } from "firebase/auth";
import firebase from "../utils/firebase";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Test({ children }) {
    console.log("Test")
    const route = useRouter();
    const [login, setLogin] = useState(false);
    // useEffect(() => {
    //     onAuthStateChanged(firebase.auth, (user) => {
    //         if (user) {
    //           // User is signed in, see docs for a list of available properties
    //           // https://firebase.google.com/docs/reference/js/firebase.User
    //           const uid = user.uid;
    //           setLogin(true);
    //           console.log("sss")
    //         } else {
    //             console.log("out")
    //             setLogin(false);
    //             route.push("/");
    //         }
    //   }, [setLogin])
    // });

    return (
        <>
          {children}
        </>
      );
}