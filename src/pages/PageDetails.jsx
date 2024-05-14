import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { mycontext } from "../context/Data";
import "./PageDetails.css";
const PageDetails = () => {
  const { formData } = useContext(mycontext);
  const param = useParams();
  console.log(param);
  const filterdata = formData.filter((data) => data.id == param.Id);
  console.log(filterdata);

  return (
    <>
      <div className="postdetail-container">
        <div className="postdetail">
          <div>
            <img src={filterdata[0].image} alt="" />
          </div>
          <div className="postdetail-data">
            <p className="title">
              <span> Title:</span>&nbsp;&nbsp;
              {filterdata[0].title}
            </p>
            <p className="description">
              <span> Description:</span>&nbsp;&nbsp;
              {filterdata[0].desc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageDetails;
