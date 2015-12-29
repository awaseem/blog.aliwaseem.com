import marked from "marked";
import renderer from "../config/markedRenderer";
import React from 'react';
import { getBlog } from "../lib/blog";

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
            text: ""
        };
    },

    componentDidMount: function () {
        getBlog("5681d1cd5028d2ca1972a5e8")
            .then((data) => {
                this.setState({
                    text: marked(data.body)
                });
            });
    $('#test')
  .transition('fly up in')
;
    },

    render: function () {
        return (
            <div id="test" className="ui one column grid">
                <div style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.701961), rgba(0, 0, 0, 0.298039)), url(http://i.imgur.com/J0tQcFp.jpg)", backgroundSize: "cover"}} className="column">
                    <div className="ui centered grid">
                        <div className="row"/>
                        <div className="row"/>
                        <div className="row">
                            <h1 className="ui inverted header">ALI WASEEM</h1>
                        </div>
                        <div className="row">
                            <h3 className="ui inverted header">DEVELOPER, ENGINEER & GAME ADDICT</h3>
                        </div>
                        <hr/>
                        <div className="row">
                            <h5 className="ui inverted header">A PLACE TO SHARE MY RANDOM THOUGHTS</h5>
                        </div>
                        <div className="row">
                            <i className="github inverted big link icon"></i>
                            <i className="browser inverted big link icon"></i>
                            <i className="twitter inverted big link icon"></i>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="ui text container">
                        <div className="blog-content" dangerouslySetInnerHTML={{__html: this.state.text}}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
