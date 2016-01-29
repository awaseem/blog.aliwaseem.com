import "whatwg-fetch";
// Import all redux stores, actions and dispatchers
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer/reducer";
// import all css files into entry point
import "./styles/normalize.css";
import "./styles/skeleton.css";
import "./styles/main.css";
import "velocity-animate";
import "velocity-animate/velocity.ui";
// Import React components
import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { STATE_TREE } from "./schema/stateTree";

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(reducer, STATE_TREE);

window.React = React;

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("content")
);
