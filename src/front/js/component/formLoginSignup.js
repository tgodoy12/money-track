import React, { useState } from "react";
import icon from "../../img/icon.png";
import "../../styles/formLoginSignup.css"

export default function FormLoginSignup() {

  const [formType, setFormType] = useState("login")

  return (
    <div className="d-flex flex-column vh-100 align-items-center justify-content-center">

      {/* formulario */}
      <form className="formulario form-floating border p-5 w-75 mx-auto">

        {/* navtab para login y signup */}
        <div className="nav-box">
          <ul className="nav nav-underline justify-content-center">
            <li className="nav-item">
              <a
                className={`nav-link ${formType === "login" ? "active" : ""}`}
                aria-current="page"
                href="#"
                onClick={() => setFormType("login")}
              >
                Login
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${formType === "signup" ? "active" : ""}`}
                href="#"
                onClick={() => setFormType("signup")}
              >
                Signup
              </a>
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
            
            {formType === "login" ? "Login to your account" : "Register"}
            </h2>
        </div>


        {/* inputs */}
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {formType === "login" && (
          <p className="forgot-password mt-2 text-end">Forgot your password?</p>
        )}

        <button type="submit" className="btn btn-lg submit-button mt-3 w-100">{formType === "login" ? "Login" : "Signup"}</button>

      </form>
    </div>

  );
}

