import React from 'react';

export default React.createClass({

    componentDidMount: function () {
        // $("#blog-header")
        //     .transition('fade in');
    },

    render: function () {
        return (
            <div id="blog-header" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.701961), rgba(0, 0, 0, 0.298039)), url(https://i.imgur.com/5s3aK6C.jpg)", backgroundSize: "cover"}}>
                <div className="container" style={{ textAlign: "center", color: "white" }}>
                    <div className="row">
                        <h1 className="main-header">Ali Waseem</h1>
                    </div>
                    <div className="row">
                        <h5 className="sub-header">A Place To Share My Random Thoughts</h5>
                    </div>
                    <div className="row icon-bar">
                        <a href="https://github.com/awaseem">
                            <i className="fa fa-github"></i>
                        </a>
                        <a href="http://aliwaseem.com">
                            <i className="fa fa-list-alt"></i>
                        </a>
                        <a href="https://twitter.com/waseema393">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
