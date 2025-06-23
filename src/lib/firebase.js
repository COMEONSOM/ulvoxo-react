// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDR308ukHsNGorBj9m1RPJcXodZGrrFk9U",
  authDomain: "ulvoxo.firebaseapp.com",
  projectId: "ulvoxo",
  storageBucket: "ulvoxo.firebasestorage.app",
  messagingSenderId: "562325317132",
  appId: "1:562325317132:web:4d28e21cca617250f0f029",
  measurementId: "G-NVMPG3BXXR"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
