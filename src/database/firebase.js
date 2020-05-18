import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCaw6OnO0_x0RuEf1TCf-Y6FpvrUn-0bw0",
  authDomain: "logz-app.firebaseapp.com",
  databaseURL: "https://logz-app.firebaseio.com",
  projectId: "logz-app",
  storageBucket: "logz-app.appspot.com",
  messagingSenderId: "1056586730657",
  appId: "1:1056586730657:web:3a1036e6c184467d9bb4e0",
  measurementId: "G-1KBG4F3GNW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebaseApp;
