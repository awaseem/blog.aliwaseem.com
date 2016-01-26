import React from "react";
import { connect } from "react-redux";
import { IS_FETCHING, BLOGS, ERROR, ERROR_MESSAGE } from "../../schema/stateTree";
import BlogPostItem from "./BlogPostItem";
import { Fade } from "../animations/animate";
import ErrorMessage from "../messages/error";
import LoadMoreButton from "./LoadMoreButton";

let blogPosts = React.createClass({
    render: function () {
        const blogItems = this.props.Blogs.map((blog) => {
            return <BlogPostItem key={blog._id} heading={blog.heading} _id={blog._id} createdOn={blog.createdOn}/>;
        });
        return (
            <div id="blog-posts" className="container">
                <div className="row">
                    <div className="eight columns offset-by-two blog-items">
                        <Fade>
                        {blogItems}
                            { this.props.error ? <ErrorMessage errorMessage={this.props.errorMessage}/> : <noscript/> }
                            <LoadMoreButton/>
                        </Fade>
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        Blogs: state.get(BLOGS) ? state.get(BLOGS).toJS() : [],
        error: state.get(ERROR),
        errorMessage: state.get(ERROR_MESSAGE)
    };
}

export default connect(mapStateToProps)(blogPosts);
