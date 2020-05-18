import React, { useEffect, useState, useRef } from "react";
import { auth, firestore } from "../database/firebase";
const UserContext = React.createContext(null);
export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userRef = useRef(firestore.collection("users")).current;
  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!!firebaseUser) {
        userRef.doc(firebaseUser.uid).onSnapshot((doc) => {
          if (doc.data()) {
            const userData = {
              uid: doc.data().uid,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              email: doc.data().email,
              created: doc.data().created,
              role: doc.data().role,
            };
            setUser(userData);
          } else {
            setUser(null);
          }
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, [userRef]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
