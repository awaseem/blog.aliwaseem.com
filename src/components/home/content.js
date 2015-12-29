import marked from "marked";
import React from "react";
import renderer from "../../config/markedRenderer";
import { getBlog } from "../../lib/blog";
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
            text: "",
            error: ""
        };
    },

    componentDidMount: function () {
        // get blog post from the url ID
        getBlog(this.props.id)
            .then((data) => {
                this.setState({ text: marked(data.body) });
                $("#blog-body")
                    .transition("fly up in");
            })
            .catch(() => this.setState({ error: `Error: Failed to find blog post with the following id: ${this.props.id}`}));
    },

    render: function () {
        return (
            <div id="blog-body" className="column">
                <div className="ui text container">
                    <div className="blog-content" dangerouslySetInnerHTML={{__html: this.state.text}}>
                    </div>
                    { this.state.error ? <ErrorMessage errorMessage={this.state.error}/> : <noscript/> }
                </div>
            </div>
        );
    }
});
