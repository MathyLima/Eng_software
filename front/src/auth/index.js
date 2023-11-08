import React from "react";
import Topbar from "../views/global/Topbar";
import { Sidebar } from "react-pro-sidebar";
import { Navigate } from "react-router-dom";

function isAuthenticated() {
  const token = localStorage.getItem("token");
  if (token) return true;
  return false;
}

// localStorage.removeItem('token')

const PrivateRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  return authenticated ? (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        {children}
      </main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
