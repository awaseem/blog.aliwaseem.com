import React from 'react';
import { getBlogs } from "../../lib/blog";
import BlogItem from "./blogHomeItem";
import Header from "./header";

export default React.createClass({

    getInitialState: function () {
        return {
            blogs: [],
            date: "",
            error: "",
            noMoreBlogs: true
        };
    },

    getBlogsFromServer: function (animation) {
        getBlogs(this.state.date)
            .then((blogs) => {
                if (blogs.length !== 0) {
                    if (animation === true) {
                        $("#blog-posts").transition('fade in');
                    }
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
        this.getBlogsFromServer(true);
    },

    render: function () {
        let blogItems = this.state.blogs.map((blogItem) => {
            return <BlogItem key={blogItem._id} blogId={blogItem._id} blogHeading={blogItem.heading} blogDate={blogItem.createdOn}/>;
        });
        return (
            <div className="ui one column grid">
            <div className="column">
                <Header/>
            </div>
            <div id="blog-posts" className="column">
                <div className="ui container">
                    <div className="ui grid">
                        <div className="row"/>
                        <div className="row">
                            <div className="centered nine wide column">
                                <div className="ui divided items">
                                    {blogItems}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="center aligned column">
                            { this.state.noMoreBlogs ? <noscript/> : <button className="ui blue basic button" onClick={this.getBlogsFromServer}>Load More</button> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
});
