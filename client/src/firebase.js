import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMToLhmF5z4o7CsKylDOTry-tauPPAmn8",
  authDomain: "book-swapping-platform.firebaseapp.com",
  projectId: "book-swapping-platform",
  storageBucket: "book-swapping-platform.appspot.com",
  messagingSenderId: "294766609519",
  appId: "1:294766609519:web:04a4f77f5accd7d750b99a",
  measurementId: "G-CMP6B80MV4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
