import "whatwg-fetch";
import $ from "jquery";
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

window.jQuery = $;

window.React = React;

render( <App/>, document.getElementById('content'));
