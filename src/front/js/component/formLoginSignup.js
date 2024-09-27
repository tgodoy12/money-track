import React from "react";
import icon from "../../img/icon.png";
import "../../styles/formLoginSignup.css"

export default function FormLoginSignup() {
  return (
    <div className="d-flex vh-100 align-items-center justify-content-center border">

      <form className="formulario form-floating border p-3 w-75 mx-auto">
        


        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
      </form>
    </div>


    // <div className="form-box vh-100 border mt-5">
      



    //   <form className="form-floating border p-3 w-75 mx-auto">

    //     <div className="form-floating mb-3">
    //       <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
    //       <label for="floatingInput">Email address</label>
    //     </div>
    //     <div className="form-floating">
    //       <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
    //       <label for="floatingPassword">Password</label>
    //     </div>

    //   </form>
    

    
      
        
    // </div>
  );
}

