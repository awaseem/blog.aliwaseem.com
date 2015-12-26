import React from 'react';
import director from "director";
import About from "./About";
import Signin from "./admin/signin";
import { checkAuth } from "../lib/auth";

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
                    this.setState({ currentView: <Signin/> });
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
                if (!checkAuth()) {
                    director.Router().setRoute("admin/signin");
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
