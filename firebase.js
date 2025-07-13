import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAINq1s0rQYL_kxuHAC_J-lzlCnXZwlEfE",
  authDomain: "easy-sewa.firebaseapp.com",
  projectId: "easy-sewa",
  storageBucket: "easy-sewa.firebasestorage.app",
  messagingSenderId: "726556985959",
  appId: "1:726556985959:web:4fe85d9d31f243844ee2c2",
  measurementId: "G-MB9466FHGY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
