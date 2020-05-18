import React, { useContext } from "react";
import { onGoogleLogin, onLogout } from "../database/firebase";
import UsersContext from "../providers/UsersProvider";
const Header = () => {
  const user = useContext(UsersContext);
  return (
    <div className="row mt-4">
      <div className="col-sm-10 mx-auto">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
            </ul>
            <ul className="navbar-nav mr">
              {!!user ? (
                <div>
                  {user.displayName}{" "}
                  <img
                    src={user.photoURL}
                    alt="user"
                    width="40"
                    height="40"
                    className="img mr-1 rounded-circle"
                  />
                </div>
              ) : null}
              {!!user ? (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#logout"
                    onClick={onLogout}
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#login"
                    onClick={onGoogleLogin}
                  >
                    Google Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Header;
