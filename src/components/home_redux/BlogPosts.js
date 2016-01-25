import React from "react";
import { connect } from "react-redux";
import { IS_FETCHING, BLOGS, ERROR } from "../../schema/stateTree";
import BlogPostItem from "./BlogPostItem";

let blogPosts = React.createClass({
    render: function () {
        const blogItems = this.props.Blogs.map((blog) => {
            return <BlogPostItem key={blog._id} heading={blog.heading} _id={blog._id} createdOn={blog.createdOn}/>;
        });
        return (
            <div id="blog-posts" className="container">
                <div className="row">
                    <div className="eight columns offset-by-two blog-items">
                        {this.props.isFetching ? "Loading..." : blogItems }
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.get(IS_FETCHING),
        Blogs: state.get(BLOGS) ? state.get(BLOGS).toJS() : [],
        error: state.get(ERROR)
    };
}

export default connect(mapStateToProps)(blogPosts);
