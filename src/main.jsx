import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import AuthContextProvider from "./store/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./store/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </AuthContextProvider>,
);
