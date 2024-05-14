import React, { useEffect, useState } from "react";
import "../App.css";
import PostApi from "../components/Postapicalling/PostApi";
// import { useLoaderData } from "react-router-dom";
import Spinner from "../assets/Spinner@1x-1.0s-200px-200px.gif";

export default function ApiPostPage() {
  // let data = useLoaderData();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loader();
  }, []);
  const loader = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const result = await response.json();
      setIsLoading(false);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostindex = currentPage * postPerPage;
  const firstPostIndex = lastPostindex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostindex);
  return (
    <>
      {!isLoading ? (
        <PostApi
          data={currentPosts}
          totalPost={data.length}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div className="api-spinner">
          <div>
            <img src={Spinner} alt="" className="spinner" />
          </div>
        </div>
      )}
    </>
  );
}
