import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Createpost.css";
export default function Createpost({ formdatahandler }) {
  const navigate = useNavigate();

  const [allData, setAlldata] = useState({ title: "", desc: "", image: "" });

  const allDataHandler = (event) => {
    const { name, value } = event.target;
    if (event.target.type == "file") {
      console.log(event.target.files);
      const image = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.addEventListener("load", (e) => {
        setAlldata((prev) => {
          return { ...prev, [name]: e.target.result };
        });
        // data = e.target.result;
      });
    } else {
      setAlldata((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(allData);
    formdatahandler(allData);
    navigate("/");
  };

  return (
    <>
      <div className="createpost-bg">
        <div className="createpost-container">
          <h1>Create Post</h1>
          <form action="" onSubmit={submitHandler}>
            <label htmlFor="image">Choose file:</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={allDataHandler}
            />
            <label htmlFor="">Title:</label>
            <input
              type="text"
              onChange={allDataHandler}
              value={allData.title}
              name="title"
            />
            <label htmlFor="">description:</label>
            <input
              type="text"
              onChange={allDataHandler}
              value={allData.desc}
              name="desc"
            />
            <button>Add Post</button>
          </form>
        </div>
      </div>
    </>
  );
}
