import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "./PostCreate.css";

export default function PostCreate({ formDataHandler }) {
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
      });
    } else {
      setAlldata((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (allData.title === "" || allData.desc === "" || allData.image === "") {
      return;
    }

    formDataHandler(allData);
    Swal.fire({
      title: "success!",
      text: "Post added success fully!",
      icon: "success",
      confirmButtonText: "Done",
    });
    setAlldata({ title: "", desc: "", image: "" });
    navigate("/");
  };
  return (
    <>
      <div className="createpost-bg">
        <div className="createpost-container">
          <h1>Create Post</h1>
          <form action="" onSubmit={submitHandler}>
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
            <label htmlFor="image">Choose file:</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={allDataHandler}
            />
            <button>Add Post</button>
          </form>
        </div>
      </div>
    </>
  );
}
