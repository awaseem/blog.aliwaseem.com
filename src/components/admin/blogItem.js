import React from "react";
import director from "director";
import { removeBlog } from "../../lib/blog";

export default React.createClass({

    getInitialState: function () {
        return {
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
        // TODO: still implement published status on api and here!
        alert("unpublished");
    },

    render: function () {
        if (this.state.deleted) {
            return ( <noscript/> );
        }
        return (
            <div className="column">
                <div className="ui left aligned segment">
                    <h4 className="ui header">{this.props.blogHeading}</h4>
                    <div className="ui tiny blue button" onClick={this.editButton}>Edit</div>
                    <div className="ui tiny red button" onClick={this.deleteButton}>Delete</div>
                    <div className="ui tiny green button" onClick={this.publishButton}>Published</div>
                </div>
            </div>
        );
    }
});
