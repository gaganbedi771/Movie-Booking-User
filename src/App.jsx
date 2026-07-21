import React, { useContext } from "react";
import Header from "./components/Header";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";

import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home></Home> : <AuthPage></AuthPage>}
        ></Route>
        <Route
          path="/home"
          element={isAuthenticated ? <Home></Home> : <AuthPage></AuthPage>}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
