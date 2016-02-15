import React from "react";
import director from "director";
import { List } from "immutable";
import { connect } from "react-redux";
import BlogItem from "./BlogItem";
import { logout } from "../../lib/auth";
import { BLOGS, ERROR, ERROR_MESSAGE } from "../../schema/stateTree";
import ErrorMessage from "../messages/error";
import LoadMoreButton from "../home_redux/LoadMoreButton";

const dashboard =  React.createClass({

    logout: function () {
        logout();
        director.Router().setRoute("/admin/signin");
    },

    create: function () {
        director.Router().setRoute("/admin/create");
    },

    render: function () {
        let blogItems = this.props.blogs.map((blogItem) => {
            return <BlogItem key={blogItem.get("_id")} blogId={blogItem.get("_id")} blogHeading={blogItem.get("heading")} blogPublished={blogItem.get("published")}/>;
        });
        return (
            <div id="dashboard" className="container">
                <div className="row center aligned">
                    <h1>Welcome</h1>
                    <button onClick={this.create} className="ui blue button">Create</button>
                    <button onClick={this.logout} className="ui red button">Logout</button>
                    <h1>All Blog Posts</h1>
                </div>
                {blogItems}
                <div className="row center aligned">
                    <LoadMoreButton/>
                </div>
                <br/>
                { this.props.error ? <ErrorMessage errorMessage={this.props.errorMessage}/> : <noscript/> }
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        blogs: state.get(BLOGS) ? state.get(BLOGS) : List(),
        error: state.get(ERROR),
        errorMessage: state.get(ERROR_MESSAGE)
    };
}

export default connect(mapStateToProps)(dashboard);
