import React from "react";
import { List, Map } from "immutable";
import director from "director";
import { connect } from "react-redux";
import { fetchBlogsIfNeeded } from "../actions/action";
import Signin from "./admin/signin";
import Dashboard from "./admin/dashboard";
import Create from "./admin/create";
import Content from "./home/content";
import HomeContainer from "./home_redux/HomeContainer";
import { checkAuth } from "../lib/auth";

const App = React.createClass({

    getInitialState: function () {
        return { currentView: <noscript/> };
    },

    componentDidMount: function() {
        let router = director.Router({
            "/": {
                on: () => {
                    this.props.dispatch(fetchBlogsIfNeeded());
                    this.setState({ currentView: <HomeContainer/> });
                }
            },
            "/blog/:id": {
                on: (id) => {
                    this.setState({ currentView: <Content id={id}/> });
                }
            },
            // Admin routes, each route is checked to ensure the user is logged. The reason
            // there isn"t a before route is that routes actaully leak UI before auth
            "/admin/signin": () => {
                this.setState({ currentView: <Signin/> });
            },
            "/admin/create": () => {
                this.setState({ currentView: checkAuth() ? <Create/> : <Signin/> });
            },
            "/admin/create/:id": (id) => {
                this.setState({ currentView: checkAuth() ? <Create editId={id}/> : <Signin/> });
            },
            "/admin/dashboard": () => {
                this.setState({ currentView: checkAuth() ? <Dashboard/> : <Signin/> });
            },
            "/.*": () => {
                this.setState({ currentView: <div>404</div> });
            }
        }).configure({
            html5history: true
        });
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

export default connect( state => {
    return { Blogs: state.get("Blogs") ? state.get("Blogs") : List() };
})(App);
