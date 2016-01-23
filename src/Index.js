import "whatwg-fetch";
// import all css files into entry point
import "../public/normalize.css";
import "../public/skeleton.css";
import "../public/main.css";
// Import React components
import React from "react";
import { render } from "react-dom";
import App from "./components/App";

window.React = React;

render( <App/>, document.getElementById("content"));
