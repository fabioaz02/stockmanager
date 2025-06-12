import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCy83GcDbo7rO7IWu-yEj-FDLjRgwLUXpg",
  authDomain: "stockmanager-33188.firebaseapp.com",
  databaseURL: "https://stockmanager-33188-default-rtdb.firebaseio.com",
  projectId: "stockmanager-33188",
  storageBucket: "stockmanager-33188.firebasestorage.app",
  messagingSenderId: "601672328426",
  appId: "1:601672328426:web:27d112b31f1db85160e393",
  measurementId: "G-NYG2T4B10X"
};

const firebaseApp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database, firebaseApp };

