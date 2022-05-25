import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTzO_fi1cg55h3R_hC8oj7ZMAbsgfLRuc",
  authDomain: "mobile-3f08a.firebaseapp.com",
  projectId: "mobile-3f08a",
  storageBucket: "mobile-3f08a.appspot.com",
  messagingSenderId: "918445820622",
  appId: "1:918445820622:web:4a0b13f42aaebb9369de9f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
