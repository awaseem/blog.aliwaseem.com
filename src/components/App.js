import React from 'react';
import director from "director";
import About from "./About";
import Signin from "./admin/signin";
import Dashboard from "./admin/dashboard";
import Create from "./admin/create";
import Header from "./home/header";
import Content from "./home/content";
import Posts from "./home/posts";
import { checkAuth } from "../lib/auth";

export default React.createClass({

    getInitialState: function () {
        return { currentView: <noscript/> };
    },

    componentDidMount: function() {
        let router = director.Router({
            "/": {
                on: () => {
                    this.setState({ currentView: <Posts/> });
                }
            },
            "/blog/:id": {
                on: (id) => {
                    this.setState({ currentView: <Content id={id}/> });
                }
            },
            "/about": {
                on: () => {
                    this.setState({ currentView: <About/> });
                }
            },
            "/.*": () => {
                console.log("world");
                this.setState({ currentView: <div>404</div> });
            }
        });

        let adminRouter = director.Router({
            "/admin": {
                "/signin": () => {
                    console.log("hello");
                    this.setState({ currentView: <Signin/> });
                },
                "/create": () => {
                    this.setState({ currentView: checkAuth() ? <Create/> : <noscript/> });
                },
                "/create/:id": (id) => {
                    this.setState({ currentView: checkAuth() ? <Create editId={id}/> : <noscript/> });
                },
                "/dashboard": () => {
                    this.setState({ currentView: checkAuth() ? <Dashboard/> : <noscript/> });
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
