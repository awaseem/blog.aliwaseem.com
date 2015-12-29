import React from 'react';

export default React.createClass({

    componentDidMount: function () {
        $("#blog-header")
            .transition('fade in');
    },

    render: function () {
        return (
            <div id="blog-header" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.701961), rgba(0, 0, 0, 0.298039)), url(http://i.imgur.com/J0tQcFp.jpg)", backgroundSize: "cover"}} className="column">
                <div className="ui centered grid">
                    <div className="row"/>
                    <div className="row">
                        <h1 className="ui inverted header">ALI WASEEM</h1>
                    </div>
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
        );
    }
});
