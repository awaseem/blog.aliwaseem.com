import React from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { BLOGS, ERROR, ERROR_MESSAGE, ALL_BLOGS_LOADED, IS_FETCHING } from "../../schema/stateTree";
import BlogPostItem from "./BlogPostItem";
import { Fade } from "../animations/animate";
import ErrorMessage from "../messages/error";
import LoadMoreButton from "./LoadMoreButton";

let blogPosts = React.createClass({
    render: function () {
        const blogItems = this.props.Blogs.map((blog) => {
            return <BlogPostItem key={blog.get("_id")} heading={blog.get("heading")} _id={blog.get("_id")} createdOn={blog.get("createdOn")}/>;
        });
        return (
            <div id="blog-posts" className="container">
                <div className="row">
                    <div className="eight columns offset-by-two blog-items">
                        <Fade>
                            {blogItems}
                            { this.props.isFetching ? <Spinner spinnerName='cube-grid' noFadeIn/> : undefined }
                            { (this.props.isFetching || this.props.error || this.props.allBlogsLoaded) ? undefined : <LoadMoreButton/> }
                            { this.props.error ? <ErrorMessage errorMessage={this.props.errorMessage}/> : undefined }
                        </Fade>
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.get(IS_FETCHING),
        allBlogsLoaded: state.get(ALL_BLOGS_LOADED),
        Blogs: state.get(BLOGS) ? state.get(BLOGS) : List(),
        error: state.get(ERROR),
        errorMessage: state.get(ERROR_MESSAGE)
    };
}

export default connect(mapStateToProps)(blogPosts);
