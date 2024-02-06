// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6xtJ_g7a5NNhhsoOwz41Ts6ZqOBC-YEw",
  authDomain: "seo-registration.firebaseapp.com",
  projectId: "seo-registration",
  storageBucket: "seo-registration.appspot.com",
  messagingSenderId: "93440029044",
  appId: "1:93440029044:web:bd4f878b1a0fc3807fbc21",
  measurementId: "G-ZRTGQE7SV4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
