import marked from "marked";
import React from "react";
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

    render: function () {
        return (
            <div id="item-content" className="ui vertical stripe segment">
            <div className="ui grid text container">
                <div className="row">
                    <div dangerouslySetInnerHTML={{__html: this.state.text}}>
                    </div>
                </div>
                <div className="row">
                    <textarea style={{ width: "100%" }} rows={20} onChange={this.convertToMarkdown} ref="textarea"/>
                </div>
            </div>
            </div>
        );
    }
});
