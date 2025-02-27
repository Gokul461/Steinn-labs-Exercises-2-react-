// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOvXdAc-8fYNcSolDMI30Ij-Ts32bqZkE",
  authDomain: "studytrack-d7800.firebaseapp.com",
  projectId: "studytrack-d7800",
  storageBucket: "studytrack-d7800.firebasestorage.app",
  messagingSenderId: "93236275047",
  appId: "1:93236275047:web:42029905fdeda54d5d31c2",
  measurementId: "G-VQT9B5ZV85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getAuth(app);
export { auth };