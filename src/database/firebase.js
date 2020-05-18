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

export const onGoogleLogin = async () => {
  const result = await auth.signInWithPopup(googleProvider);
  if (result) {
    const userRef = firestore.collection("users").doc(result.user.uid);
    const doc = await userRef.get();
    if (!doc.data()) {
      await userRef.set({
        uid: result.user.uid,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
          ? result.user.photoURL
          : require("../logo.svg"),
        email: result.user.email,
        created: new Date().valueOf(),
        role: "user",
      });
    }
  }
};

export const onLogout = () => {
  auth
    .signOut()
    .then(() => {
      console.log("Logout OK");
    })
    .catch((err) => {
      console.error("Logout Not OK." + err);
    });
};
