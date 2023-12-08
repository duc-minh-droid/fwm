// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import {getFirestore} from "@firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDubxUPKlZRy0CnV3GNEA2a4h3WgiLPFkM",
  authDomain: "food-waste-web.firebaseapp.com",
  projectId: "food-waste-web",
  storageBucket: "food-waste-web.appspot.com",
  messagingSenderId: "360772662220",
  appId: "1:360772662220:web:1473871a892d00a91a2369"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provide = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  signInWithPopup(auth, provide)
    .then(result=>{
        const user = result.user
    })
}

export const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
  };