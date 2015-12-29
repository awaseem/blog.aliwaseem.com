import marked from "marked";
import React from "react";
import director from "director";
import { getBlog, saveBlog, updateBlog } from "../../lib/blog";
import renderer from "../../config/markedRenderer";
import ErrorMessage from "../messages/error";
import SuccessMessage from "../messages/success";

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
            error: "",
            text: "",
            success: ""
        };
    },

    convertToMarkdown: function () {
        this.setState({
            text: marked(this.refs.textarea.value)
        });
    },

    componentDidMount: function () {
        if (this.state.editId) {
            getBlog(this.state.editId)
                .then((data) => {
                    this.refs.textarea.value = data.body;
                    this.convertToMarkdown();
                })
                .catch((data) => {
                    this.setState({
                        error: "Failed to obtain blog for editing"
                    });
                });
        }
        $('#marked-editor')
            .transition('fade in');
        $('.menu .item')
            .tab()
        ;
    },

    updateExistBlog: function () {
        updateBlog(this.state.editId ,"test heading", this.refs.textarea.value)
            .then((data) => {
                this.setState({
                    success: "Sucessfully saved blog!"
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

    saveNewBlog: function () {
        saveBlog("test heading", this.refs.textarea.value)
            .then((data) => {
                this.setState({
                    editId: data.data._id,
                    success: "Added blog to database!"
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
        director.Router().setRoute("/admin/dashboard");
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
                    { this.state.error ? <ErrorMessage errorMessage={this.state.error}/> : <noscript/> }
                    { this.state.success ? <SuccessMessage successMessage={this.state.success}/>: <noscript/>}
                    <textarea id="test-text" style={{ width: "100%", marginBottom: "25px" }} rows={20} onChange={this.convertToMarkdown} ref="textarea"/>
                    <button onClick={this.saveButtonAction} className="ui green button">Save</button>
                    <button onClick={this.backButtonAction} className="ui red button">Back</button>
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
