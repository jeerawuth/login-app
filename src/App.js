import React from "react";
import Header from "./components/Header";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
function App() {
  return (
    <div className="container">
      <Header />
      <LoginForm />
    </div>
  );
}
export default App;
