// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "dotenv/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// PRODUCTION CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyCDKEMeOzhtiA7NL3qiulOF9fJFCXk1E1g",
  authDomain: "bnw-forum-54782.firebaseapp.com",
  projectId: "bnw-forum-54782",
  storageBucket: "bnw-forum-54782.appspot.com",
  messagingSenderId: "716466596340",
  appId: "1:716466596340:web:f5c5953580d6d8979771a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
