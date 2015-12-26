import React from "react";

export default React.createClass({
    componentDidMount: function () {
        $('.ui.error.message')
            .transition('fade up in');
    },

    render: function () {
        return (
            <div className="ui error message">
                <div className="header">Error!</div>
                <p>{this.props.errorMessage}</p>
            </div>
        );
    }
});
