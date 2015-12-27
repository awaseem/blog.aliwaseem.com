import marked from "marked";
import React from "react";
import director from "director";
import renderer from "../../config/markedRenderer";

marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true,
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

export default React.createClass({

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
        $('.menu .item')
          .tab()
        ;
    },

    backButtonAction: function () {
        director.Router().setRoute("/admin");
    },

    render: function () {
        return (
            <div className="ui container">
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
                    <textarea style={{ width: "100%", marginBottom: "25px" }} rows={20} onChange={this.convertToMarkdown} ref="textarea"/>
                    <button className="ui green button">Save</button>
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
