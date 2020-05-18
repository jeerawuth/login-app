import React, { useState, useContext } from "react";
import { auth, firestore, onLogout } from "../database/firebase";
import UsersContext from "../providers/UsersProvider";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [message, setMessage] = useState("");
  const user = useContext(UsersContext);
  const [loading, setLoading] = useState(false);

  const onEmailLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.code);
        setLoading(false);
      });
  };
  const onEmailSignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        setMessage("ลงทะเบียนเรียบร้อย");
        if (!!result) {
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
        setMessage(err.code);
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
        {loading ? (
          <div className="row">
            <div className="col-sm-4 mx-auto d-flex justify-content-center">
              <div className="spinner-grow text-danger m-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-warning m-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-info m-1" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="row mt-1">
            <div className="col-sm-10 mx-auto text-center">
              <div className="display-4 mt-3">สวัสดี: {user.displayName}</div>
              <img
                className="rounded float-center mt-2 border rounded"
                src={user.photoURL}
                alt="user"
                width="30%"
                style={{ maxHeight: "300" }}
              />
            </div>
          </div>
        )}
        <div className="row mt-1">
          <div className="col-sm-10 mx-auto text-center">
            <hr />
            <button className="btn btn-info" onClick={onLogout}>
              Logout
            </button>
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
            <div className="alert-warning p-2">{message}</div>
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
              onFocus={() => setMessage("")}
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
              onFocus={() => setMessage("")}
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
