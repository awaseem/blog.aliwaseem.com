import marked from "marked";
import React from "react";
import ReactDisqusThread from "react-disqus-thread";
import renderer from "../../config/markedRenderer";
import { getBlog } from "../../lib/blog";
import ErrorMessage from "../messages/error";

marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: false
});

export default React.createClass({

    getInitialState: function () {
        return {
            text: "",
            data: "",
            error: "",
            contentLoaded: false
        };
    },

    componentDidMount: function () {
        // get blog post from the url ID
        getBlog(this.props.id)
            .then((data) => {
                this.setState({ text: marked(data.body), data: data });
                this.setState({
                    contentLoaded: true
                });
                $("#blog-body")
                    .transition("fade in");
            })
            .catch(() => this.setState({ error: `Error: Failed to find blog post with the following id: ${this.props.id}`}));
    },

    render: function () {
        return (
            <div id="blog-body" className="container">
                <div className="row">
                    <div className="eight columns offset-by-two">
                        { this.state.contentLoaded ?
                            <div className="blog-content" dangerouslySetInnerHTML={{__html: this.state.text}}/>
                            : <div className="blog-content" style={{ opacity: "0" }} dangerouslySetInnerHTML={{__html: this.state.text}}/>
                        }
                        {this.state.contentLoaded ?
                            <ReactDisqusThread shortname="blogaliwaseem" identifier={this.state.data._id} title={this.state.data.heading} url={`https://blog.aliwaseem.com/blog/${this.state.data._id}`}/>
                            :
                            <noscript/>
                        }
                        { this.state.error ? <ErrorMessage errorMessage={this.state.error}/> : <noscript/> }
                    </div>
                </div>
            </div>
        );
    }
});
