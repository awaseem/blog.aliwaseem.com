import React from 'react';
import director from "director";
import About from "./About";

export default React.createClass({

    getInitialState: function () {
        return { currentView: <div>Hello world!</div> };
    },

    componentDidMount: function() {
        var router = director.Router({
            "/": {
                on: () => {
                    this.setState({ currentView: <div>Hello world! <a href="#/about">About</a></div>});
                }
            },
            "/about": {
                on: () => {
                    this.setState({ currentView: <About/>});
                }
            }
        });
        router.init("/");
    },

    render: function () {
        return (
            <div>
                {this.state.currentView}
            </div>
        );
    }
});
