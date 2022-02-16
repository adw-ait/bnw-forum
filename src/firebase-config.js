// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXwgCMlt2KfSBdDY6LyLwvQ7i_zOYvaYE",
  authDomain: "bnw-forum.firebaseapp.com",
  projectId: "bnw-forum",
  storageBucket: "bnw-forum.appspot.com",
  messagingSenderId: "648651334228",
  appId: "1:648651334228:web:b18f742b8db9b46b0b03c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
