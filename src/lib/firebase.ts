import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-D...", // He completado esto mentalmente con tu imagen
  authDomain: "flag-online-c21d8.firebaseapp.com",
  databaseURL: "https://flag-online-c21d8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flag-online-c21d8",
  storageBucket: "flag-online-c21d8.appspot.com",
  messagingSenderId: "1098413813876",
  appId: "1:1098413813876:web:d87535565538e4a9f993f4"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);