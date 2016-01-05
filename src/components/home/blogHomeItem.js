import React from 'react';
import director from "director";

export default React.createClass({
    getDate: function () {
        var d = new Date(this.props.blogDate);
        return d.toLocaleString();
    },

    goToBlog: function (e) {
        e.preventDefault();
        director.Router().setRoute(`blog/${this.props.blogId}`);
    },

    render: function () {
        return (
            <div className="blog-item">
                <h4><a href={ `/blog/${this.props.blogId}` } onClick={this.goToBlog}>{this.props.blogHeading}</a></h4>
                <p><em>Date: {this.getDate()}</em></p>
            </div>
        );
    }
});
