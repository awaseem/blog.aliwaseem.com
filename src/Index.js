import "whatwg-fetch";
// import all css files into entry point
import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./styles/main.css";
// Import React components
import React from "react";
import { render } from "react-dom";
import App from "./components/App";

window.React = React;

render( <App/>, document.getElementById("content"));
