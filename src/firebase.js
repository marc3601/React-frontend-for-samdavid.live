import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSEGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT,
});
export const auth = app.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
export const storageRef = storage.ref();
export default app;
