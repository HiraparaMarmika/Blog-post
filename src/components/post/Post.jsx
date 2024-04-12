import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { mycontext } from "../../context/Data";
import EditModel from "../editmodel/EditModel";
import { useNavigate } from "react-router-dom";
import ReadMoreReact from "read-more-react";

export default function Post() {
  const nav = useNavigate();
  const { formData, setformData } = useContext(mycontext);

  const [editPost, setEditPost] = useState({});

  const [openModel, setOpenModel] = useState(false);

  const [isadmin, setisadmin] = useState(false);
  const login = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    if (login.role == "admin") {
      setisadmin(true);
    }
  }, [login]);

  const editHandler = (id) => {
    console.log(id);
    setOpenModel(true);

    const editData = formData.filter((item) => id === item.id);
    console.log(editData);
    setEditPost(editData);
  };
  const cancle = () => {
    setOpenModel(false);
  };
  const deleteHandler = (id) => {
    console.log(id);
    const deleteData = formData.filter((item) => id !== item.id);
    setformData(deleteData);
  };
  const onEdit = (data) => {
    setformData(data);
    setOpenModel(false);
  };
  const detailspage = (id) => {
    console.log(id);
    nav(`/details/${id}`);
  };
  return (
    <>
      {openModel && (
        <EditModel cancle={cancle} editpost={editPost} onEdit={onEdit} />
      )}
      <h1 style={{ textAlign: "center" }}>Trending Post</h1>
      <div className="post-bg">
        {console.log(formData)}
        <div className="post-box">
          {formData.map((items) => (
            <>
              <div className="post-data ">
                <div className="post-img">
                  <img
                    src={items?.image}
                    alt=""
                    onClick={() => {
                      detailspage(items.id);
                    }}
                  />
                </div>
                <div className="post-detailspage">
                  <p>{items.title}</p>
                  <p className="desc">
                    <ReadMoreReact
                      text={items.desc}
                      min={0}
                      max={100}
                      readMoreText="..."
                    />
                  </p>
                  {isadmin && (
                    <div className="post-btn">
                      <button
                        className="delete"
                        onClick={() => {
                          deleteHandler(items.id);
                        }}
                      >
                        delete
                      </button>
                      <button
                        className="edit"
                        onClick={() => editHandler(items.id)}
                      >
                        edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
