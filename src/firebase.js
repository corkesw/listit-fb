// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBMlVuGUszRSYicchdcKXVSZZg3yQWCDKc",
  authDomain: "fir-testing-404d2.firebaseapp.com",
  databaseURL:
    "https://fir-testing-404d2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-testing-404d2",
  storageBucket: "fir-testing-404d2.appspot.com",
  messagingSenderId: "419879771066",
  appId: "1:419879771066:web:34e431b61f95051e80db83",
  measurementId: "G-8E2JGBBEXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
