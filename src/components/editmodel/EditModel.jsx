import React, { useContext, useEffect, useState } from "react";
import { mycontext } from "../../context/Data";
import "./Editmodel.css";
import ReadMoreReact from "read-more-react";
import { createPortal } from "react-dom";
export default function Editmodel({ cancle, editpost, onEdit }) {
  const [editdata, seteditdata] = useState({
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
        seteditdata((prev) => {
          return { ...prev, [name]: e.target.result };
        });
        // data = e.target.result;
      });
    } else {
      seteditdata((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  useEffect(() => {
    seteditdata((prev) => {
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
      title: editdata.title,
      desc: editdata.desc,
      image: editdata.image,
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
          <div className="model" onClick={cancle}></div>
          <div className="form-box">
            <h1 style={{ textAlign: "center" }}>Edit Model</h1>
            <form action="" onSubmit={editTaskHandler}>
              <input
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
                value={editdata?.title}
                onChange={allDataHandler}
              />
              <label htmlFor="">desc:</label>{" "}
              <input
                type="text"
                name="desc"
                onChange={allDataHandler}
                value={editdata?.desc}
              />
              <ReadMoreReact
                text={editdata?.desc}
                min={0}
                max={100}
                readMoreText="..."
              />
              <div className="model-btn">
                <button className="edit">edit</button>
                <button className="cancle" onClick={cancle}>
                  cancle
                </button>
              </div>
            </form>
          </div>
        </>,
        document.getElementById("model")
      )}
    </>
  );
}
