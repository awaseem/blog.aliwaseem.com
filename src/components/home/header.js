import React from 'react';

export default React.createClass({

    componentDidMount: function () {
        $("#blog-header")
            .transition('fade in');
    },

    render: function () {
        return (
            <div id="blog-header" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.701961), rgba(0, 0, 0, 0.298039)), url(https://i.imgur.com/5s3aK6C.jpg)", backgroundSize: "cover"}} className="column">
                <div className="ui centered grid">
                    <div className="row"/>
                    <div className="row">
                        <h1 className="ui inverted header">ALI WASEEM</h1>
                    </div>
                    <hr/>
                    <div className="row">
                        <h5 className="ui inverted header">A PLACE TO SHARE MY RANDOM THOUGHTS</h5>
                    </div>
                    <div className="row">
                        <a href="https://github.com/awaseem">
                            <i className="github inverted big link icon"></i>
                        </a>
                        <a href="http://aliwaseem.com">
                            <i className="browser inverted big link icon"></i>
                        </a>
                        <a href="https://twitter.com/waseema393">
                            <i className="twitter inverted big link icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
