import React from "react";
import { Navigate } from "react-router-dom";

export default function Privateroutes({ children }) {
  const login = JSON.parse(localStorage.getItem("login")) || false;
  console.log(login);
  return !login ? <Navigate to="/login" /> : children;
}
