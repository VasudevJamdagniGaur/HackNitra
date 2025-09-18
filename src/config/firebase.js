// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWdcRp0jPJDE521UljJ-mqM0FC0L4dhMU",
  authDomain: "edutrack-f23cd.firebaseapp.com",
  projectId: "edutrack-f23cd",
  storageBucket: "edutrack-f23cd.firebasestorage.app",
  messagingSenderId: "128583353857",
  appId: "1:128583353857:web:d059e9248f397a1e1f6200",
  measurementId: "G-T4E09NW3QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the services
export { app, analytics, auth, db, storage };
export default app;
