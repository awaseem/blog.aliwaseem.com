import React from "react";
import director from "director";
import { removeBlog, publishBlog } from "../../lib/blog";

export default React.createClass({

    getInitialState: function () {
        return {
            publish: this.props.blogPublished,
            deleted: false
        };
    },

    editButton: function () {
        director.Router().setRoute(`/admin/create/${this.props.blogId}`);
    },

    deleteButton: function () {
        if (confirm(`Are you sure you want to delete: ${this.props.blogHeading}?`)) {
            removeBlog(this.props.blogId)
                .then(() => {
                    alert(`Removed ${this.props.blogHeading}`);
                    this.setState({
                        deleted: true
                    });
                })
                .catch(() => alert(`Failed to delete ${this.props.blogHeading}`));
        }
    },

    publishButton: function () {
        if (confirm(`Are you sure you want to change publish state from ${this.state.publish} to ${!this.state.publish} for: ${this.props.blogHeading}?`)) {
            publishBlog(this.props.blogId, !this.state.publish)
                .then(() => {
                    alert("Changed status!");
                    this.setState({
                        publish: !this.state.publish
                    });
                })
                .catch(() => alert(`Failed to publish ${this.props.blogHeading}`));
        }
    },

    render: function () {
        if (this.state.deleted) {
            return ( <noscript/> );
        }
        return (
            <div className="row">
                <h4>{this.props.blogHeading}</h4>
                <button onClick={this.editButton}>Edit</button>
                <button onClick={this.deleteButton}>Delete</button>
                { this.state.publish ? <button className="button-primary" onClick={this.publishButton}>Published</button> : <button onClick={this.publishButton}>Unpublished</button> }
                <hr/>
            </div>
        );
    }
});
