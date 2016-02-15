import React from "react";
import director from "director";
import { connect } from "react-redux";
import { fetchBlogsIfNeeded, fetchBlogById, setErrorAction, setSuccessAction, setCurrentViewAction } from "../actions/action";
import Signin from "./admin_redux/Signin";
import Dashboard from "./admin/dashboard";
import Create from "./admin_redux/Create";
import BlogContent from "./blog_post_redux/BlogContent";
import HomeContainer from "./home_redux/HomeContainer";
import { checkAuth } from "../lib/auth";
import { BLOGS } from "../schema/stateTree";

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
                    this.props.dispatch(fetchBlogById(id));
                    this.setState({ currentView: <BlogContent/> });
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
                this.props.dispatch(fetchBlogById(id));
                this.setState({ currentView: checkAuth() ? <Create editId={id}/> : <Signin/> });
            },
            "/admin/dashboard": () => {
                this.setState({ currentView: checkAuth() ? <Dashboard/> : <Signin/> });
            },
            "/.*": () => {
                this.setState({ currentView: <div>404</div> });
            }
        }).configure({
            html5history: true,
            // Do any state resets in here, this way we don't save states from one view to another
            before: () => {
                this.props.dispatch(setErrorAction("", false));
                this.props.dispatch(setSuccessAction(false));
                this.props.dispatch(setCurrentViewAction());
            }
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
    return {
        Blogs: state.get(BLOGS)
    };
})(App);
