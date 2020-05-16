import React, { useState, useEffect, useRef } from "react";
import { auth, firestore } from "../database/firebase";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [message, setMessage] = useState("");
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
          }
          clearForm();
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      authUnsubscribe();
    };
  }, [userRef]);
  const onEmailLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        if (result) {
          const user = await firestore.doc(`users/${result.user.uid}`);
          const currentUser = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            created: user.created,
            role: user.role,
          };
          setUser(currentUser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onEmailSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        setMessage("ลงทะเบียนเรียบร้อย");
        setRegisterMode(false);
        if (result) {
          const userRef = firestore.collection("users").doc(result.user.uid);
          const doc = await userRef.get();
          if (!doc.data()) {
            await userRef.set({
              uid: result.user.uid,
              displayName: result.user.email.substring(
                0,
                email.lastIndexOf("@")
              ),
              photoURL: result.user.photoURL
                ? result.user.photoURL
                : require("../logo.svg"),
              email: result.user.email,
              created: new Date().valueOf(),
              role: "user",
            });
          }
        }
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeModeHandler = (e) => {
    setRegisterMode(e.target.checked);
    clearForm();
  };
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };
  if (!!user) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 mx-auto text-center">
            <div className="display-4 mt-3">สวัสดี: {user.displayName}</div>
            <img
              className="rounded float-center"
              src={user.photoURL}
              alt="user"
              width="30%"
              style={{ maxHeight: "300" }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      {message !== "" ? (
        <div className="row">
          <div className="col-sm-6 mx-auto text-center">
            <div className="alert-success p-2">{message}</div>
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-sm-6 mx-auto text-center">
          <h3>{registerMode ? "Register" : "Login"}</h3>
        </div>
      </div>
      <div className="row">
        <form className="col-sm-6 mx-auto">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback"></div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="invalid-feedback"></div>
          </div>
          <div className="row card-footer flex-column-reverse flex-sm-row">
            <div className="col-sm-6">
              <button
                className="btn btn-secondary mt-1"
                style={{ width: "100%" }}
              >
                ยกเลิก
              </button>
            </div>
            {!registerMode ? (
              <div className="col-sm-6">
                <button
                  type="submit"
                  className="btn btn-primary mt-1"
                  onClick={(e) => onEmailLogin(e)}
                  style={{ width: "100%" }}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="col-sm-6">
                <button
                  type="submit"
                  className="btn btn-primary mt-1"
                  onClick={(e) => onEmailSignUp(e)}
                  style={{ width: "100%" }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
          <div className="form-check form-check-inline d-flex justify-content-center">
            <div className="col-12 text-center">
              <input
                className="form-check-input"
                type="checkbox"
                id="mode"
                value={registerMode}
                onChange={changeModeHandler}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                ยังไม่ได้ลงทะเบียน ต้องการลงทะเบียน
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
