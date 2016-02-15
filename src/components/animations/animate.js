import React from "react";
import { VelocityTransitionGroup } from "velocity-react";

export const Fade = React.createClass({
    render: function () {
        return (
            <VelocityTransitionGroup enter={{ animation: "fadeIn" }} leave={{ animation: "fadeOut" }}>
                {this.props.children}
            </VelocityTransitionGroup>
        );
    }
});

export const FadeOnMount = React.createClass({
    render: function () {
        return (
            <VelocityTransitionGroup runOnMount enter={{ animation: "fadeIn" }} leave={{ animation: "fadeOut" }}>
                {this.props.children}
            </VelocityTransitionGroup>
        );
    }
});
