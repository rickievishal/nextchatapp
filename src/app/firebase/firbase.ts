// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYwV9W-NKT04Dbkx8UhG1WAFw3EaU5mrs",
  authDomain: "chatsystems-c3c60.firebaseapp.com",
  projectId: "chatsystems-c3c60",
  storageBucket: "chatsystems-c3c60.appspot.com",
  messagingSenderId: "683385564453",
  appId: "1:683385564453:web:040192a76f6bf502a33ecc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;