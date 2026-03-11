import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGmydwgvHnYBXIv7X1th7wArYwvE-GOkc",
  authDomain: "veritas-64933.firebaseapp.com",
  projectId: "veritas-64933",
  storageBucket: "veritas-64933.firebasestorage.app",
  messagingSenderId: "504375846320",
  appId: "1:504375846320:web:ea12ae8c575db34dd6a275",
  measurementId: "G-W5P4JSH7BB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
