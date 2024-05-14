import React, { useContext, useEffect, useState } from "react";
import { mycontext } from "../../context/Data";
import "./EditModel.css";

import { createPortal } from "react-dom";
export default function Editmodel({ cancle, editpost, onEdit }) {
  const [editData, setEditData] = useState({
    id: Math.random(),
    title: "",
    desc: "",
    image: "",
  });
  const { formData, setFormData } = useContext(mycontext);
  const allDataHandler = (event) => {
    const { name, value } = event.target;
    if (event.target.type == "file") {
      console.log(event.target.files);
      const image = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.addEventListener("load", (e) => {
        setEditData((prev) => {
          return { ...prev, [name]: e.target.result };
        });
      });
    } else {
      setEditData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  useEffect(() => {
    setEditData((prev) => {
      console.log(prev);
      return {
        ...prev,
        title: editpost[0]?.title,
        desc: editpost[0]?.desc,
        image: editpost[0]?.image,
      };
    });
  }, [editpost]);

  const editTaskHandler = (e) => {
    e.preventDefault();
    const data = [...editpost];
    const index = formData.findIndex((i) => i.id === data[0].id);
    console.log(index);
    formData[index] = {
      id: data[0].id,
      title: editData.title,
      desc: editData.desc,
      image: editData.image,
    };
    console.log(index);
    setFormData(formData);
    localStorage.setItem("formdata", JSON.stringify(formData));
    onEdit(formData);
  };

  return (
    <>
      {createPortal(
        <>
          <div className="model">
            <div className="form-box">
              <h1 style={{ textAlign: "center" }}>Edit Model</h1>
              <form action="" onSubmit={editTaskHandler}>
                <input
                  className="file"
                  type="file"
                  name="image"
                  id="image"
                  onChange={allDataHandler}
                />
                <label htmlFor="">title:</label>
                <input
                  type="text"
                  name="title"
                  id=""
                  value={editData?.title}
                  onChange={allDataHandler}
                />
                <label htmlFor="">desc:</label>
                <input
                  type="text"
                  name="desc"
                  onChange={allDataHandler}
                  value={editData?.desc}
                />
                <div className="model-btn">
                  <button className="edit">edit</button>
                  <button className="cancle" onClick={cancle}>
                    cancle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>,
        document.getElementById("model")
      )}
    </>
  );
}
