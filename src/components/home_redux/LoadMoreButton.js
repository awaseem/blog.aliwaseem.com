import React from "react";
import { connect } from "react-redux";
import { IS_FETCHING, LAST_DATE } from "../../schema/stateTree";
import { fetchBlogs } from "../../actions/action";

const button = React.createClass({
    clickHandler: function () {
        this.props.dispatch(fetchBlogs(this.props.lastDate));
    },

    render: function () {
        return (
            <div>
                <button onClick={this.clickHandler}>Load More</button>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        isFetching: state.get(IS_FETCHING),
        lastDate: state.get(LAST_DATE)
    };
}

export default connect(mapStateToProps)(button);
