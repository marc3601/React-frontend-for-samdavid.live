import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
const app = firebase.initializeApp({
  apiKey: "AIzaSyDn_Do5b12w6-IYHhZGfiX7V0QMzWlRdd0",
  authDomain: "dj-admin-e66f0.firebaseapp.com",
  projectId: "dj-admin-e66f0",
  storageBucket: "dj-admin-e66f0.appspot.com",
  messagingSenderId: "129936073580",
  appId: "1:129936073580:web:c2bc6e286034a8a37b8949",
  measurementId: "G-CFFC7XN2PN",
});
export const auth = app.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
export const storageRef = storage.ref();
export default app;
