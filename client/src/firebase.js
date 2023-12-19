// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "len-den-7c09a.firebaseapp.com",
    projectId: "len-den-7c09a",
    storageBucket: "len-den-7c09a.appspot.com",
    messagingSenderId: "873751967980",
    appId: "1:873751967980:web:eaf4d99259fffe70938dc9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);