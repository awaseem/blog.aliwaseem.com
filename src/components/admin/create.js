import marked from "marked";
import React from "react";

let renderer = new marked.Renderer();

marked.setOptions({
    renderer: renderer,
});

renderer.image = (href, title, text) => {
    console.log(href);
    return `<img class="ui centered large image" src=${href} ></img>`;
};

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
            <div>
                <div className="container">
                    <div className="ui grid">
                        <div className="two column row">
                            <div className="column">
                                <textarea style={{ width: "100vh", height: "100vh", resize: "none" }} onChange={this.convertToMarkdown} ref="textarea"/>
                            </div>
                            <div className="column">
                                <div className="ui container" dangerouslySetInnerHTML={{__html: this.state.text}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
