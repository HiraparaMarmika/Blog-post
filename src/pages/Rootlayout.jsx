import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Rootlayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
