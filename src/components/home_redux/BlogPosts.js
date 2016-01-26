import React from "react";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { IS_FETCHING, BLOGS, ERROR } from "../../schema/stateTree";
import BlogPostItem from "./BlogPostItem";
import { Fade } from "../animations/animate";

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
                        {this.props.isFetching ? <Spinner spinnerName='cube-grid' noFadeIn/> : blogItems }
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
        Blogs: state.get(BLOGS) ? state.get(BLOGS).toJS() : [],
        error: state.get(ERROR)
    };
}

export default connect(mapStateToProps)(blogPosts);
