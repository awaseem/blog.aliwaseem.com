import React from "react";

export default React.createClass({
    render: function () {
        return (
            <div className="error-message">
                <div className="header">Error!</div>
                <p>{this.props.errorMessage}</p>
            </div>
        );
    }
});
