import React from 'react';
import director from "director";
import About from "./About";
import Signin from "./admin/signin";
import Dashboard from "./admin/dashboard";
import Create from "./admin/create";
import { checkAuth } from "../lib/auth";

export default React.createClass({

    getInitialState: function () {
        return { currentView: <div>Hello world!</div> };
    },

    componentDidMount: function() {
        let router = director.Router({
            "/": {
                on: () => {
                    this.setState({ currentView: <div>Hello world! this is a test <a href="#/about">About</a></div>});
                }
            },
            "/about": {
                on: () => {
                    this.setState({ currentView: <About/> });
                }
            }
        });

        let adminRouter = director.Router({
            "/admin": {
                "/signin": () => {
                    this.setState({ currentView: <Signin/> });
                },
                "/create": () => {
                    this.setState({ currentView: checkAuth() ? <Create/> : <noscript/> });
                },
                "/create/:id": (id) => {
                    this.setState({ currentView: checkAuth() ? <Create editId={id}/> : <noscript/> });
                },
                on: () => {
                    this.setState({ currentView: checkAuth() ? <Dashboard/> : <noscript/> });
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
