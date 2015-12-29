import React from 'react';

export default React.createClass({
    getDate: function () {
        var d = new Date(this.props.blogDate);
        return d.toLocaleString();
    },

    render: function () {
        return (
            <div className="item">
                <div className="middle aligned content">
                    <h3><a href={`/#/blog/${this.props.blogId}`}>{this.props.blogHeading}</a></h3>
                    <p><em>Date: {this.getDate()}</em></p>
                </div>
            </div>
        );
    }
});
