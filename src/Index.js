import "whatwg-fetch";
// Import all redux stores, actions and dispatchers
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { fetchBlogs } from "./actions/action";
import reducer from "./reducer/reducer";
// import all css files into entry point
import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./styles/main.css";
// Import React components
import React from "react";
import { render } from "react-dom";
import App from "./components/App";

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(reducer);

store.dispatch(fetchBlogs());

window.React = React;

render( <App/>, document.getElementById("content"));
