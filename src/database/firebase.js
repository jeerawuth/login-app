import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCoKy8gAEkO7n01y70lSOZoYpRquYRUp9A",
  authDomain: "testz-firestore.firebaseapp.com",
  databaseURL: "https://testz-firestore.firebaseio.com",
  projectId: "testz-firestore",
  storageBucket: "testz-firestore.appspot.com",
  messagingSenderId: "1061731999885",
  appId: "1:1061731999885:web:01d17c2b9acb615a5442c4",
  measurementId: "G-QNGWCDT1YQ",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebaseApp;
