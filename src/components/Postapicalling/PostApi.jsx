import React, { useState } from "react";
import "./PostApi.css";
import { CiSearch } from "react-icons/ci";
export default function PostApi(props) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(props.totalPost / props.postPerPage); i++) {
    pages.push(i);
  }
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="postapi-main">
        <div className="postapi-search">
          <div>
            <h1>Explore Post</h1>
          </div>
          <div className="blog-search">
            <CiSearch className="links" />
            <input
              type="text"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>

        {props.data
          .filter((item) => {
            if (search == "") {
              return item;
            } else if (
              item.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return item;
            }
          })
          .map((item) => {
            return (
              <>
                <div className="postapi-container">
                  <p className="title">
                    <span>Title:</span>&nbsp;&nbsp;
                    {item.title}
                  </p>
                  <p className="description">
                    <span>Description:</span>&nbsp;&nbsp;
                    {item.body}
                  </p>
                </div>
              </>
            );
          })}
        <div className="postapi-btn">
          {pages.map((page, index) => (
            <button key={index} onClick={() => props.setCurrentPage(page)}>
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
