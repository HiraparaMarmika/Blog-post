import React, { useContext, useState } from "react";

import Createpost from "../createpost/Createpost";
import { mycontext } from "../../context/Data";

export default function Home() {
  const { formData, setFormData } = useContext(mycontext);
  console.log(formData);

  const formdatahandler = (alldata) => {
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
      <Createpost formdatahandler={formdatahandler} />
    </>
  );
}
