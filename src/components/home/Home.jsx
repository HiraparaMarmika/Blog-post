import React, { useContext, useState } from "react";

import { mycontext } from "../../context/Data";
import PostCreate from "../PostCreate/PostCreate";

export default function Home() {
  const { formData, setFormData } = useContext(mycontext);
  console.log(formData);

  const formDataHandler = (alldata) => {
    setFormData((prev) => {
      return [
        ...prev,
        {
          title: alldata.title,
          desc: alldata.desc,
          key: Math.random(),
          id: Math.random(),
          image: alldata.image,
        },
      ];
    });
  };
  return (
    <>
      <PostCreate formDataHandler={formDataHandler} />
    </>
  );
}
