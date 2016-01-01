import marked from "marked";
import React from "react";
import ReactDisqusThread from "react-disqus-thread";
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
            data: "",
            error: "",
            imagesLoaded: false
        };
    },

    componentDidMount: function () {
        // get blog post from the url ID
        getBlog(this.props.id)
            .then((data) => {
                this.setState({ text: marked(data.body), data: data });
                let imgSelector = $("img");
                if (imgSelector.length !== 0) {
                    $("img").load(() => {
                        this.setState({
                            imagesLoaded: true
                        });
                        $("#blog-body")
                            .transition("fly up in");
                    });
                }
                else {
                    this.setState({
                        imagesLoaded: true
                    });
                    $("#blog-body")
                        .transition("fly up in");
                }
            })
            .catch(() => this.setState({ error: `Error: Failed to find blog post with the following id: ${this.props.id}`}));
    },

    render: function () {
        return (
            <div id="blog-body" className="column">
                <div className="ui text container">
                    { this.state.imagesLoaded ?
                        <div className="blog-content" dangerouslySetInnerHTML={{__html: this.state.text}}/>
                        : <div className="blog-content" style={{ opacity: "0" }} dangerouslySetInnerHTML={{__html: this.state.text}}/>
                    }
                    <br/>
                    {this.state.imagesLoaded ?
                        <ReactDisqusThread shortname="blogaliwaseem" title={this.state.data.heading} url={`http://localhost:3000/#!blog/${this.state.data._id}`}/>
                        :
                        <noscript/>
                    }
                    { this.state.error ? <ErrorMessage errorMessage={this.state.error}/> : <noscript/> }
                </div>
            </div>
        );
    }
});
