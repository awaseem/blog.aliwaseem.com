import React from "react";
import marked from "marked";
import { connect } from "react-redux";
import { FadeOnMount } from "../animations/animate";
import Spinner from "react-spinkit";
import { CURRENT_BLOG_VIEW, IS_FETCHING, ERROR, ERROR_MESSAGE } from "../../schema/stateTree";
import renderer from "../../config/markedRenderer";
import ErrorMessage from "../messages/error";

marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: false
});

const blogPost = React.createClass({

    render: function () {
        return (
            <div id="blog-body" className="container">
                <div className="row">
                    <div className="eight columns offset-by-two">
                        { this.props.isFetching ? <Spinner spinnerName='cube-grid' noFadeIn/> : undefined }
                        <FadeOnMount>
                            <div className="blog-content" dangerouslySetInnerHTML={{__html: marked(this.props.blog.get("body") ? this.props.blog.get("body") : "")}}/>
                            { this.props.error ? <ErrorMessage errorMessage={this.props.errorMessage}/> : undefined }
                        </FadeOnMount>
                    </div>
                </div>
            </div>
        );
    }

});

function mapStateToProps(state) {
    return {
        blog: state.get(CURRENT_BLOG_VIEW),
        isFetching: state.get(IS_FETCHING),
        error: state.get(ERROR),
        errorMessage: state.get(ERROR_MESSAGE)
    };
}

export default connect(mapStateToProps)(blogPost);
