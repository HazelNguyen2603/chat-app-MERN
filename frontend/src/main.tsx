import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
