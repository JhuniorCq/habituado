// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ12vzSUxX64UFHcl1YLljdt5tXSdtsQw",
  authDomain: "habituado-d36e9.firebaseapp.com",
  projectId: "habituado-d36e9",
  storageBucket: "habituado-d36e9.firebasestorage.app",
  messagingSenderId: "802661976815",
  appId: "1:802661976815:web:61f6dc2f7d8aa0fa39a91a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
