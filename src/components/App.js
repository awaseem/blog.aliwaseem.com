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
            "/home": {
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
            "/admin": {
                "/signin": () => {
                    this.setState({ currentView: <Signin/> });
                },
                "/create": () => {
                    this.setState({ currentView: checkAuth() ? <Create/> : director.Router().setRoute("admin/signin") });
                },
                "/create/:id": (id) => {
                    this.setState({ currentView: checkAuth() ? <Create editId={id}/> : director.Router().setRoute("admin/signin") });
                },
                "/dashboard": () => {
                    this.setState({ currentView: checkAuth() ? <Dashboard/> : director.Router().setRoute("admin/signin") });
                },
                on: () => {
                    this.setState({ currentView: checkAuth() ? <Dashboard/> : director.Router().setRoute("admin/signin") });
                }
            },
            "/.*": () => {
                this.setState({ currentView: <div>404</div> });
            },
        }).configure({
            html5history: true
        });
        console.log(window.location);
        router.init();
    },

    render: function () {
        return (
            <div>
                {this.state.currentView}
            </div>
        );
    }
});
