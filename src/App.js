import React from "react";
import Header from "./components/Header";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import { UsersProvider } from "./providers/UsersProvider";
function App() {
  return (
    <UsersProvider>
      <div className="container">
        <Header />
        <LoginForm />
      </div>
    </UsersProvider>
  );
}
export default App;
