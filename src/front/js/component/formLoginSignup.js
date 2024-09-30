import React, { useState, useContext } from "react";
import { Context } from "../store/appContext"
import { useFormik } from 'formik';
import * as Yup from 'yup';

import icon from "../../img/icon.png";
import "../../styles/formLoginSignup.css"

export default function FormLoginSignup() {

  const { actions } = useContext(Context)
  const [formType, setFormType] = useState("login")

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: async values => {
      const logged = await actions.login(values)
      console.log(logged);
      
    },
  });




  return (
    <div className="d-flex flex-column vh-100 align-items-center justify-content-center">

      {/* formulario */}
      <form 
        className="formulario form-floating border px-5 py-5 w-75 mx-auto"
        onSubmit={formik.handleSubmit}>

        {/* navtab para login y signup */}
        <div className="nav-box">
          <ul className="nav nav-underline justify-content-center">
            <li className="nav-item">
              <p
                role="button"
                className={`nav-link ${formType === "login" ? "active" : ""}`}            
                onClick={() => setFormType("login")}
              >
                Login
              </p>
            </li>

            <li className="nav-item">
              <p
                role="button"
                className={`nav-link ${formType === "signup" ? "active" : ""}`}
                onClick={() => setFormType("signup")}
              >
                Signup
              </p>
            </li>
          </ul>

        </div>


        {/* icono y título */}
        <div className="form-title mt-5">
          <img 
            src={icon} 
            alt="money-tracker-icon"
            className="icon mx-auto d-block my-4" />

          <h2 className="form-title-h2 text-center my-5">
            
            {formType === "login" ? "Login" : "Register"}
            </h2>
        </div>


        {/* inputs */}
        <div className="form-floating mb-3">
          <input
            id="floatingInput"
            name="email" 
            type="email" 
            className="form-control"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email} />
          {formik.touched.email && formik.errors.email ? (
            <div className="formik-error mt-2 ms-1">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="floatingInput">Email address</label>
        </div>

        {formType === "login" && (
          <p className="forgot-password text-end mt-2 mb-0">Forgot your password?</p>
        )}

        <div className="form-floating">
          <input
            id="floatingPassword"
            name="password"  
            type="password" 
            className="form-control mb-3"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button type="submit" className="btn btn-lg submit-button mt-3 w-100">{formType === "login" ? "Login" : "Signup"}</button>

      </form>
    </div>

  );
}

