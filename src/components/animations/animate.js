import React from "react";
import { VelocityTransitionGroup } from "velocity-react";

export const Fade = React.createClass({
    render: function () {
        return (
            <VelocityTransitionGroup enter={{ animation: "fadeIn" }}>
                <div key={Math.random()}>
                    {this.props.children}
                </div>
            </VelocityTransitionGroup>
        );
    }
});
