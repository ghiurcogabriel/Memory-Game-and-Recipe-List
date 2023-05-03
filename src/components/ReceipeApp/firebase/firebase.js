import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDksGeUht7pEtvQdoZOZtti8TlSfvKbgEs",
  authDomain: "memory-and-cooking-site.firebaseapp.com",
  projectId: "memory-and-cooking-site",
  storageBucket: "memory-and-cooking-site.appspot.com",
  messagingSenderId: "558968298419",
  appId: "1:558968298419:web:069d0a61d07f0c0dabc9c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
