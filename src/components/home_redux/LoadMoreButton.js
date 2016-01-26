import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { IS_FETCHING } from "../../schema/stateTree";

const button = React.createClass({
    render: function () {
        return (
            <div>
                { this.props.isFetching ? <Spinner spinnerName='cube-grid' noFadeIn/> : <button>Load More</button> }
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.get(IS_FETCHING)
    }
}

export default connect(mapStateToProps)(button);
