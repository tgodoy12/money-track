import React from "react";
import icon from "../../img/icon.png";
import "../../styles/formLoginSignup.css"

export default function FormLoginSignup() {
  return (
    <div className="form-box border mt-5">
      
      <form class="form-floating border m-5 p-3">

        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
          <label for="floatingPassword">Password</label>
        </div>
        
      </form>
        
    </div>
  );
}

