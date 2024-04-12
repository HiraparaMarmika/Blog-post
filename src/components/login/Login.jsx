import React, { useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginschema } from "../../schemas";
const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};
export default function Login() {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginschema,
      onSubmit: (values, action) => {
        console.log(values);
        localStorage.setItem("login", JSON.stringify(values));
        action.resetForm();
        navigate("/");
      },
    });

  return (
    <>
      <div className="login-container">
        <div className="login-main">
          <form action="" onSubmit={handleSubmit}>
            <h1>Login Now!</h1>
            <input
              type="text"
              name="name"
              placeholder="Enter Name*"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <p className="validation">{errors.name}</p>
            ) : null}
            <input
              type="email"
              name="email"
              placeholder="Enter Email*"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <p className="validation">{errors.email}</p>
            ) : null}
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter Password*"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <p className="validation">{errors.password}</p>
            ) : null}
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="role"
              value={values.role}
            >
              <option> Select Mode*</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && touched.role ? (
              <p className="validation">{errors.role}</p>
            ) : null}
            <div className="login-btn">
              <button>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
