// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBBIdbtOqeEIKbUUhZkJzuKAV9Nu3Pegw",
  authDomain: "e-learning-768e2.firebaseapp.com",
  projectId: "e-learning-768e2",
  storageBucket: "e-learning-768e2.appspot.com",
  messagingSenderId: "401832589983",
  appId: "1:401832589983:web:65631de44205abf8eac0aa",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default app;
