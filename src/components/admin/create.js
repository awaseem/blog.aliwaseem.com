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
    breaks: false
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
                    this.refs.heading.value = data.heading;
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
    },

    updateExistBlog: function () {
        updateBlog(this.state.editId , this.refs.heading.value ? this.refs.heading.value : "<NO HEADING>", this.refs.textarea.value)
            .then((data) => {
                this.setState({
                    success: "Sucessfully saved blog!"
                });
            })
            .catch((err) => {
                console.error(err);
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
        saveBlog(this.refs.heading.value ? this.refs.heading.value : "<NO HEADING>", this.refs.textarea.value)
            .then((data) => {
                this.setState({
                    editId: data.data._id,
                    success: "Added blog to database!"
                });
            })
            .catch((err) => {
                console.error(err);
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
            <div id="marked-editor" className="container">
                <div className="row">
                    <div className="eight columns offset-by-two">
                        <div className="blog-content" dangerouslySetInnerHTML={{__html: this.state.text}}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <h3>Edit</h3>
                    { this.state.error ? <ErrorMessage errorMessage={this.state.error}/> : <noscript/> }
                    { this.state.success ? <SuccessMessage successMessage={this.state.success}/>: <noscript/>}
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
