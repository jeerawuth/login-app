import React from "react";
import Header from "./components/Header";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import PostScreen from "./PostScreen";
import { BrowserRouter, Route } from "react-router-dom";
import { UsersProvider } from "./providers/UsersProvider";
function App() {
  return (
    <UsersProvider>
      <Header />
      <BrowserRouter>
        <Route path="/login" component={LoginForm} />
        <Route path="/post/:id" component={PostScreen} />
      </BrowserRouter>
    </UsersProvider>
  );
}
export default App;
