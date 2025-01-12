// Import Firebase modules (version 9+ uses modular imports)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRPeg41wq23SFsB4dcT8LNi9rZQ0yOQNk",
  authDomain: "rentalwebsite-97900.firebaseapp.com",
  projectId: "rentalwebsite-97900",
  storageBucket: "rentalwebsite-97900.firebasestorage.app",
  messagingSenderId: "886954066331",
  appId: "1:886954066331:web:f3680db9948c10549aa13e",
  measurementId: "G-K3Q35KZ4NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
