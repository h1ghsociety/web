import { initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
export const db = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});
export const storage = getStorage();
