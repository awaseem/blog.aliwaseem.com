import React from "react";
import director from "director";

export default React.createClass({
    goToBlog: function (e) {
        e.preventDefault();
        director.Router().setRoute(`blog/${this.props._id}`);
    },
    render: function () {
        return (
            <div className="blog-item">
                <h5><a href={ `/blog/${this.props._id}` } onClick={this.goToBlog}>{this.props.heading}</a></h5>
                <p><em>Date: {Date(this.props.createdOn).toLocaleString()}</em></p>
            </div>
        );
    }
});
