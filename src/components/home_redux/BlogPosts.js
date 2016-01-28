import React from "react";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { BLOGS, ERROR, ERROR_MESSAGE } from "../../schema/stateTree";
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
                            {this.props.isFetching ? <Spinner spinnerName='cube-grid' noFadeIn/> : undefined}
                            {this.props.isFetching ? undefined : <LoadMoreButton/>}
                        </Fade>
                        { this.props.error ? <ErrorMessage errorMessage={this.props.errorMessage}/> : <noscript/> }
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.get("isFetching"),
        Blogs: state.get(BLOGS) ? state.get(BLOGS).toJS() : [],
        error: state.get(ERROR),
        errorMessage: state.get(ERROR_MESSAGE)
    };
}

export default connect(mapStateToProps)(blogPosts);
