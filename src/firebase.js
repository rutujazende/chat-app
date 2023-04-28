import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDHXOGeDhM1upsF50xNovYnybxfMs6j-Dw",
    authDomain: "chatify-1969a.firebaseapp.com",
    projectId: "chatify-1969a",
    storageBucket: "chatify-1969a.appspot.com",
    messagingSenderId: "932604342455",
    appId: "1:932604342455:web:ab1bf13c87ad7d78cc1d32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
