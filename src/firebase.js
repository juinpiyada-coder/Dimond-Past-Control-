import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBadJmySRW8Jkb5l8bC6Bnn9NWrqe0rg80",
  authDomain: "dimond-past-control.firebaseapp.com",
  projectId: "dimond-past-control",
  storageBucket: "dimond-past-control.firebasestorage.app",
  messagingSenderId: "772967193879",
  appId: "1:772967193879:web:c1c7326783010db5602b52",
  measurementId: "G-P3MSF6FX16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
