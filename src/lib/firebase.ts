import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRC_grD3bFSHYiLrUHKXctCxftweepwpg",
  authDomain: "high-society-8a08b.firebaseapp.com",
  projectId: "high-society-8a08b",
  storageBucket: "high-society-8a08b.appspot.com",
  messagingSenderId: "471912603641",
  appId: "1:471912603641:web:b69b9b4912e95bbe2c6728",
};

export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
