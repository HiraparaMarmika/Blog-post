import React, { useState } from "react";
import PostApi from "../components/Postapicalling/PostApi";
import { useLoaderData } from "react-router-dom";

export default function ApiPostPage() {
  let data = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostindex = currentPage * postPerPage;
  const firstPostIndex = lastPostindex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostindex);
  return (
    <>
      <PostApi
        data={currentPosts}
        totalPost={data.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();
  console.log(data);

  return data;
};
