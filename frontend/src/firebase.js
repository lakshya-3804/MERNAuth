// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXcaJIDiqn0p3B1NCnpryMXJqW-whTn8E",
  authDomain: "login-g-ea07d.firebaseapp.com",
  projectId: "login-g-ea07d",
  storageBucket: "login-g-ea07d.appspot.com",
  messagingSenderId: "111811119447",
  appId: "1:111811119447:web:14757844201bd04438d612",
  measurementId: "G-ZEFXY5GHXP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export {auth,provider};
 