import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKasmKlyvC5zMbhuT-Wk5EzlIyB4Ph-Rs",
  authDomain: "ytclone-53e85.firebaseapp.com",
  projectId: "ytclone-53e85",
  storageBucket: "ytclone-53e85.firebasestorage.app",
  messagingSenderId: "303343220954",
  appId: "1:303343220954:web:d8e00273ab7e05b4858de3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();