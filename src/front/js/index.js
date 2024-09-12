//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";
import './../../../src/output.css';


//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Layout />);
