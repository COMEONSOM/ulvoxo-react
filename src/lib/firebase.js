import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR308ukHsNGorBj9m1RPJcXodZGrrFk9U",
  authDomain: "ulvoxo.firebaseapp.com",
  projectId: "ulvoxo",
  storageBucket: "ulvoxo.appspot.com",
  messagingSenderId: "562325317132",
  appId: "1:562325317132:web:4d28e21cca617250f0f029",
  measurementId: "G-NVMPG3BXXR",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// OAuth Providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();

//used firebase accout is: aryansom80@gmail.com