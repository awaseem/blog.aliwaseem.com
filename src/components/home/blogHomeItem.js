import React from 'react';
import director from "director";

export default React.createClass({
    getDate: function () {
        var d = new Date(this.props.blogDate);
        return d.toLocaleString();
    },

    goToBlog: function (id) {
        director.Router().setRoute(`blog/${this.props.blogId}`);
    },

    render: function () {
        return (
            <div className="item">
                <div className="middle aligned content">
                    <h3><a onClick={this.goToBlog}>{this.props.blogHeading}</a></h3>
                    <p><em>Date: {this.getDate()}</em></p>
                </div>
            </div>
        );
    }
});
