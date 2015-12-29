import React from "react";
import director from "director";
import BlogItem from "./blogItem";
import { logout } from "../../lib/auth";
import { getBlogs } from "../../lib/blog";
import ErrorMessage from "../messages/error";

export default React.createClass({

    getInitialState: function () {
        return {
            blogs: [],
            date: "",
            error: "",
            noMoreBlogs: true
        };
    },

    logout: function () {
        logout();
        director.Router().setRoute("/admin/signin");
    },

    create: function () {
        director.Router().setRoute("/admin/create");
    },

    getBlogsFromServer: function () {
        getBlogs(this.state.date)
            .then((blogs) => {
                if (blogs.length !== 0) {
                    this.setState({
                        blogs: this.state.blogs.concat(blogs),
                        date: blogs[blogs.length - 1].createdOn,
                        noMoreBlogs: false
                    });
                }
                else {
                    this.setState({
                        noMoreBlogs: true
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    error: "Error: Failed to retrive blogs from the server!"
                });
            });
    },

    componentDidMount: function () {
        // get blogs on initial load
        this.getBlogsFromServer();
        // animation for dashboard when it mounts
        $('#dashboard')
            .transition('fade in');
    },

    render: function () {
        let blogItems = this.state.blogs.map((blogItem) => {
            return <BlogItem key={blogItem._id} blogId={blogItem._id} blogHeading={blogItem.heading}/>;
        });
        return (
            <div id="dashboard" className="ui center aligned container">
                <h1>Welcome</h1>
                <button onClick={this.create} className="ui blue button">Create</button>
                <button onClick={this.logout} className="ui red button">Logout</button>
                <h1>All Blog Posts</h1>
                <div className="ui three column stackable grid">
                    {blogItems}
                    <div className="centered row">
                        { this.state.noMoreBlogs ? <noscript/> : <button className="ui button" onClick={this.getBlogsFromServer}>Load More</button> }
                    </div>
                </div>
                <br/>
                { this.state.error ? <ErrorMessage errorMessage={this.state.error}/> : <noscript/> }
            </div>
        );
    }
});
