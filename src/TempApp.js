import React, { useState, useEffect } from "react";
import { firestore } from "./database/firebase";
import { getUserData } from "./utilities";
import SignIn from "./SignIn";
function App() {
  const [users, setUsers] = useState([]);
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    const unsubscribe = firestore.collection("users").onSnapshot((snapshot) => {
      const tempData = snapshot.docs.map(getUserData);
      setUsers((old) => tempData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addUsers = async (newUser) => {
    try {
      await firestore.collection("users").add(newUser);
      setDisplayName("");
    } catch (err) {
      console.log(err);
    }
  };
  const removeUsers = async (id) => {
    try {
      await firestore.doc(`users/${id}`).delete();
    } catch (err) {
      console.log(err);
    }
  };
  const editUsers = async (id, name) => {
    try {
      await firestore.doc(`users/${id}`).update({ displayName: name });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button onClick={() => addUsers({ displayName: displayName })}>
        add
      </button>
      <div>
        <SignIn />
        {users.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
              }}
            >
              <div style={{ marginRight: "5px" }}>{item.displayName}</div>
              <button onClick={() => removeUsers(item.id)}>delete</button>
              <button onClick={() => editUsers(item.id, `#name-${item.id}`)}>
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
