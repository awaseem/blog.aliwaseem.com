import React from 'react';
import director from "director";
import token from "../lib/tokenStorage";
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
                    this.setState({ currentView: <About/> });
                }
            }
        });
        var adminRouter = director.Router({
            "/admin": {
                "/signin": () => {
                    this.setState({ currentView: <div>Please sign in!</div> });
                },
                "/test": () => {
                    this.setState({ currentView: <div>you should not see this</div>});
                },
                on: () => {
                    this.setState({ currentView: <About/>});
                }
            }
        }).configure({
            before: () => {
                if (!token.getToken()) {
                    router.setRoute("admin/signin");
                }
            }
        });
        adminRouter.init();
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
