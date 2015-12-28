import marked from "marked";
import React from "react";
import director from "director";
import { getBlogs, getBlog, saveBlog, updateBlog } from "../../lib/blog";
import renderer from "../../config/markedRenderer";
import ErrorMessage from "../messages/error";

marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: false,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

export default React.createClass({

    getInitialState: function () {
        return {
            editId: this.props.editId,
            editData: this.props.editData,
            error: "",
            text: ""
        };
    },

    convertToMarkdown: function () {
        this.setState({
            text: marked(this.refs.textarea.value)
        });
    },

    componentDidMount: function () {
        if (this.state.editId) {
            this.ref.textarea.value = this.state.editData;
        }
        $('#marked-editor')
            .transition('fade in');
        $('.menu .item')
            .tab()
        ;
    },

    componentWillUnmount: function () {

    },

    updateExistBlog: function () {
        updateBlog(this.state.editId ,"test heading", this.refs.textarea.value)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                if (err.response) {
                    err.response.json()
                        .then((errResponse) => {
                            this.setState({
                                error: errResponse.message
                            });
                        });
                }
                else {
                    this.setState({
                        error: "Sorry can't reach the server at the moment"
                    });
                }
            });
    },

    saveNewBlog: function () {
        saveBlog("test heading", this.refs.textarea.value)
            .then((data) => {
                console.log(data);
                this.setState({
                    editId: data.data._id
                });
            })
            .catch((err) => {
                if (err.response) {
                    err.response.json()
                        .then((errResponse) => {
                            this.setState({
                                error: errResponse.message
                            });
                        });
                }
                else {
                    this.setState({
                        error: "Sorry can't reach the server at the moment"
                    });
                }
            });
    },

    saveButtonAction: function () {
        if (this.state.editId) {
            this.updateExistBlog();
        }
        else {
            this.saveNewBlog();
        }
    },

    backButtonAction: function () {
        director.Router().setRoute("/admin");
    },

    render: function () {
        return (
            <div id="marked-editor" className="ui container">
                <div className="ui top attached tabular secondary pointing menu">
                    <a className="item" data-tab="first">Preview</a>
                    <a className="item active" data-tab="second">Edit</a>
                    <a className="item" data-tab="third">Help</a>
                </div>
                <div className="ui bottom attached tab segment" data-tab="first">
                    <div className="ui text container">
                        <div className="blog-content" dangerouslySetInnerHTML={{__html: this.state.text}}>
                        </div>
                    </div>
                </div>
                <div className="ui bottom attached tab segment active" data-tab="second">
                    <textarea id="test-text" style={{ width: "100%", marginBottom: "25px" }} rows={20} onChange={this.convertToMarkdown} ref="textarea"/>
                    <button onClick={this.saveButtonAction} className="ui green button">Save</button>
                    <button onClick={this.backButtonAction} className="ui red button">Back</button>
                    { this.state.error ? <ErrorMessage errorMessage={this.state.error}/> : <noscript/> }
                </div>
                <div className="ui bottom attached tab segment" data-tab="third">
                    <div className="ui container">
                        This is a test
                    </div>
                </div>
            </div>
        );
    }
});
