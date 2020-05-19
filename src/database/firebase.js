import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCSu4XGfVrDYGZ7dRPKTsY_HIaYUq0Zn44",
  authDomain: "test-refz.firebaseapp.com",
  databaseURL: "https://test-refz.firebaseio.com",
  projectId: "test-refz",
  storageBucket: "test-refz.appspot.com",
  messagingSenderId: "609081493503",
  appId: "1:609081493503:web:56a51fb80171545bd189ca",
  measurementId: "G-VQC1YR66X7",
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
