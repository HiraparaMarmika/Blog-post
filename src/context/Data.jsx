import React, { createContext, useEffect, useState } from "react";

export const mycontext = createContext();

export default function Data(props) {
  const [formData, setFormData] = useState(
    JSON.parse(localStorage.getItem("formdata")) || []
  );
  localStorage.setItem("formdata", JSON.stringify(formData));

  useEffect(() => {
    localStorage.setItem("formdata", JSON.stringify(formData));
  }, [formData]);
  return (
    <>
      <mycontext.Provider
        value={{
          formData,
          setFormData,
        }}
      >
        {props.children}
      </mycontext.Provider>
    </>
  );
}
