import React from "react";

export default React.createClass({
    componentDidMount: function () {
        $(".ui.success.message")
            .transition("fade up in");
    },

    render: function () {
        return (
            <div className="success-message">
                <div className="header">Success!</div>
                <p>{this.props.successMessage}</p>
            </div>
        );
    }
});
