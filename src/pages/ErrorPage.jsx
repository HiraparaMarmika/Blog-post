import React from "react";
import Navbar from "../components/navbar/Navbar";
export default function ErrorPage() {
  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", color: "red" }}>Something wrong!</h1>
    </>
  );
}
