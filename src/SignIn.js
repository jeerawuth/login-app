import React, { useState, useEffect } from "react";
import { auth, googleProvider, firestore } from "./database/firebase";
export default function SignIn() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      authUnsubscribe();
    };
  }, []);
  const googleLoginHandler = async () => {
    const result = await auth.signInWithPopup(googleProvider);
    if (result) {
      const userRef = firestore.collection("users").doc(result.user.uid);
      userRef.get().then((doc) => {
        if (!doc.data()) {
          userRef.set({
            uid: result.user.uid,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
            created: new Date().valueOf(),
            role: "user",
          });
        } else {
          console.log("มีผู้ใช้นี้อยู่แล้ว");
        }
      });
    }
  };
  const signOutHandler = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logout OK");
      })
      .catch((err) => {
        console.log("Logout Not OK." + err);
      });
  };
  return (
    <div>
      {!user ? (
        <button onClick={googleLoginHandler}>Google Login</button>
      ) : (
        <button onClick={signOutHandler}>Logout</button>
      )}
    </div>
  );
}
