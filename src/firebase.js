import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0oszapgeF7Do_mcUNR3LJW6XTq1z1wCE",
    authDomain: "first-project-smit.firebaseapp.com",
    projectId: "first-project-smit",
    storageBucket: "first-project-smit.firebasestorage.app",
    messagingSenderId: "661428207518",
    appId: "1:661428207518:web:0a5a8681aa3e09f8e3e08f"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {
    app,
    auth
}