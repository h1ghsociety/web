import { getStorage } from "firebase/storage";
import * as firebase from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyDRC_grD3bFSHYiLrUHKXctCxftweepwpg",
  authDomain: "high-society-8a08b.firebaseapp.com",
  projectId: "high-society-8a08b",
  storageBucket: "high-society-8a08b.appspot.com",
  messagingSenderId: "471912603641",
  appId: "1:471912603641:web:b69b9b4912e95bbe2c6728",
};

export const app =
  firebase.getApps().length > 0
    ? firebase.getApp()
    : firebase.initializeApp(firebaseConfig);

export const storage = getStorage(app);
