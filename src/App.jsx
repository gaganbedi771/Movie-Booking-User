import React, { useContext } from "react";
import Header from "./components/Header";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";
import BookingPage from "./components/BookingPage";

import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";
import Footer from "./components/Footer";

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
        <Route path="/booking/:movieId" element={isAuthenticated ? <BookingPage /> : <AuthPage />} />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default App;
