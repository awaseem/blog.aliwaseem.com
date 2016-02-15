import marked from "marked";
import React from "react";
import director from "director";
import { connect } from "react-redux";
import { updateBlogById, createBlog } from "../../actions/action";
import { CURRENT_BLOG_VIEW, SUCCESS, ERROR, ERROR_MESSAGE } from "../../schema/stateTree";
import renderer from "../../config/markedRenderer";
import ErrorMessage from "../messages/error";
import SuccessMessage from "../messages/success";

marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: false
});

const blogPostCreate = React.createClass({

    getInitialState: function () {
        return {
            text: ""
        };
    },

    convertToMarkdown: function () {
        this.setState({
            text: marked(this.refs.textarea.value)
        });
    },

    componentDidMount: function () {
        if (!this.props.currentView.isEmpty()) {
            this.refs.heading.value = this.props.currentView.get("heading");
            this.refs.textarea.value = this.props.currentView.get("body");
            this.convertToMarkdown();
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (!nextProps.currentView.isEmpty() && this.props.currentView.get("_id") !== nextProps.currentView.get("_id")) {
            this.refs.heading.value = nextProps.currentView.get("heading");
            this.refs.textarea.value = nextProps.currentView.get("body");
            this.convertToMarkdown();
        }
    },

    updateExistBlog: function () {
        this.props.dispatch(
            updateBlogById(this.props.currentView.get("_id"),
                           this.refs.heading.value ? this.refs.heading.value : "<NO HEADING>",
                           this.refs.textarea.value)
        );
    },

    saveNewBlog: function () {
        this.props.dispatch(
            createBlog(this.refs.heading.value ? this.refs.heading.value : "<NO HEADING>",
                       this.refs.textarea.value)
        );
    },

    saveButtonAction: function () {
        if (!this.props.currentView.isEmpty()) {
            this.updateExistBlog();
        }
        else {
            this.saveNewBlog();
        }
    },

    backButtonAction: function () {
        director.Router().setRoute("/admin/dashboard");
    },

    render: function () {
        return (
            <div id="marked-editor" className="container">
                <div className="row">
                    <div className="eight columns offset-by-two">
                        <div className="blog-content" dangerouslySetInnerHTML={{__html: this.state.text}}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h3>Edit</h3>
                    { this.props.error ? <ErrorMessage errorMessage={this.props.errorMessage}/> : <noscript/> }
                    { this.props.success ? <SuccessMessage successMessage={"Successfully saved blog post!"}/> : <noscript/>}
                    <div className="form">
                        <input type="text" style={{ width: "100%", marginBottom: "25px"}} name="first-name" placeholder="Heading" ref="heading"/>
                        <textarea style={{ width: "100%", marginBottom: "25px", height: "400px" }} placeholder="Body" onChange={this.convertToMarkdown} ref="textarea"/>
                        <button className="button-primary" onClick={this.saveButtonAction}>Save</button>
                        <button onClick={this.backButtonAction}>Back</button>
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        currentView: state.get(CURRENT_BLOG_VIEW),
        success: state.get(SUCCESS),
        error: state.get(ERROR),
        errorMessage: state.get(ERROR_MESSAGE)
    };
}

export default connect(mapStateToProps)(blogPostCreate);
