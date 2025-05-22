// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy83GcDbo7rO7IWu-yEj-FDLjRgwLUXpg",
  authDomain: "stockmanager-33188.firebaseapp.com",
  projectId: "stockmanager-33188",
  storageBucket: "stockmanager-33188.firebasestorage.app",
  messagingSenderId: "601672328426",
  appId: "1:601672328426:web:27d112b31f1db85160e393",
  measurementId: "G-NYG2T4B10X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);