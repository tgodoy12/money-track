import React, { useState } from "react";
import { Link } from "react-router-dom";


import "../../styles/navbar.css";
import icon from "../../img/icon.png";

export const Navbar = () => {
  const navigation = [
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" },
  ];

  
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    
    <div className="">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
        <div className="d-flex">
        <Link
            to="/"
            className=""
          >
            <span className="sr-only">Money-Tracker</span>
            <img alt="Money-Tracker Logo" 
            src={icon} 
            className="logo-icon mx-2" 
            style={{"width": "35px", "height": "35px"}} />
          </Link>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {/* Centrar la lista de navegación */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {navigation.map((item) => (
                <li className="nav-item" key={item.name}>
                  <Link
                    to={item.href}
                    className="nav-link mx-2 text-decoration-none"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Botón de Login a la derecha */}
            <div className="">
              <Link
                to="/login" 
                className="login btn btn-outline-success"
               >Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
