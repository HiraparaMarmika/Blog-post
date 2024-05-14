import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { mycontext } from "../../context/Data";
import LinesEllipsis from "react-lines-ellipsis";

import EditModel from "../editmodel/EditModel";
import { NavLink, useNavigate } from "react-router-dom";
import ReadMoreReact from "read-more-react";

export default function Post() {
  const nav = useNavigate();
  const { formData, setFormData } = useContext(mycontext);

  const [editPost, setEditPost] = useState("");

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
    setFormData(deleteData);
  };
  const onEdit = (data) => {
    setFormData(data);
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
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>Trending </h1>
      <div className="post-bg">
        {console.log(formData)}
        {formData.length > 0 ? (
          <div className="post-box">
            {formData.map((items) => (
              <>
                <div className="post-data ">
                  <div className="post-img">
                    <img
                      src={items?.image}
                      alt=""
                      // onClick={}
                    />
                  </div>
                  <div className="post-detailspage">
                    <p>{items.title}</p>
                    <p className="desc">
                      <LinesEllipsis
                        text={items.desc}
                        maxLine="3"
                        ellipsis="..."
                        trimRight
                        basedOn="letters"
                      />
                    </p>
                    <NavLink
                      className="post-readmore"
                      onClick={() => {
                        detailspage(items.id);
                      }}
                    >
                      Read More &rarr;
                    </NavLink>
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
                          onClick={() => {
                            editHandler(items.id);
                          }}
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
        ) : (
          <h1 style={{ textAlign: "center", color: "red" }}>
            No Post Available...
          </h1>
        )}
      </div>
    </>
  );
}
