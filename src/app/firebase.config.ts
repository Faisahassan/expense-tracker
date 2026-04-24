import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC-vdymvD8nos5aPcmkV6RQ_4c66Koz6Ng",
    authDomain: "crud-demo-64fbb.firebaseapp.com",
    projectId: "crud-demo-64fbb",
    storageBucket: "crud-demo-64fbb.firebasestorage.app",
    messagingSenderId: "690627671978",
    appId: "1:690627671978:web:ac97c0f6a8108352745dd3"
  };
  const firebase_app = initializeApp(firebaseConfig);
  export const db = getFirestore(firebase_app);
  export const auth = getAuth(firebase_app); 
