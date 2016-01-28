import React from "react";
import { VelocityTransitionGroup } from "velocity-react";

export const Fade = React.createClass({
    render: function () {
        return (
            <VelocityTransitionGroup enter={{ animation: "fadeIn" }}>
                {this.props.children}
            </VelocityTransitionGroup>
        );
    }
});
